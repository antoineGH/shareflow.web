import { ThemeProvider } from '@mui/material/styles'
import dotenv from 'dotenv'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AuthProvider } from 'components/auth/AuthContext'
import PrivateComponent from 'components/auth/PrivateRoute'
import SnackBarComponent from 'components/common/SnackBarComponent'
import Layout from 'components/layout/Layout'
import Login from 'components/pages/login/Login'
import { routes } from 'components/routes/routes'
import { theme } from 'constants/theme'
import './App.css'

function App() {
  dotenv.config()
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router basename={process.env.VHOST_URL || ''}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {routes.map(route => (
              <Route
                key={route.name}
                path={route.pathname}
                element={
                  route.meta.requiresAuth ? (
                    <PrivateComponent
                      Layout={Layout}
                      Component={route.component}
                    />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
        <SnackBarComponent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
