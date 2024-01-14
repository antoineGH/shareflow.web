import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'

const StyledIcon = styled(SvgIcon)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
}))

export default StyledIcon
