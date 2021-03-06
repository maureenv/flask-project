import { connect } from 'react-redux'
import { setUser } from '../actions/login'
import { setBlogs, setCurrentBlog } from '../actions/blog'
import Login from '../components/pages/Login'

const mapStateToProps = state => {
  const { user } = state.login
  const { blogs } = state.blogs

  return { user, blogs }
}

const mapDispatchToProps = dispatch => {

  return {
    setCurrentBlog: id => dispatch(setCurrentBlog( id )),
    setUser: user => dispatch(setUser(user)),
    setBlogs: blogs => dispatch(setBlogs(blogs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
