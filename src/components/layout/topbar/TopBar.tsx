import MenuIcon from '@mui/icons-material/Menu'
import { Button, Link, useMediaQuery, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import AccountMenu from './accountMenu/AccountMenu'
import StyledTopBar from './StyledTopBar'

type Props = {
  drawerWidth: number
  appBarHeight: number
  toggleDrawer: () => void
}

function TopBar({ drawerWidth, appBarHeight, toggleDrawer }: Props) {
  const theme = useTheme()
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const navigate = useNavigate()

  function handleLogoClick() {
    navigate('/auth/files')
  }

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
        {isBigScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        )}
        <Button
          component={Link}
          color="inherit"
          onClick={handleLogoClick}
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
        <AccountMenu />
      </Toolbar>
    </StyledTopBar>
  )
}

export default TopBar
