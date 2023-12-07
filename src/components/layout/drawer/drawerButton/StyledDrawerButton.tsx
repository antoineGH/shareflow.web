import { styled } from '@mui/material/styles'
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton'

interface StyledDrawerButtonProps extends ListItemButtonProps {
  activeState: 'active' | 'inactive'
}

const StyledDrawerButton = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ activeState, ...otherProps }: StyledDrawerButtonProps) => (
    <ListItemButton {...otherProps} />
  ),
)(({ activeState }) => ({
  '& .MuiListItemIcon-root': {
    margin: '0px',
  },
  backgroundColor: activeState === 'active' ? '#F2F2F2' : 'transparent',
}))

export default StyledDrawerButton
