import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  state = {
    password: '',
    email: '',
    registerPassword: '',
    registerEmail: '',
    session: null,
    error: null,
    blogs: [],
  }

  getBlogs = () => {
    console.log('going to get blogs')
    fetch('/blogs')
    .then(response => response.json())
    .then(data => this.setState({ blogs: data }))
    .catch((err)=> console.log(err, 'the error'))
  }

  submitLogin = e => {
    e.preventDefault()

    const data = this.state
    fetch('/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => this.setState({ session: data }), this.getBlogs())
    .catch((err)=> console.log(err, 'the error'))
  }

  submitRegistration = e => {
    e.preventDefault()

    const data = this.state
    fetch('/register', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => this.setState({ session: data }))
    .catch((err)=> console.log(err, 'the error'))
  }

  render() {
    const {
      email,
      session,
      blogs
    } = this.state
console.log(blogs, 'the blogs in state')
    return (
      <div>
        <h2> Log In </h2>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ email: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ password: e.target.value })} name="password"/>

        <button onClick={ this.submitLogin }>Submit</button>

        {/* FOR REGISTERING */}
        <h2> No password? Register Here </h2>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ registerEmail: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ registerPassword: e.target.value })} name="password"/>

        <button onClick={ this.submitRegistration }>Register</button>

        { session &&
          <div>
          <h2> Welcome { session } </h2>
          <p> Here are your blogs </p>
          { blogs.map( blog => {
            console.log(blog, 'a single blog')
            return (
              <div>
                <b>{ blog.title }</b>
                <p>{ blog.author}</p>
                <p>{ blog.description }</p>
                <br/>
              </div>
            )
          })
        }
        </div>
      }
      </div>
    )
  }
}

export default Login
