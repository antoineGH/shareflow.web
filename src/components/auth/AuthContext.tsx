import { createContext, useState } from 'react'

type Props = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<Props>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  // TODO: Switch back to false
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
