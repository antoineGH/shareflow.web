import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

const StyledAlert = styled(Alert)({
  fontSize: '.8rem',
  padding: '0 .5rem',
  paddingTop: '.1rem',
  borderRadius: '3px',
  backgroundColor: '#6c63ff29',
  marginBottom: '1rem',
  color: '#6C63FF',
  '& .MuiAlert-icon': {
    color: '#6C63FF',
  },
})

export default StyledAlert
