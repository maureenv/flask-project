import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
//const blogs = await fetch('localhost:3000/blogs')
// https://github.github.io/fetch/

// If you're trying to send a request to localhost, and you are hosting your server on localhost, then you don't need to specify the url, you only need to tell fetch() your path.
//
// For example, my api end point is http://localhost:8082/api/config, then i would do fetch('/api/config').

class Blog extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    // fetch('/api/blog')
    //   .then(response => response.json())
    //   .then(data => this.setState({ data }))
  }
  render() {
    return (
      <div> This is my blog </div>
    )
  }
}

export default Blog
