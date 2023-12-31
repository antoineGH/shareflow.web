import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import type { User } from 'types/users'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'

type Props = {
  user: User | null
  editMode: 'userInfo' | 'password' | null
  isLoading?: boolean
  hasError?: boolean
  handleEditMode: (mode: 'userInfo' | 'password' | null) => void
}

function AccountInfo({
  user,
  editMode,
  isLoading,
  hasError,
  handleEditMode,
}: Props) {
  const theme = useTheme()

  const handleClickEdit = () => {
    console.log('handleClickEdit')
  }

  if (isLoading) {
    return (
      <Box p={2} pt={0}>
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="text" width={200} height={20} />
        <Skeleton variant="text" width={200} height={20} />
        <Skeleton variant="rectangular" width={402} height={100} />
      </Box>
    )
  }

  if (hasError || !user) {
    return (
      <Box p={2} pt={0}>
        <Typography variant="h6">Account Info</Typography>
        <Typography variant="subtitle2" sx={{ lineHeight: '1' }}>
          Error loading account info
        </Typography>
      </Box>
    )
  }

  const { fullName, email, avatarUrl } = user

  return (
    <Box p={2} pt={0} pb={1}>
      <Grid container spacing={2} mb={1} sx={{ maxWidth: '105px' }}>
        <Grid item xs={10}>
          <Typography variant="h6">Account</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            size="small"
            sx={{
              textTransform: 'capitalize',
              color:
                editMode === 'userInfo'
                  ? '#d32f2f'
                  : theme.palette.secondary.main,
            }}
            onClick={() => handleEditMode('userInfo')}
            startIcon={
              editMode === 'userInfo' ? (
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
            {editMode === 'userInfo' ? 'Cancel' : 'Edit'}
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ maxWidth: '612px', height: '170px' }}
        spacing={1}
        mb={1}
      >
        <Grid item xs={12}>
          <Avatar
            alt="AR avatar"
            sx={{
              width: 100,
              height: 100,
              fontSize: '3.5rem',
              pt: 2,
              border: '0.1px solid lightgray',
            }}
            src={avatarUrl || ''}
          >
            {fullName[0]}
          </Avatar>
        </Grid>
        {editMode === 'userInfo' ? (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                id="textfield-full-name"
                placeholder="Full name"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="textfield-email"
                placeholder="Email"
                variant="outlined"
                size="small"
                type="email"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                size="small"
                variant="contained"
                onClick={handleClickEdit}
                sx={{ mt: 0.25, textTransform: 'capitalize' }}
              >
                Update
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ lineHeight: '0' }}>
                {fullName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ paddingTop: '2px!important', color: 'grey' }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '.75rem',
                  color: theme.palette.secondary.contrastText,
                }}
              >
                {email}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default AccountInfo
