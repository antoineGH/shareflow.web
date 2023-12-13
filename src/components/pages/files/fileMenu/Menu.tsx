import type { MouseEvent } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import StyledMenu from './StyledMenu'
import StyledIcon from './StyleIcon'
import listItems from './listItems'

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  closeMenu: (e) => void
  handleClickMore: (e: MouseEvent<HTMLLIElement>, id: string) => void
}

function Menu({ anchorEl, open, closeMenu, handleClickMore }: Props) {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={e => closeMenu(e)}
      onClick={e => closeMenu(e)}
      elevation={0}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {listItems.map(({ id, label, icon }) => (
        <MenuItem key={id} onClick={e => handleClickMore(e, id)}>
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
