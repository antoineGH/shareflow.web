import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

function Content({ Component }) {
  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Container
        sx={{
          '@media (min-width: 1200px)': {
            maxWidth: '100%',
          },
          '@media (min-width: 0px)': {
            p: 0,
            m: 0,
            maxWidth: '100%',
          },
        }}
      >
        <Component />
      </Container>
    </Box>
  )
}

export default Content
