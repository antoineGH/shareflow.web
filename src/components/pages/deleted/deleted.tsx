import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import DeleteIcon from '@mui/icons-material/Delete'

function Deleted() {
  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
    >
      <Grid item py={1} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Grid
            container
            sx={{ display: 'flex', flexDirection: 'row' }}
            mt={0.5}
          >
            <Grid item>
              <DeleteIcon sx={{ mr: 1 }} fontSize="inherit" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ lineHeight: 'inherit' }}>
                My deleted files
              </Typography>
            </Grid>
          </Grid>
        </Breadcrumbs>
      </Grid>
    </Grid>
  )
}

export default Deleted
