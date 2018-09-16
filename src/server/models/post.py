# class comes from an object, and object needs to be passed in
# Every new folder with python files must have a __init__.py
import uuid
import datetime

from ..common.database import Database


class Post(object):
    # pass default value to values passed in like id=None, values with default value need to be passed in the end
    # date=datetime (first datetime is to call module, second datetime is to call the class, and utcnow() is to get current time method)
    def __init__(self, blog_id, title, content, author, created_date=datetime.datetime.utcnow(), _id=None):
        self.blog_id = blog_id
        self.title= title
        self.content = content
        self.author = author
        self.created_date = created_date
        # uuid generates a unique id
        self._id = uuid.uuid4().hex if _id is None else _id

    def save_to_mongo(self):
        Database.insert(collection='posts', data=self.json())

    def json(self):
        return {
            '_id': self._id,
            'blog_id': self.blog_id,
            'author': self.author,
            'content': self.content,
            'title': self.title,
            'created_date': self.created_date
        }

    # @staticmethod
    # def from_mongo(id):
    #     return Database.find_one(collection='posts', query={'id':id})

    # classmethod WAY
    @classmethod
    def from_mongo(cls, id):
        post_data = Database.find_one(collection='posts', query={'_id':id})
        # Long way
        # return cls(blog_id=post_data['blog_id'],
        #             title=post_data['tite'],
        #             content=post_data['content'],
        #             author=post_data['author'],
        #             created_date=post_data['ceated_date'],
        #             _id=post_data['_id'])

        # Better way, basically shorter way of doing what's above
        # For each of the elements in post_data, get the name of the data coming from the database and say that the object's element is equal to that. Only works if the object's name matches the name of the parameter in the constructor
        return cls(**post_data)

    @staticmethod
    def from_blog(id):
        return [ post for post in Database.find(collection='posts', query={'blog_id': id}) ]
