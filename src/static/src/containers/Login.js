import { connect } from 'react-redux'
import { setUser } from '../actions/login'
import Login from '../components/pages/Login'

const mapStateToProps = state => {
  const { user } = state.login

  return { user }
}

const mapDispatchToProps = () => {
  const setUser = user => setUser( user )

  return {
    setUser
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
