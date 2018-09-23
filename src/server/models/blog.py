import uuid
import datetime
from ..common.database import Database
from .post import Post

class Blog(object):
    # mongodb by default will give each item an _id so in order to overwrite it we will create our own _id in __init__
    def __init__(self, author, title, description, author_id, _id=None,):
        self.author = author
        self.author_id = author_id
        self.title = title
        self.description = description
        self._id = uuid.uuid4().hex if _id is None else _id

    def new_post(self, title, content, date=datetime.datetime.utcnow()): #date gets a default value so the date code below is no longer needed
        # if date == "":
        #     date = datetime.datetime.utcnow()
        # else:
        #     date = datetime.datetime.strptime(date, "%d%m%Y")
        post = Post(blog_id=self._id,
                    title=title,
                    author=self.author,
                    content=content,
                    # datetime has a class datetime with a method strptime(string parse time) which takes a string and formats the string
                    created_date=date)
        post.save_to_mongo() #this is calling save_to_mongo() on Post class

    def save_to_mongo(self):
        Database.insert(collection='blogs', data=self.json())

    def get_posts(self):
        return Post.from_blog(self._id)

    def json(self):
        return {
            'author': self.author,
            'author_id': str(self.author_id),
            'title': self.title,
            'description': self.description,
            '_id': self._id
        }

    # here we won't have access to self because object won't be created, so just pass in id of what we're looking for
    # WAY 1 of getting blog
    # @staticmethod
    # def get_from_mongo(id):
    #     blog_data = Database.find_one(collection='blogs', query={'id': id})
    #
    #     return Blog(author=blog_data['author'],
    #                 title=blog_data['title'],
    #                 description=blog_data['description'],
    #                 id=blog_data['id'])

    # Way 2
    @classmethod
    def get_from_mongo(cls, id): #cls from classmethod comes from Blog, cls returns the current class
        blog_data = Database.find_one(collection='blogs', query={'_id': id})
        # cls is used so that if the class name is changed, we don't have to go in and change it everywhere
        # this cls returns an object that we can edit
        # return cls(author=blog_data['author'],
        #             title=blog_data['title'],
        #             description=blog_data['description'],
        #             _id=blog_data['_id'])
        return cls(**blog_data)

    @classmethod #it's going to return a list of blog objects
    def find_by_author_id(cls, author_id):
        blogs = Database.find(collection='blogs',
                            query={ 'author_id': author_id })
        # list comprehension, this creates a blog for each blog in blogs
        # return [ blog for blog in blogs ] #this doesn't return a blog object so we need to do
        return [ cls(**blog) for blog in blogs ] #this will now return a blog object for each blog
