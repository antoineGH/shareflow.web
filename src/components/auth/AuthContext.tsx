import { postLogin } from 'api/users'
import { createContext, useState } from 'react'
import { useDispatch } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'

type Props = {
  isAuthenticated: boolean
  login: (
    email: string,
    password: string,
    cbSuccess?: () => void,
    cbError?: () => void,
  ) => void
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
  const dispatch = useDispatch()

  const login = async (
    email: string,
    password: string,
    cbSuccess?: () => void,
    cbError?: () => void,
  ) => {
    try {
      const isAuthenticated = await postLogin(email, password)
      if (!isAuthenticated) throw new Error('Invalid credentials')

      setIsAuthenticated(true)
      cbSuccess?.()
    } catch (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          message: error?.message || 'Something went wrong',
          severity: 'error',
        }),
        cbError?.(),
      )
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    dispatch(
      openSnackbar({
        isOpen: true,
        message: 'Successfully logged out',
        severity: 'success',
      }),
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
