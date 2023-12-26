import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function Content({ Component }) {
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
          '@media (min-width: 600px)': {
            p: 0,
            m: 0,
          },
        }}
      >
        <Component />
      </Container>
    </Box>
  )
}

export default Content
