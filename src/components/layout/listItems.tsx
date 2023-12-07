import FolderIcon from '@mui/icons-material/Folder'
import GradeIcon from '@mui/icons-material/Grade'
import StyleIcon from '@mui/icons-material/Style'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  path: string
}

const mainListItems: ListItem[] = [
  {
    id: 'allFiles',
    label: 'All files',
    icon: <FolderIcon />,
    path: '/',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <GradeIcon />,
    path: '/favorites',
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: <StyleIcon />,
    path: '/tags',
  },
]

const secondaryListItems: ListItem[] = [
  {
    id: 'deletedFiles',
    label: 'Deleted files',
    icon: <DeleteIcon />,
    path: '/deleted',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
]

export { mainListItems, secondaryListItems }
