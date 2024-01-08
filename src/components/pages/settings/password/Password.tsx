import EditIcon from '@mui/icons-material/Edit'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormHelperText, Skeleton, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { patchUserPassword } from 'store/user/actions'
import { userStateSelector } from 'store/user/selector'
import type { User } from 'types/users'

type FormData = {
  password: string
  confirmPassword: string
}

type Props = {
  user: User | null
  isLoading?: boolean
  hasError?: boolean
  editMode: 'userInfo' | 'password' | null
  handleEditMode: (mode: 'userInfo' | 'password' | null) => void
}

function Password({
  user,
  isLoading,
  hasError,
  editMode,
  handleEditMode,
}: Props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { isLoadingPatch } = useSelector(userStateSelector)
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    reset,
  } = useForm<FormData>()

  const password = watch('password')

  const onSubmit: SubmitHandler<FormData> = data => {
    if (!user) return
    dispatch(
      patchUserPassword({
        userId: user.id,
        newPassword: data.password,
        cb: () => {
          handleEditMode(null)
          reset()
          dispatch(
            openSnackbar({
              isOpen: true,
              message: 'Password successfully updated',
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
        <Grid
          container
          spacing={1}
          direction="row"
          sx={{
            maxWidth: '612px',
          }}
        >
          <Grid item>
            <Skeleton variant="text" width={200} height={50} />
            <Skeleton variant="text" width={200} height={40} />
          </Grid>
        </Grid>
      </Box>
    )
  }

  if (hasError || !user) {
    return (
      <Box p={2} pt={0}>
        <Grid container spacing={1} direction="row" sx={{ maxWidth: '612px' }}>
          <Grid item xs={12}>
            <Typography variant="h6">Password</Typography>
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

  return (
    <Box
      p={2}
      pt={0}
      pb={1}
      sx={{
        height: {
          xs: editMode === 'password' ? '245px' : '115px',
          md: '115px',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          mb={1}
          sx={{
            maxWidth: '117px',
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">Password</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              size="small"
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.secondary.main,
                mt: 0.25,
              }}
              onClick={() => handleEditMode('password')}
              startIcon={
                <EditIcon
                  fontSize="small"
                  sx={{ position: 'relative', top: '-2px' }}
                />
              }
            >
              {editMode === 'password' ? 'Back' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
        {editMode === 'password' ? (
          <Grid
            container
            spacing={1}
            direction="row"
            sx={{
              maxWidth: '612px',
            }}
            pb={1}
          >
            <Grid item xs={12} md={4}>
              <TextField
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Required',
                  },
                  minLength: {
                    value: 5,
                    message: '5 characters minimum',
                  },
                  maxLength: {
                    value: 25,
                    message: '25 characters maximum',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,25}$/,
                    message: 'Letters and numbers',
                  },
                })}
                id="textfield-current-password"
                placeholder="Current password"
                variant="outlined"
                size="small"
                type="password"
                onBlur={() => trigger('password')}
                disabled={isLoadingPatch}
              />
              <FormHelperText
                sx={{ height: '15px' }}
                error={Boolean(errors.password)}
                style={{ visibility: errors.password ? 'visible' : 'hidden' }}
              >
                {errors.password && errors.password.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Required',
                  },
                  validate: value =>
                    value === password || 'The passwords do not match',
                })}
                id="textfield-new-password"
                placeholder="New password"
                variant="outlined"
                size="small"
                type="password"
                onBlur={() => trigger('confirmPassword')}
                disabled={isLoadingPatch}
              />
              <FormHelperText
                sx={{ height: '15px' }}
                error={Boolean(errors.confirmPassword)}
                style={{
                  visibility: errors.confirmPassword ? 'visible' : 'hidden',
                }}
              >
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={4}>
              <LoadingButton
                size="small"
                variant="contained"
                type="submit"
                loading={isLoadingPatch}
                disabled={Object.keys(errors).length > 0 || isLoadingPatch}
                sx={{ mt: 0.25, textTransform: 'capitalize', color: 'white' }}
              >
                Change password
              </LoadingButton>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={1}
            direction="row"
            sx={{ maxWidth: '612px' }}
          >
            <Grid item>
              <Typography variant="body1">
                Password has been set for this user.
              </Typography>
            </Grid>
          </Grid>
        )}
      </form>
    </Box>
  )
}

export default Password
