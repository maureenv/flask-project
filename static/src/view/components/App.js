import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect, Switch } from 'react-router'
import Blog from './pages/blog'
import Home from './pages/home'
import Login from './pages/login'

class App extends Component {
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
