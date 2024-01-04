import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import StyledTopBar from './StyledTopBar'
import AccountMenu from './accountMenu/AccountMenu'
import Search from './Search'

type Props = {
  drawerWidth: number
  appBarHeight: number
  toggleDrawer: () => void
}

function TopBar({ drawerWidth, appBarHeight, toggleDrawer }: Props) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const hideSearch = isXs || isMd

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
        {!hideSearch && <Search />}
        <AccountMenu />
      </Toolbar>
    </StyledTopBar>
  )
}

export default TopBar
