import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function Password() {
  const handleClickChangePassword = () => {
    console.log('Change password')
  }

  return (
    <Box p={2} pt={0}>
      <Box>
        <Typography variant="h6">Password</Typography>
      </Box>
      <Grid container spacing={2} direction="row" sx={{ maxWidth: '612px' }}>
        <Grid item xs={12} md={4}>
          <TextField
            id="textfield-current-password"
            placeholder="Current password"
            variant="outlined"
            size="small"
            type="password"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            id="textfield-new-password"
            placeholder="New password"
            variant="outlined"
            size="small"
            type="password"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            size="small"
            variant="contained"
            onClick={handleClickChangePassword}
            sx={{ mt: 0.25 }}
          >
            Change password
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Password
