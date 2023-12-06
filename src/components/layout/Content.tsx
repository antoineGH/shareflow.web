import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'

function Content() {
  return (
    <>
      <Box
        component="main"
        sx={{
          height: '100vh',
        }}
      >
        <Toolbar />
        <Container>
          <Grid container>
            {/* <Grid item xs={12} md={12} lg={12}>
              lol
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Content
