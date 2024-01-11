import { useContext, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from 'components/auth/AuthContext'
import useTitle from 'hooks/useTitle'

import Content from './Content'
import Drawer from './drawer/Drawer'
import TopBar from './topbar/TopBar'

const drawerWidth = 160
const appBarHeight = 42

function Layout({ Component }) {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useTitle()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

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
      <Content Component={Component} />
    </Box>
  )
}

export default Layout
