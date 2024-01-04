import { postLogin } from 'api/users'
import { createContext, useState } from 'react'

type Props = {
  isAuthenticated: boolean
  login: (email: string, password: string, cb?: () => void) => void
  logout: () => void
}

export const AuthContext = createContext<Props>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )

  const login = async (email: string, password: string, cb?: () => void) => {
    try {
      const isAuthenticated = await postLogin(email, password)
      if (!isAuthenticated) throw new Error('Invalid credentials')

      setIsAuthenticated(true)
      cb?.()
    } catch (error) {
      console.error(error)
      // TODO: Snackbar error
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
