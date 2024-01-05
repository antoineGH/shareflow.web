import { type SubmitHandler, useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import type { User } from 'types/users'
import { FormHelperText, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'store/hooks'
import { updateUser } from 'store/user/actions'
import { userStateSelector } from 'store/user/selector'
import { openSnackbar } from 'store/snackbar/slice'

type FormData = {
  fullName: string
  email: string
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>()
  const dispatch = useDispatch()
  const { isLoadingUpdate } = useSelector(userStateSelector)

  const onSubmit: SubmitHandler<FormData> = data => {
    if (!user) return
    dispatch(
      updateUser({
        userId: user.id,
        newUser: { fullName: data.fullName, email: data.email },
        cb: () => {
          handleEditMode(null)
          reset()
          dispatch(
            openSnackbar({
              isOpen: true,
              message: 'Account Successfully updated',
              severity: 'success',
            }),
          )
        },
      }),
    )
  }

  if (isLoading) {
    return (
      <Box p={2} pt={0}>
        <Skeleton variant="text" width={200} height={50} />
        <Skeleton variant="circular" width={120} height={120} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={200} height={40} />
      </Box>
    )
  }

  if (hasError || !user) {
    return (
      <Box p={2} pt={0}>
        <Grid container spacing={1} direction="row" sx={{ maxWidth: '612px' }}>
          <Grid item xs={12}>
            <Typography variant="h6">Account </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ lineHeight: '1' }}>
              Error loading account
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  const { fullName, email, avatarUrl } = user

  return (
    <Box p={2} pt={0} pb={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={1} sx={{ maxWidth: '105px' }}>
          <Grid item xs={10}>
            <Typography variant="h6">Account</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              size="small"
              sx={{
                mt: 0.25,
                textTransform: 'capitalize',
                color: theme.palette.secondary.main,
              }}
              onClick={() => handleEditMode('userInfo')}
              startIcon={
                <EditIcon
                  fontSize="small"
                  sx={{ position: 'relative', top: '-2px' }}
                />
              }
            >
              {editMode === 'userInfo' ? 'Back' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            maxWidth: '612px',
            height: '230px',
            mb: {
              xs: editMode === 'userInfo' ? 15 : 1,
              md: 1,
            },
          }}
          spacing={1}
        >
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Avatar
              alt="AR avatar"
              sx={{
                width: 150,
                height: 150,
                fontSize: '3.5rem',
                backgroundColor: '#6c63ff29',
              }}
              src={avatarUrl || ''}
            >
              {fullName[0]}
            </Avatar>
          </Grid>
          {editMode === 'userInfo' ? (
            <>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  mt: {
                    xs: 0,
                    md: 1,
                  },
                }}
              >
                <TextField
                  {...register('fullName', {
                    required: {
                      value: true,
                      message: 'Required',
                    },
                    minLength: {
                      value: 3,
                      message: '3 characters minimum',
                    },
                    maxLength: {
                      value: 25,
                      message: '25 characters maximum',
                    },
                  })}
                  error={Boolean(errors.fullName)}
                  onBlur={() => trigger('fullName')}
                  id="textfield-full-name"
                  placeholder="Full name"
                  variant="outlined"
                  size="small"
                  disabled={isLoadingUpdate}
                  defaultValue={fullName}
                />
                <FormHelperText
                  sx={{ height: '15px' }}
                  error={Boolean(errors.fullName)}
                  style={{ visibility: errors.fullName ? 'visible' : 'hidden' }}
                >
                  {errors.fullName && errors.fullName.message}
                </FormHelperText>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  mt: {
                    xs: 0,
                    md: 1,
                  },
                }}
              >
                <TextField
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Required',
                    },
                    minLength: {
                      value: 3,
                      message: '3 characters minimum',
                    },
                    maxLength: {
                      value: 25,
                      message: '25 characters maximum',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={Boolean(errors.email)}
                  id="textfield-email"
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  type="email"
                  onBlur={() => trigger('email')}
                  disabled={isLoadingUpdate}
                  defaultValue={email}
                />
                <FormHelperText
                  sx={{ height: '15px' }}
                  error={Boolean(errors.email)}
                  style={{ visibility: errors.email ? 'visible' : 'hidden' }}
                >
                  {errors.email && errors.email.message}
                </FormHelperText>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  mt: {
                    xs: 0,
                    md: 1,
                  },
                }}
              >
                <LoadingButton
                  size="small"
                  variant="contained"
                  type="submit"
                  loading={isLoadingUpdate}
                  disabled={Object.keys(errors).length > 0 || isLoadingUpdate}
                  sx={{ mt: 0.25, textTransform: 'capitalize', color: 'white' }}
                >
                  Update
                </LoadingButton>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{ lineHeight: '0', fontWeight: 'bold' }}
                >
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
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 'bold',
                  }}
                >
                  {email}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Box>
  )
}

export default AccountInfo
