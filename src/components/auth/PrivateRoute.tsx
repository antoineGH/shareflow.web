import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateComponent = ({ Layout, Component }) => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/auth/files')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return isAuthenticated ? (
    <Layout Component={Component} />
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateComponent
