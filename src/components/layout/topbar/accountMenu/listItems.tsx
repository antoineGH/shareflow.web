import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  path?: string
  action: () => void
}

const listItems: ListItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    action: () => {
      console.log('settings')
    },
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: <Logout />,
    action: () => {
      console.log('logout')
    },
  },
]

export default listItems
