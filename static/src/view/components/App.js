import React, { Component } from 'react';
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom"
import { Redirect, Switch } from 'react-router'
import Blog from './blog/blog'
import Home from './blog/home'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavLink to="/"> Go Home </NavLink>
          <Switch>
            <Route path="/blog" component={ Blog }/>
            <Route exact path="/" component={ Home }/>
          </Switch>
      </div>
    );
  }
}

export default App;
