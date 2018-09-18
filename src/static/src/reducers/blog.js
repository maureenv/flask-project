import {
  SET_BLOGS,
} from '../actions/blog'

const initialState = {
  blogs: [],
}

export const blog = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'SET_BLOGS':
      return action.blogs
    default:
      return state
  }
}
