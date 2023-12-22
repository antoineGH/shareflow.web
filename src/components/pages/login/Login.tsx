import { Button } from '@mui/material'
import { AuthContext } from 'components/auth/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClickLogin = () => {
    login()
    navigate('/auth/files')
  }

  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" color="primary" onClick={handleClickLogin}>
        Login
      </Button>
    </div>
  )
}

export default Login
