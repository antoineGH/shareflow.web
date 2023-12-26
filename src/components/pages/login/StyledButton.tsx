import { styled } from '@mui/material'
import Button from '@mui/material/Button'

const StyledButton = styled(Button)(() => ({
  color: 'white',
  textTransform: 'capitalize',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '1rem',
}))

export default StyledButton
