import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import StyledDrawer from './StyledDrawer'
import { mainListItems, secondaryListItems } from '../listItems'
import DrawerButton from './drawerButton/DrawerButton'
import { Box } from '@mui/material'

type Props = {
  open: boolean
  drawerWidth: number
  appBarHeight: number
  toggleDrawer: () => void
}

function Drawer({ open, drawerWidth, appBarHeight, toggleDrawer }: Props) {
  const handleDrawerNavigation = (path: string) => {
    console.log(path)
  }

  return (
    <StyledDrawer variant="permanent" drawerWidth={drawerWidth} open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
          '&.MuiToolbar-root': {
            minHeight: `${appBarHeight}px`,
            height: `${appBarHeight}px`,
            padding: '0px',
          },
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          p: 0,
        }}
      >
        <Box>
          {mainListItems.map(({ id, label, icon, path }) => (
            <DrawerButton
              key={id}
              label={label}
              icon={icon}
              path={path}
              handleDrawerNavigation={handleDrawerNavigation}
            />
          ))}
        </Box>
        <Box>
          <Divider sx={{ my: 1 }} />
          {secondaryListItems.map(({ id, label, icon, path }) => (
            <DrawerButton
              key={id}
              label={label}
              icon={icon}
              path={path}
              handleDrawerNavigation={handleDrawerNavigation}
            />
          ))}
        </Box>
      </List>
    </StyledDrawer>
  )
}

export default Drawer
