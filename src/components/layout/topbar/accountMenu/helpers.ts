type Props = {
  path: string
  pathname: string
  navigate: (path: string) => void
  closeMenu: () => void
}

const drawerNavigation = ({ path, pathname, navigate, closeMenu }: Props) => {
  if (path === '/logout') {
    console.log('logout')
    closeMenu()
  } else if (path === pathname) {
    closeMenu()
  } else {
    navigate(path)
    closeMenu()
  }
}

export { drawerNavigation }
