import { useContext, useEffect, useState } from 'react'

import { FormHelperText, useTheme } from '@mui/material'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { alpha } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from 'components/auth/AuthContext'
import { useDispatch } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { Status } from 'types/store'

import StyledAlert from './StyledAlert'
import StyledButton from './StyledButton'

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE)
  const { login, isAuthenticated } = useContext(AuthContext)
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>()

  const disabledSubmit = Boolean(errors.email) || Boolean(errors.password)
  const isLoading = status === Status.PENDING

  const backgroundSVG = '/shareflow/stacked-waves.svg'

  useEffect(() => {
    if (!isAuthenticated) return
    navigate('/auth/files')
  }, [isAuthenticated])

  const onLoadingSuccess = () => {
    setStatus(Status.SUCCEEDED)
    navigate('/auth/files')
  }

  const onLoadingError = () => {
    setStatus(Status.FAILED)
  }

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email, password } = data

    if (!email || !password) {
      return dispatch(
        openSnackbar({
          isOpen: true,
          message: 'Please fill in all fields',
          severity: 'error',
        }),
      )
    }

    setStatus(Status.PENDING)
    login(email, password, onLoadingSuccess, onLoadingError)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    dispatch(
      openSnackbar({
        isOpen: true,
        message: 'Copied to clipboard',
        severity: 'info',
      }),
    )
  }

  return (
    <Container
      id="container-login"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundSVG})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (min-width: 1200px)': {
          maxWidth: 'none',
        },
        '& .MuiContainer-root': {},
      }}
    >
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'start',
              px: '1rem',
              py: '2rem',
              backgroundColor: alpha('#ffffff', 0.9),
            }}
            elevation={1}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              mb={4}
              color={theme.palette.primary.main}
              sx={{ fontWeight: 'bold' }}
            >
              shareFlow
            </Typography>
            <StyledAlert severity="info">
              <AlertTitle>Demo App</AlertTitle>
              <Grid container>
                <Grid item xs={12} my={0.75}>
                  <Box
                    onClick={() => copyToClipboard('demo@demo.au')}
                    style={{ cursor: 'pointer' }}
                  >
                    username: <strong>demo@demo.au</strong>
                  </Box>
                </Grid>
                <Grid item xs={12} mb={0.75}>
                  <Box
                    onClick={() => copyToClipboard('demo1234')}
                    style={{ cursor: 'pointer' }}
                  >
                    password: <strong>demo1234</strong>
                  </Box>
                </Grid>
              </Grid>
            </StyledAlert>
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
              onBlur={() => trigger('email')}
              label="Email"
              variant="outlined"
              margin="normal"
              disabled={isLoading}
              sx={{ width: '100%', backgroundColor: 'white' }}
            />
            <FormHelperText
              sx={{ height: '15px', textAlign: 'right', width: '100%' }}
              error={Boolean(errors.email)}
              style={{ visibility: errors.email ? 'visible' : 'hidden' }}
            >
              {errors.email && errors.email.message}
            </FormHelperText>
            <TextField
              {...register('password', {
                required: {
                  value: true,
                  message: 'Required',
                },
              })}
              error={Boolean(errors.password)}
              onBlur={() => trigger('password')}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              disabled={isLoading}
              sx={{ width: '100%', backgroundColor: 'white' }}
            />

            <FormHelperText
              sx={{ height: '15px', textAlign: 'right', width: '100%' }}
              error={Boolean(errors.password)}
              style={{ visibility: errors.password ? 'visible' : 'hidden' }}
            >
              {errors.password && errors.password.message}
            </FormHelperText>
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
              loading={isLoading}
              disabled={disabledSubmit || isLoading}
            >
              Login
            </StyledButton>
          </Paper>
        </form>
      </Box>
    </Container>
  )
}

export default Login
