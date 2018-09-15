import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  state = {
    //showMenus: false,
  }
  render() {
    return (
      <div>
        <div> Log In </div>
        <label> Email </label><input type="text" id="email"/>
        <label> Password </label><input type="password" id="password"/>

        <input type="submit" id="submit-button"/>
      </div>
    )
  }
}

export default Login
