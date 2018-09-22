import { connect } from 'react-redux'
import { setBlogs } from '../actions/blog'
import Blog from '../components/pages/Blog'

const mapStateToProps = state => {
  const { blogs } = state.blogs
  console.log(blogs, 'the blogs in container')
  return { blogs }
}

const mapDispatchToProps = dispatch => {

  return {
    setBlogs: blogs => dispatch(setBlogs(blogs))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
