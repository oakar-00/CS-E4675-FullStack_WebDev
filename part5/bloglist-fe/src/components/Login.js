import PropTypes from 'prop-types'

const Login = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => (
  <form onSubmit={handleLogin}>
    <div>
			username
      <input
        type="text"
        value={username}
        name="Username"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
			password
      <input
        type="password"
        value={password}
        name="Password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit" id="login-button">login</button>
  </form>
)
Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
export default Login
