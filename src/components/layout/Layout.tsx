import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Content from './Content'
import Drawer from './drawer/Drawer'
import TopBar from './topbar/TopBar'
import useTitle from 'hooks/useTitle'

const drawerWidth = 160
const appBarHeight = 42

function Layout() {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  useTitle()

  useEffect(() => {
    if (matches) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [matches])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar
        drawerWidth={drawerWidth}
        appBarHeight={appBarHeight}
        toggleDrawer={toggleDrawer}
      />
      <Drawer
        open={open}
        drawerWidth={drawerWidth}
        appBarHeight={appBarHeight}
        toggleDrawer={toggleDrawer}
      />
      <Content />
    </Box>
  )
}

export default Layout
