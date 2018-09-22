import {
  SET_BLOGS,
} from '../actions/blog'

const initialState = {
  blogs: [],
}

export const blogs = ( state = initialState, action ) => {
  console.log(action.blogs, 'REDUCER BLOGS')
  switch ( action.type ) {
    case 'SET_BLOGS':
    return {
      ...state,
      blogs: action.blogs,
    }
    default:
      return state
  }
}
