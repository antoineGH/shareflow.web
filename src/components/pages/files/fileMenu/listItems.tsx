import CommentIcon from '@mui/icons-material/Comment'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import StyleIcon from '@mui/icons-material/Style'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  active: boolean
}

const listItems: ListItem[] = [
  {
    id: 'download',
    label: 'Download',
    icon: <DownloadIcon />,
    active: true,
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: <CommentIcon />,
    active: true,
  },
  {
    id: 'tags',
    label: 'Tags',
    icon: <StyleIcon />,
    active: true,
  },
  {
    id: 'rename',
    label: 'Rename',
    icon: <EditIcon />,
    active: true,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <DeleteIcon />,
    active: true,
  },
]

export default listItems
