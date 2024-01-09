import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material'

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'capitalize',
  fontSize: '0.8rem',
  '& .MuiButton-startIcon': {
    marginRight: '6px',
  },
}))

export default StyledButton
