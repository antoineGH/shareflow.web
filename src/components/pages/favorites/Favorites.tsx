import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

function Favorites() {
  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
    >
      <Grid item>
        <Typography variant="body1" component="p" lineHeight="1.5rem" p={1}>
          Favorites
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Favorites
