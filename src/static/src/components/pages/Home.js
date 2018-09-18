import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Home extends Component {
  state = {
    //showMenus: false,
  }
  render() {
    return (
      <div>
        <h1> Home page </h1>
        <div><NavLink to="/login"> Login </NavLink></div>
        <div><NavLink to="/blog"> View Blogs </NavLink></div>
      </div>
    )
  }
}

export default Home
