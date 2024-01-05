import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material'

const StyledButton = styled(LoadingButton)(() => ({
  color: 'white',
  textTransform: 'capitalize',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '1rem',
  '&:hover': {
    backgroundColor: '#6C63FF',
  },
}))

export default StyledButton
