import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

function AccountInfo() {
  return (
    <Box p={2} pt={0}>
      <Typography variant="h6">Account</Typography>
      <Grid container spacing={1} sx={{ maxWidth: '402px' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Profile Picture</Typography>
          <Avatar
            alt="AR avatar"
            sx={{ width: 100, height: 100, fontSize: '3.5rem', pt: 2 }}
          >
            AR
          </Avatar>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">Full Name</Typography>
          <TextField
            id="textfield-full-name"
            placeholder="Your full name"
            variant="outlined"
            size="small"
          />
          <Typography variant="subtitle1" mt={1}>
            Email
          </Typography>
          <TextField
            id="textfield-current-password"
            placeholder="Your email address"
            variant="outlined"
            size="small"
            type="email"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AccountInfo
