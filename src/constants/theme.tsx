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
    secondary: {
      main: '#1a73e8',
    },
  },
})

export { theme }
