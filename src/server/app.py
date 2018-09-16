from flask import Flask, render_template, request
print("I work")
from models.user import User

app = Flask(__name__, static_url_path='', static_folder="../static/build", template_folder="../static/build")

@app.route('/') # www.mysite.com/api the end point
def index():
    return render_template("index.html")

@app.route('/login')
def login_user():
    # request is something incoming to our application. The data sent front the client will be in the request.form dictionary
    print(request, 'the request')
    email = request.form['email']
    password = request.form['password']

    if User.login_valid(email, password):
        User.login(email)

    return render_template("index.html", email=session['email'])
