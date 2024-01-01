import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'

const StyledAlert = styled(Alert)({
  fontSize: '.8rem',
  padding: '0 .5rem',
  paddingTop: '.1rem',
  borderRadius: '3px',
  width: '100%',
  marginRight: '.5rem',
  marginLeft: 0,
  backgroundColor: '#6c63ff29',
  color: '#6C63FF',
  '& .MuiAlert-icon': {
    color: '#6C63FF',
  },
})

export default StyledAlert
