# CONECT REACT TO FLASK
# https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-8925800503d9
# https://github.com/dternyak/React-Redux-Flask

# nginx web server

# Create python version of package.json
- pip freeze > requirements.txt
- pip install -r requirements.txt (when installing packages)

# To make new python project
python3 -m venv <project-name>

# Make src directory for all of my files
# make sure to add __init__.py inside any folder that has python files
# in project folder do . bin/activate (like npm install)
# once I do this I can do pip install <module> to keep it within my project
# deactivate to get out of virtual env

# Start the app
1. . bin/activate
2. python app.py
3. deactivate
_____________________________________________________________
# Data path
website => (data) => API => (data) => Model => (data) => Database
_____________________________________________________________
# Models
- each model maps to a single database table. Each model is a Python class that subclasses

# Object Constructor __init__
  - the constructor initializes (assigns values to) any instance variables that the object will need when it starts
______________________________________________________________

# Cookies and Sessions
- cookie is a way to store information on a web browser. So we can send the user a cookie and then we can store in their browser their email address. A user can modify a cookie to a new user name and hack the system to sessions are used with cookies. SO instead of storing the email in a cookie and sending that to the user, we save the email in a server (away from the user), we send the user a unique identifier for the session. so when the user access their profile, they send us the unique identifier and we use that identifier to get the user's email that is associated with that cookie. Because these identifiers are long and complex, they can't guess someone else's identifier so it's a much more secure method. Cookie's usually expire after a LONG time

- Session - is like a cookie but stored server side and have an expiring time (example: one hour)
______________________________________________________________
# Start mongo db
- type mongo

## Show database
- show dbs

## Make database
- use <database name>
- the database will show in list once it has data in it

## Show data in database
- show collections // blogs, posts (collections are basically tables, but in json data format)
- db.students.find({}).pretty() // this will find all the data in a database

## Insert data into database
- use your database (db will refer to database you're on, students is the collection and insert is the data to insert)
- db.students.insert({"name":"jose", "mark": 99})

## Remove data
- db.students.remove({"name":"jose"}) // finds any element that matches this and deletes it
- db.students.remove({}) // deletes everything in this collection
