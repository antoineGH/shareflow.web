import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import NotFoundSVG from 'assets/not_found.svg?react'

function NotFound() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        height: 'calc(100vh - 42px)',
        width: '100%',
        p: 0,
        m: 0,
        mt: '42px',
      }}
    >
      <Grid item mt={10}>
        <NotFoundSVG style={{ width: '350px', height: '350px' }} />
      </Grid>
      <Grid item>
        <Typography variant="body1" component="p" lineHeight="1.5rem" mt={2}>
          Page not found
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NotFound
