import FolderIcon from '@mui/icons-material/Folder'
import GradeIcon from '@mui/icons-material/Grade'
import StyleIcon from '@mui/icons-material/Style'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'

export type ListItem = {
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
    path: '/auth/files',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <GradeIcon />,
    path: '/auth/favorites',
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: <StyleIcon />,
    path: '/auth/tags',
  },
]

const secondaryListItems: ListItem[] = [
  {
    id: 'deletedFiles',
    label: 'Deleted files',
    icon: <DeleteIcon />,
    path: '/auth/deleted',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/auth/settings',
  },
]

export { mainListItems, secondaryListItems }
