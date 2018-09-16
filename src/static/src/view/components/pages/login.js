import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  state = {
    password: '',
    email: '',
  }

  submit = e => {
    e.preventDefault()

    const data = this.state
    console.log(data, 'the data')
    fetch('/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers(),
    })
    .then(response => response.json())
    .then(data => console.log(data, 'the data in response'))
    .catch((err)=> console.log(err, 'the error'))
  }

  render() {
          /*<form id="login-form" action="/login" method="post">*/
    return (
      <div>
        <div> Log In </div>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ email: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ password: e.target.value })} name="password"/>

        <button onClick={ this.submit }>Submit</button>
      </div>
    )
  }
}

export default Login
