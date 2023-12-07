import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Settings() {
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
      <Grid item>
        <Typography variant="body1" component="p" lineHeight="1.5rem" mt={2}>
          Settings
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Settings
