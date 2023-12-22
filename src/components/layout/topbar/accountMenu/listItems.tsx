import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  pathname: string
}

const listItems: ListItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    pathname: '/auth/settings',
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <Logout />,
    pathname: '/auth/logout',
  },
]

export default listItems
