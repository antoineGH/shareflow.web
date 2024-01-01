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
      dark: 'grey',
      contrastText: '#000000c2',
    },
    secondary: {
      main: '#6C63FF',
      light: '#c0c0c0',
      dark: 'grey',
      contrastText: '#000000c2',
    },
  },
})

export { theme }
