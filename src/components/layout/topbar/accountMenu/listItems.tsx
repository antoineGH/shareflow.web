import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  path: string
}

const listItems: ListItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    path: '/auth/settings',
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <Logout />,
    path: '/auth/logout',
  },
]

export default listItems
