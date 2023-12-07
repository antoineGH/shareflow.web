import { useLocation, useNavigate } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import listItems from './listItems'
import StyledIcon from './StyledIcon'
import { drawerNavigation } from './helpers'
import StyledMenu from './StyledMenu'

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  closeMenu: () => void
}

function Menu({ anchorEl, open, closeMenu }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleDrawerNavigation(path: string) {
    drawerNavigation({ path, pathname, navigate, closeMenu })
  }

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={closeMenu}
      onClick={closeMenu}
      PaperProps={{
        elevation: 0,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {listItems.map(({ id, label, icon, pathname }) => (
        <MenuItem key={id} onClick={() => handleDrawerNavigation(pathname)}>
          <ListItemIcon>
            <StyledIcon>{icon}</StyledIcon>
          </ListItemIcon>
          {label}
        </MenuItem>
      ))}
    </StyledMenu>
  )
}

export default Menu
