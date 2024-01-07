import type { MouseEvent } from 'react'

import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'

import type { ListItem, ListItemKey } from './listItems'
import StyledMenu from './StyledMenu'
import StyledIcon from './StyleIcon'

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  actions: ListItem[]
  closeMenu: (e) => void
  handleClickMore: (
    e: MouseEvent<HTMLLIElement>,
    clickedAction: ListItemKey,
  ) => void
}

function Menu({ anchorEl, open, actions, closeMenu, handleClickMore }: Props) {
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
      {actions.map(({ id, label, icon }) => (
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
