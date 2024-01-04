import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateComponent = ({ Layout, Component }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? (
    <Layout Component={Component} />
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateComponent
