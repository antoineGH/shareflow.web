import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'

interface AppBarProps extends MuiAppBarProps {
  drawerWidth: number
  appBarHeight: number
  open?: boolean
}

const StyledTopBar = styled(MuiAppBar, {
  shouldForwardProp: prop =>
    prop !== 'open' && prop !== 'appBarHeight' && prop !== 'drawerWidth',
})<AppBarProps>(({ theme, drawerWidth, appBarHeight, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  '& .MuiToolbar-root': {
    minHeight: `${appBarHeight}px`,
    height: `${appBarHeight}px`,
    paddingLeft: '1rem',
    paddingRight: '.5rem',
  },
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default StyledTopBar
