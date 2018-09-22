import {
  SET_BLOGS,
  SET_CURRENT_BLOG,
} from '../actions/blog'

const initialState = {
  blogs: [],
  currentBlog: '',
}

export const blogs = ( state = initialState, action ) => {
  console.log(action, 'REDUCER BLOGS')
  switch ( action.type ) {
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.blogs,
      }
    case 'SET_CURRENT_BLOG':
      return {
        ...state,
        currentBlog: action.currentBlog
      }
    default:
      return state
  }
}
