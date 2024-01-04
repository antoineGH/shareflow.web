import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'components/auth/AuthContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { alpha } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import StyledButton from './StyledButton'
import { FormHelperText } from '@mui/material'
import { Status } from 'types/store'

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>()

  const disabledSubmit = Boolean(errors.email) || Boolean(errors.password)
  const isLoading = status === Status.PENDING

  const onLoadingSuccess = () => {
    setStatus(Status.SUCCEEDED)
    navigate('/auth/files')
  }

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email, password } = data

    if (!email || !password) return

    setStatus(Status.PENDING)
    login(email, password, onLoadingSuccess)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/assets/bg_1400.png)',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '1920px',
        '@media (min-width: 1200px)': {
          backgroundColor: 'orange',
          maxWidth: '2560px',
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
              height: '40vh',
              minHeight: '400px',
              px: '1rem',
              py: '2rem',
              backgroundColor: alpha('#ffffff', 0.85),
            }}
            elevation={1}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              shareFlow
            </Typography>
            <Alert severity="info" sx={{ mb: 1 }}>
              <AlertTitle>Demo App</AlertTitle>
              <Grid container>
                <Grid item xs={12}>
                  username: <strong>demo@demo.au</strong>
                </Grid>
                <Grid item xs={12}>
                  password: <strong>demo1234</strong>
                </Grid>
              </Grid>
            </Alert>
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
              sx={{ height: '15px' }}
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
              sx={{ height: '15px' }}
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
