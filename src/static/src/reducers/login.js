import {
  SET_USER,
} from '../actions/login'

const initialState = {
  user: 'kiki',
}

export const login = ( state = initialState, action ) => {
  console.log(action.user, 'REDUCER')
  switch ( action.type ) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}
