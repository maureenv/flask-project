import * as blog from './blogs'
import * as login from './login'

const actions = ({
  ...blog,
  ...login,
})

export default actions
