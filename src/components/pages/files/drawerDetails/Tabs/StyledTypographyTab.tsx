import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

interface Props {
  color?: string
}

const StyledTypographyTab = styled(Typography)<Props>(({ color }) => ({
  color: color || 'black',
  textTransform: 'capitalize',
}))

export default StyledTypographyTab
