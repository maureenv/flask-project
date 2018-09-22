import { connect } from 'react-redux'
import { setBlogs } from '../actions/blog'
import Blog from '../components/pages/Blog'

const mapStateToProps = state => {
  const { currentBlog } = state.blogs
  return { currentBlog }
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
