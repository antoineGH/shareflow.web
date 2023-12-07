import { Routes, Route, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { routes } from 'components/routes/routes'

function Content() {
  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <Container
        sx={{
          '@media (min-width: 1200px)': {
            maxWidth: '100%',
          },
        }}
      >
        <Routes>
          {routes.map(route => (
            <Route
              key={route.name}
              path={route.pathname}
              element={route.component}
            />
          ))}
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default Content
