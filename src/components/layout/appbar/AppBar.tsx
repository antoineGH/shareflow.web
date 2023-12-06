import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import StyledAppBar from './StyledAppBar'
import StyledBadge from './StyledBadge'

type Props = {
  drawerWidth: number
  appBarHeight: number
  toggleDrawer: () => void
}

function AppBar({ drawerWidth, appBarHeight, toggleDrawer }: Props) {
  return (
    <StyledAppBar
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
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontSize: '1rem' }}
        >
          shareFlow
        </Typography>
        <IconButton color="inherit">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar
              alt="OP avatar"
              sx={{ width: 28, height: 28, fontSize: '1rem' }}
            >
              OP
            </Avatar>
          </StyledBadge>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default AppBar
