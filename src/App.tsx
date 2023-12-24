import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'constants/theme'
import Layout from 'components/layout/Layout'
import { AuthProvider } from 'components/auth/AuthContext'
import Login from 'components/pages/login/Login'
import PrivateComponent from 'components/auth/PrivateRoute'
import { routes } from 'components/routes/routes'
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
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
