import { useLocation } from 'react-router-dom'
import ListItemText from '@mui/material/ListItemText'
import StyledIcon from '../StyledIcon'
import StyledDrawerButton from './StyledDrawerButton'
import StyledDrawerIcon from './StyledDrawerIcon'
import { useTheme } from '@mui/material'

type Props = {
  label: string
  path: string
  icon: JSX.Element
  handleDrawerNavigation: (path: string) => void
}

function DrawerButton({ label, path, icon, handleDrawerNavigation }: Props) {
  const { pathname } = useLocation()
  const theme = useTheme()
  const handleClick = () => handleDrawerNavigation(path)

  const activeState = pathname === path ? 'active' : 'inactive'

  return (
    <StyledDrawerButton onClick={handleClick} activeState={activeState}>
      <StyledDrawerIcon>
        <StyledIcon
          activeState={activeState}
          activeColor={theme.palette.secondary.contrastText}
        >
          {icon}
        </StyledIcon>
      </StyledDrawerIcon>
      <ListItemText
        secondary={label}
        secondaryTypographyProps={{
          fontSize: '.8rem',
          color:
            activeState === 'active'
              ? theme.palette.secondary.contrastText
              : 'inherit',
          fontWeight: activeState === 'active' ? 'bold' : 'normal',
        }}
      />
    </StyledDrawerButton>
  )
}

export default DrawerButton
