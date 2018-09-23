from flask import Flask, render_template, request, session, jsonify, make_response
from models.user import User
from models.blog import Blog
from common.database import Database
import json
# run export FLASK_ENV=development in terminal before python run.py to see flask debugger messages

app = Flask(__name__, static_url_path='', static_folder="../static/build", template_folder="../static/build")
app.secret_key = "test"

@app.route('/') # www.mysite.com/api the end point
def index():
    return render_template("index.html")

# We want to initialize database before we start making any requests
@app.before_first_request
def initialize_database():
    Database.initialize()

@app.route('/login', methods=['POST'])
def login_user():
    # request is something incoming to our application. The data sent front the client will be in the request.form dictionary
    data = request.get_json()
    email = data['email']
    password = data['password']

    if User.login_valid(email, password):
        User.login(email)
    else: #to erase session so that username and password aren't saved in browser
        session['email'] = None

    email = session['email']
    #make sure to jsonify your data in you response
    return jsonify(email)

@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data['registerEmail']
    password = data['registerPassword']

    User.register(email, password)

    email = session['email']
    #make sure to jsonify your data in you response
    return jsonify(email)

@app.route('/blogs/<string:user_id>') #user id is assigned when creating a user
@app.route('/blogs')
def user_blogs(user_id=None):
    if user_id is not None:
        user = User.get_by_id(user_id)
    else:
        user = User.get_by_email(session['email'])
    #[{'author_id': '5b9e71fa448e75f3a7b1eadc', 'title': u'CAT', 'description': u'KITTENS', 'author': u'test@test.com'}, {'author_id': '5b9e71fa448e75f3a7b1eadc', 'title': u'DOG', 'description': u'DOG', 'author': u'test@test.com'}]
    blogs = user.get_blogs()
    print([blog.json() for blog in blogs])
    blogs = blogs #pass in a blogs variable with the blogs content
    return jsonify([blog.json() for blog in blogs])

@app.route('/blogs/new', methods=['POST', 'GET'])
def create_new_blog():
    if request.method == 'GET':
        return
    else:
        data = request.get_json()
        title = data['title']
        description = data['description']
        user = User.get_by_email(session['email'])

        new_blog = Blog(user.email, title, description, user._id )
        new_blog.save_to_mongo()

        return make_response(user_blogs(user._id)) # make_response calculates what user_blogs would return


@app.route('/posts/<string:blog_id>') # all posts have an id associated with them
def blog_posts(blog_id):
    blog = Blog.get_from_mongo(blog_id)
    posts = blog.get_posts()
    posts = posts
    return jsonify([post.json() for post in posts])
