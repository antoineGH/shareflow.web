import { useLocation } from 'react-router-dom'
import ListItemText from '@mui/material/ListItemText'
import StyledIcon from '../StyledIcon'
import StyledDrawerButton from './StyledDrawerButton'
import StyledDrawerIcon from './StyledDrawerIcon'

type Props = {
  label: string
  path: string
  icon: JSX.Element
  handleDrawerNavigation: (path: string) => void
}

function DrawerButton({ label, path, icon, handleDrawerNavigation }: Props) {
  const { pathname } = useLocation()
  const handleClick = () => handleDrawerNavigation(path)

  return (
    <StyledDrawerButton
      onClick={handleClick}
      activeState={pathname === path ? 'active' : 'inactive'}
    >
      <StyledDrawerIcon>
        <StyledIcon>{icon}</StyledIcon>
      </StyledDrawerIcon>
      <ListItemText
        secondary={label}
        secondaryTypographyProps={{ fontSize: '.8rem' }}
      />
    </StyledDrawerButton>
  )
}

export default DrawerButton
