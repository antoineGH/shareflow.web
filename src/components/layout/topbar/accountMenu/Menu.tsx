import MenuMUI from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import listItems from './listItems'
import StyledIcon from './StyledIcon'

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  closeMenu: () => void
}

function Menu({ anchorEl, open, closeMenu }: Props) {
  return (
    <MenuMUI
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={closeMenu}
      onClick={closeMenu}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {listItems.map(({ id, label, icon, action }) => (
        <MenuItem key={id} onClick={action}>
          <ListItemIcon>
            <StyledIcon>{icon}</StyledIcon>
          </ListItemIcon>
          {label}
        </MenuItem>
      ))}
    </MenuMUI>
  )
}

export default Menu
