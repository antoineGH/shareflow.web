import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import StyledTopBar from './StyledTopBar'
import AccountMenu from './accountMenu/AccountMenu'
import Search from './Search'

type Props = {
  drawerWidth: number
  appBarHeight: number
  toggleDrawer: () => void
}

function TopBar({ drawerWidth, appBarHeight, toggleDrawer }: Props) {
  return (
    <StyledTopBar
      position="absolute"
      drawerWidth={drawerWidth}
      appBarHeight={appBarHeight}
    >
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ marginRight: '1rem' }}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="white"
          noWrap
          sx={{ flexGrow: 1, fontSize: '1rem' }}
        >
          shareFlow
        </Typography>
        <Search />
        <AccountMenu />
      </Toolbar>
    </StyledTopBar>
  )
}

export default TopBar
