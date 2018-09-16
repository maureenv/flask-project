# import sys
# print(sys.path)
from ..common.database import Database
from flask import Flask, session
#from flask.ext.session import Session
from .blog import Blog
import datetime
import uuid
# In flask we don't have to do any work with cookies because Flask does the cookies for us. Whenever user access's our application, flask sends them a cookie that is secure and uniquely identifies their session. So once an email is passed into a session, flask already knows that a user's cookie matches this session.


class User(object): #author
    def __init__(self, email, password, _id=None):
        self.email = email
        self.password = password
        self._id = uuid.uuid4().hex if _id is None else _id #ternary operator

    # using classmethod for this because we're LOOKING for a user, we will not yet have a user object
    @classmethod
    def get_by_email(cls, email):
        data = Database.find_one("users", {"email": email})
        if data is not None:
            return cls(**data)
        # return None - python will be default return none of it doesn't return anything else

    @classmethod
    def get_by_id(cls, _id):
        data = Database.find_one("users", {"_id": _id})
        if data is not None:
            return cls(**data)

    @staticmethod
    def login_valid(email, password):
        # chech whether a user's email matches the password they sent us
        user = User.get_by_email(email) #this (creates) instantiates the user object
        if user is not None:
            # check the password
            return user.password == password

    # @staticmethod
    # def register(email, password):
    #     user = User.get_by_email(email)
    #     if user is None:
    #         # user doesn't exist to we can create it
    #         new_user = User(email, password)
    #         new_user.save_to_mongo()
    #     else:
    #         return False

    @classmethod #since we're creating a User here referring to this class we can just use a classmethod instead of static method so that we change the class name we don't have to do user = <newClassName>.get_by_email(email)
    def register(cls, email, password):
        user = cls.get_by_email(email)
        if user is None:
            # user doesn't exist to we can create it
            new_user = cls(email, password)
            new_user.save_to_mongo()
            # add user's email to session so that user already appears logged in after registering
            session['email'] = email
            return True # this is so that it doesn't return the default None. Having if return None and else return False is weird
        else:
            return False

    @staticmethod
    def login(user_email):
        # login_valid has already been called, so we know the user has logged in to begin a session
        session['email'] = user_email

    @staticmethod
    def logout():
        session['email'] = None

    def get_blogs(self):
        # get blogs for specific author
        # Multiple authors can have the same name so searching by name isn't the smartest thing to do. So go back into blog model and save the author id as well as the blog id

        #when we call a specific author's get blog's method, we will get all of the blog's with his or her's id
        return Blog.find_by_author_id(self._id)

    def new_blog(self, title, description):
        # we only need to pass in title and description because the author and author_id can come from self since this is availble from sessions

        # need to know what information is needed to create a new blog from teh blog constructor. Since _id is optional because it's created by mongo if it doesnt exist we only need to pass author, title, descirption, author_id
        blog = Blog(author = self.email,
                    title=title,
                    description=description,
                    author_id=self._id)
        blog.save_to_mongo()

    def new_post(self, blog_id, title, content, date=datetime.datetime.utcnow()): #go to blog model and see what a new_post requires
        # title, content, date, also pass in blog_id since user could have multiple blogs, the website will let us know the blog id upon new post submission
        blog = Blog.get_from_mongo(blog_id)
        blog.new_post(title=title,
                    content=content,
                    date=date)



    def json(self):
        return {
            "email": self.email,
            "_id": str(self._id),
            "password": self.password
            # shouldn't pass password here since sending passwords over a network is never safe
            # if this data is being sent between user and application NO password
            # if only within application, adding password here is fine
            # in this case we will save password here since this is only being used to pass data into mongoDB not through the network to client
        }

    def save_to_mongo(self):
        Database.insert("users", self.json())
