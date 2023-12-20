import { styled } from '@mui/material'
import Button from '@mui/material/Button'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  textTransform: 'capitalize',
  fontSize: '0.8rem',
  '& .MuiButton-startIcon': {
    marginRight: '6px',
  },
}))

export default StyledButton
