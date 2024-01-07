import { ThemeProvider } from '@mui/material/styles'
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
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
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
