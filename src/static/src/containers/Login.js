import { connect } from 'react-redux'
import { setUser } from '../actions/login'
import Login from '../components/pages/Login'

const mapStateToProps = state => {
  const { user } = state.login

  return { user }
}

const mapDispatchToProps = dispatch => {
  //const setUser = user => setUser( user )

  return {
    setUser: user => dispatch(setUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
