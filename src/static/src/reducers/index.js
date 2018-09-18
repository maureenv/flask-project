import { combineReducers } from 'redux'
import * as blog from './blog'
import * as login from './login'

export default combineReducers({
  ...blog,
  ...login,
})
