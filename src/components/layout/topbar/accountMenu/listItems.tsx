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
    pathname: '/settings',
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <Logout />,
    pathname: '/logout',
  },
]

export default listItems
