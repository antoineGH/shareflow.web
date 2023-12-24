import { AuthContext } from 'components/auth/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleClickLogin = () => {
    login()
    navigate('/auth/files')
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
            sx={{ width: '100%', backgroundColor: 'white' }}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            sx={{ width: '100%', backgroundColor: 'white' }}
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
          />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleClickLogin}
          >
            Login
          </StyledButton>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
