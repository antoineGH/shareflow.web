import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'

interface StyledDrawerProps extends MuiDrawerProps {
  drawerWidth: number
  open?: boolean
}

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})<StyledDrawerProps>(({ theme, drawerWidth, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(6),
      },
    }),
  },
}))

export default StyledDrawer
