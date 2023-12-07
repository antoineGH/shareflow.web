import Grid from '@mui/material/Grid'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'

function Files() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        height: 'calc(100vh - 42px)',
        width: '100%',
        p: 0,
        m: 0,
        mt: '42px',
      }}
    >
      <Breadcrumbs />
    </Grid>
  )
}

export default Files
