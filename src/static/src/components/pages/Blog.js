import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'


class Blog extends Component {
  state = {
    posts: []
  }

  getPosts = () => {
    console.log('get posts called')
    fetch(`/posts/${ this.props.currentBlog }`)
    .then(response => response.json())
    .then(data => this.setState({ posts: data }))
    .catch((err)=> console.log(err, 'the error'))
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const {
      posts
    } = this.state
    console.log(posts, 'teh posts in state')
    return (
      <div>
        <h1> My Blog Posts </h1>
        { posts.map( post => {
          return (
            <div>
              <p>{ post.author }</p>
              <p>{ post.title }</p>
              <p>{ post.content }</p>
              <br/>
            </div>
          )
        })}
      </div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
}


export default Blog
