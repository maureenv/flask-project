from flask import Flask, render_template
print("I work")
from .models.user import User

app = Flask(__name__, static_url_path='', static_folder="../static/build", template_folder="../static/build")

@app.route('/') # www.mysite.com/api the end point
def index():
    return render_template("index.html")

@app.route('/login')
def login_user():
    email = request.form['email']
    password = request.form['password']

    if User.login_valid(email, password):
        User.login(email)

    return render_template("index.html")

# required to run flask app
if __name__ == '__main__':
    app.run(port=3000)
