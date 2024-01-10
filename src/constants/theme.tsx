import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    body1: {
      fontSize: '.9rem',
    },
    body2: {
      fontSize: '.8rem',
    },
  },
  palette: {
    primary: {
      main: '#6C63FF',
      light: '#c0c0c0',
      dark: '#6c63ff29',
      contrastText: '#6c63ffba',
    },
    secondary: {
      main: '#6C63FF',
      light: '#6c63ff91',
      dark: 'grey',
      contrastText: '#000000c2',
    },
    success: {
      main: '#6C63FF',
    },
    info: {
      main: '#6C63FF',
    },
  },
})

export { theme }
