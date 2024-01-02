import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import StyledTopBar from './StyledTopBar'
import AccountMenu from './accountMenu/AccountMenu'
import Search from './Search'
import { Button, Link } from '@mui/material'

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
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Button
          component={Link}
          href="/auth/files"
          color="inherit"
          sx={{
            flexGrow: 1,
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'white',
            },
            textTransform: 'none',
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="white"
            noWrap
            sx={{ fontSize: '1rem', flexGrow: 1 }}
          >
            shareFlow
          </Typography>
        </Button>
        <Search />
        <AccountMenu />
      </Toolbar>
    </StyledTopBar>
  )
}

export default TopBar
