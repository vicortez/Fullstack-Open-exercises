import { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ username, password })
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username <input type="text" onChange={({ target }) => setusername(target.value)} />
          </label>
        </div>
        <div>
          <label>
            password <input type="password" onChange={({ target }) => setpassword(target.value)} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
