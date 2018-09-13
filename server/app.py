from flask import Flask, render_template

app = Flask(__name__, static_url_path='', static_folder="../static/build", template_folder="../static/build")

@app.route('/') # www.mysite.com/api the end point
def index():
    return render_template("index.html")

# required to run flask app
if __name__ == '__main__':
    app.run(port=3000)
