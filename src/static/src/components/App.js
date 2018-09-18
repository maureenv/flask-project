import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect, Switch } from 'react-router'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Login from '../containers/Login'

class App extends Component {
  state = {
  }
  render() {
    return (
      <div className="App">
          <NavLink to="/"> Go Home </NavLink>
          <Switch>
            <Route path="/blog" component={ Blog }/>
            <Route path="/login" component={ Login }/>
            <Route exact path="/" component={ Home }/>
          </Switch>
      </div>
    );
  }
}

export default App;
