import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  state = {
    password: '',
    email: '',
    session: null,
  }

  submit = e => {
    e.preventDefault()

    const data = this.state
    console.log(data, 'the data')
    fetch('/login', {
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
      session
    } = this.state
    console.log(session, 'your session')
    return (
      <div>
        <div> Log In </div>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ email: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ password: e.target.value })} name="password"/>

        <button onClick={ this.submit }>Submit</button>
        <p> Your email is ${ session } </p>
      </div>
    )
  }
}

export default Login
