import { Alert, styled } from '@mui/material'

const StyledAlert = styled(Alert)({
  fontSize: '.8rem',
  padding: '0 .5rem',
  paddingTop: '.1rem',
  borderRadius: '3px',
  width: '100%',
  marginLeft: 0,
  backgroundColor: '#6c63ff29',
  color: '#6C63FF',
  '& .MuiAlert-icon': {
    color: '#6C63FF',
  },
})

export default StyledAlert
