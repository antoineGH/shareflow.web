import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import ListItemIcon from '@mui/material/ListItemIcon'
import listItems from './listItems'
import StyledIcon from './styledIcon'
import FolderIcon from '@mui/icons-material/Folder'
import { breadcrumbAction } from './helpers'
import StyledMenu from './StyledMenu'
import { useFolderMenu } from './hooks/useFolderMenu'

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  openModalAddDocs(): void
  closeMenu: () => void
}

function Menu({ anchorEl, open, openModalAddDocs, closeMenu }: Props) {
  const { isHidden, openFolder, closeFolder } = useFolderMenu()

  function handleBreadCrumbAction(
    e: React.MouseEvent<HTMLLIElement>,
    id: string,
  ) {
    e.stopPropagation()
    breadcrumbAction({ id, closeMenu, openFolder, openModalAddDocs })
  }

  function cancelFolder(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    closeFolder()
  }

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="breadcrumb-menu"
      open={open}
      onClose={closeMenu}
      onClick={closeMenu}
      PaperProps={{
        elevation: 0,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {!isHidden && (
        <MenuItem
          key="menu-item-folder"
          onClick={event => event.stopPropagation()}
        >
          <ListItemIcon>
            <StyledIcon>
              <FolderIcon />
            </StyledIcon>
          </ListItemIcon>
          <Stack spacing={2} direction="column">
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              size="small"
            />
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                size="small"
                onClick={e => cancelFolder(e)}
              >
                Cancel
              </Button>
              <Button variant="contained" size="small">
                Create
              </Button>
            </Stack>
          </Stack>
        </MenuItem>
      )}
      {!isHidden && <Divider key="divider" sx={{ my: 0.5 }} />}
      {listItems.map(({ id, label, icon }) => (
        <MenuItem
          key={id}
          onClick={e => handleBreadCrumbAction(e, id)}
          disabled={!isHidden && id === 'folder'}
        >
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
