import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'


class Login extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      password: '',
      email: '',
      registerPassword: '',
      registerEmail: '',
      error: null,
      blogs: [],
      user: props.user,
    }
  }

  componentWillMount() {
    console.log( this.props, 'the props in will mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'the nextprops')
  }

  getBlogs = () => {
    fetch('/blogs')
    .then(response => response.json())
    .then(data => this.setState({ blogs: data }, () => this.props.setBlogs(this.state.blogs)))
    .catch((err)=> console.log(err, 'the error'))
    this.props.setUser(this.state.user)
  }

  linkToPost = (e, id) => {
    e.preventDefault()
        console.log('blog clicked!', id)
    this.props.setCurrentBlog(id)
    this.props.history.push(`blog/${ id }`)
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
    .then(data => this.setState({ user: data }), this.getBlogs())
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
      user,
      blogs
    } = this.state
    console.log(this.state, 'the state')
    return (
      <div>
        <h2> Log In </h2>
        <label> Email </label><input type="text" onChange={ e => this.setState({ email: e.target.value })} name="email"/>
        <label> Password </label><input type="password" onChange={ e => this.setState({ password: e.target.value })} name="password"/>

        <button onClick={ this.submitLogin }>Submit</button>

        {/* FOR REGISTERING */}
        <h2> No password? Register Here </h2>
        <label> Email </label><input type="text" id="email" onChange={ e => this.setState({ registerEmail: e.target.value })} name="email"/>
        <label> Password </label><input type="password" id="password" onChange={ e => this.setState({ registerPassword: e.target.value })} name="password"/>

        <button onClick={ this.submitRegistration }>Register</button>

        { user &&
          <div>
          <h2> Welcome { user } </h2>
          <p> Here are your blogs </p>
          { blogs.map( blog => {
            return (
              <div>
                <a href="#" onClick={ e => this.linkToPost( e, blog._id ) }>{ blog.title }</a>
                <p>{ blog.author}</p>
                <p>{ blog.description }</p>
                <br/>
              </div>
            )
          })
        }
        </div>
      }
      </div>
    )
  }
}

Login.propTypes = {
  setCurrentBlog: PropTypes.func,
  setUser: PropTypes.func,
  setBlogs: PropTypes.func,
  user: PropTypes.string,
}

export default Login
