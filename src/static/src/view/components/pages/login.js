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
    .then(data => console.log(data, 'the data'))
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
      session
    } = this.state

    return (
      <div>
        <h2> Log In </h2>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ email: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ password: e.target.value })} name="password"/>

        <button onClick={ this.submitLogin }>Submit</button>
        { session && <p> Your email is { session } </p> }

        {/* FOR REGISTERING */}
        <h2> No password? Register Here </h2>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ registerEmail: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ registerPassword: e.target.value })} name="password"/>

        <button onClick={ this.submitRegistration }>Register</button>
      </div>
    )
  }
}

export default Login
