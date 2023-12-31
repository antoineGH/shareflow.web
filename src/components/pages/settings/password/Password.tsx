import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import { useTheme } from '@mui/material'

type Props = {
  editMode: 'userInfo' | 'password' | null
  handleEditMode: (mode: 'userInfo' | 'password' | null) => void
}

function Password({ editMode, handleEditMode }: Props) {
  const theme = useTheme()

  const handleClickChangePassword = () => {
    console.log('Change password')
  }

  return (
    <Box p={2} pt={0} pb={1} height={'110px'}>
      <Grid container spacing={2} mb={1} sx={{ maxWidth: '117px' }}>
        <Grid item xs={10}>
          <Typography variant="h6">Password</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            size="small"
            sx={{
              textTransform: 'capitalize',
              color:
                editMode === 'password'
                  ? '#d32f2f'
                  : theme.palette.secondary.main,
            }}
            onClick={() => handleEditMode('password')}
            startIcon={
              editMode === 'password' ? (
                <CancelIcon
                  fontSize="small"
                  color="error"
                  sx={{ position: 'relative', top: '-2px' }}
                />
              ) : (
                <EditIcon
                  fontSize="small"
                  sx={{ position: 'relative', top: '-2px' }}
                />
              )
            }
          >
            {editMode === 'password' ? 'Cancel' : 'Edit'}
          </Button>
        </Grid>
      </Grid>
      {editMode === 'password' ? (
        <Grid
          container
          spacing={1}
          direction="row"
          sx={{ maxWidth: '612px' }}
          pb={1}
        >
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
              sx={{ mt: 0.25, textTransform: 'capitalize' }}
            >
              Change password
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} direction="row" sx={{ maxWidth: '612px' }}>
          <Grid item>
            <Typography variant="body1">
              Password has been set for this user.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Password
