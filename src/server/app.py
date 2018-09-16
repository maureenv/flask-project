from flask import Flask, render_template, request, session
from models.user import User
from common.database import Database
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
    print(request.form, '##################### I got a request')
    email = request.form['email']
    password = request.form['password']

    if User.login_valid(email, password):
        print(email, 'the email')
        User.login(email)
    else: #to erase session so that username and password aren't saved in browser
        session['email'] = None

    return render_template("index.html", email=session['email'])
