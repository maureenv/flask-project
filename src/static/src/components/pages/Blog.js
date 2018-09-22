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
    .then(data => this.setState({ posts: data }, () => console.log(data, 'the data')))
    .catch((err)=> console.log(err, 'the error'))
  }

  componentDidMount() {
    this.getPosts()
  }
  render() {
    return (
      <div> This is my blog { this.props.currentBlog }</div>
    )
  }
}


Blog.propTypes = {
  currentBlog: PropTypes.string,
}


export default Blog
