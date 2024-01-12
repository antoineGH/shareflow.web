import { useContext } from 'react'

import { Navigate } from 'react-router-dom'

import { AuthContext } from './AuthContext'

const PrivateComponent = ({ Layout, Component }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? (
    <Layout Component={Component} />
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateComponent
