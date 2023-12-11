import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Settings() {
  return (
    <Grid
      container
      sx={{
        height: 'calc(100vh - 42px)',
        mt: '42px',
      }}
    >
      <Grid item>
        <Typography variant="body1" component="p" lineHeight="1.5rem" p={1}>
          Settings
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Settings
