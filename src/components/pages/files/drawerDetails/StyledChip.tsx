import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '.3rem',
  backgroundColor: theme.palette.primary.contrastText,
  color: 'white',
}))

export default StyledChip
