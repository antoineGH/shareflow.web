import CommentIcon from '@mui/icons-material/Comment'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import RestoreIcon from '@mui/icons-material/Restore'
import StyleIcon from '@mui/icons-material/Style'

export type ListItemKey =
  | 'download'
  | 'comments'
  | 'tags'
  | 'rename'
  | 'delete'
  | 'restore'
  | 'remove'

export type ListItem = {
  id: ListItemKey
  label: string
  icon: JSX.Element
  active?: boolean
}

const listItems: ListItem[] = [
  {
    id: 'download',
    label: 'Download',
    icon: <DownloadIcon />,
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: <CommentIcon />,
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: <StyleIcon />,
  },
  {
    id: 'rename',
    label: 'Rename',
    icon: <EditIcon />,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <DeleteIcon />,
  },
  {
    id: 'restore',
    label: 'Restore',
    icon: <RestoreIcon />,
  },
  {
    id: 'remove',
    label: 'Remove',
    icon: <DeleteIcon />,
  },
]

export default listItems
