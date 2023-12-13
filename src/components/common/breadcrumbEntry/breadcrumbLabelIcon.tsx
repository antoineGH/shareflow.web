import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete'
import GradeIcon from '@mui/icons-material/Grade'
import StyleIcon from '@mui/icons-material/Style'
import SettingsIcon from '@mui/icons-material/Settings'
import type { BreadcrumbsLabelIcon } from './types'

const breadcrumbsLabelIcon: BreadcrumbsLabelIcon = {
  Files: {
    label: 'All Files',
    icon: <FolderIcon />,
  },
  Favorites: {
    label: 'My Favorites',
    icon: <GradeIcon />,
  },
  Tags: {
    label: 'My Tags',
    icon: <StyleIcon />,
  },
  Settings: {
    label: 'My Settings',
    icon: <SettingsIcon />,
  },
  Deleted: {
    label: 'My Deleted files',
    icon: <DeleteIcon />,
  },
}

export default breadcrumbsLabelIcon
