import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Home extends Component {
  state = {
    //showMenus: false,
  }
  render() {
    return (
      <div>
        <div> Home page </div>
        <NavLink to="/blog"> View Blogs </NavLink>
      </div>
    )
  }
}

export default Home
