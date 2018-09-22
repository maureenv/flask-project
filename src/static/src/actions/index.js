import * as blog from './blog'
import * as login from './login'

const actions = ({
  ...blog,
  ...login,
})

export default actions
