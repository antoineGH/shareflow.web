import { styled } from '@mui/material'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '36px',
  borderRadius: 5,
  border: '1px solid rgba(221,221,221,.9)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#55555547',
  },
}))

export default StyledLinearProgress
