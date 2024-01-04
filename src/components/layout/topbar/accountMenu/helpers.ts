type Props = {
  path: string
  pathname: string
  navigate: (path: string) => void
  closeMenu: () => void
  logout: () => void
}

const drawerNavigation = ({
  path,
  pathname,
  navigate,
  closeMenu,
  logout,
}: Props) => {
  if (path === '/auth/logout') {
    logout()
    navigate('/login')
    closeMenu()
  } else if (path === pathname) {
    closeMenu()
  } else {
    navigate(path)
    closeMenu()
  }
}

export { drawerNavigation }
