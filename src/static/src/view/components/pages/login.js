import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  state = {
    //showMenus: false,
  }
  render() {
    return (
      <form id="login-form" action="/login" method="post">
        <div> Log In </div>
        <label> Email </label><input type="text" id="email" name="email"/>
        <label> Password </label><input type="password" id="password" name="password"/>

        <input type="submit" id="submit-button"/>
      </form>
    )
  }
}

export default Login
