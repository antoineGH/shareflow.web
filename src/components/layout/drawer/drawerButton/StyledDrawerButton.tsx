import { styled } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'

interface StyledDrawerButtonProps {
  active?: boolean
}

const StyledDrawerButton = styled(ListItemButton)<StyledDrawerButtonProps>(
  ({ active }) => ({
    '& .MuiListItemIcon-root': {
      margin: '0px',
    },
    backgroundColor: active ? '#F2F2F2' : 'transparent',
  }),
)

export default StyledDrawerButton
