import UploadIcon from '@mui/icons-material/Upload'
import FolderIcon from '@mui/icons-material/Folder'

type ListItem = {
  id: string
  label: string
  icon: JSX.Element
  active: boolean
}

const listItems: ListItem[] = [
  {
    id: 'folder',
    label: 'Folder',
    icon: <FolderIcon />,
    active: true,
  },
  {
    id: 'file',
    label: 'Upload',
    icon: <UploadIcon />,
    active: true,
  },
]

export default listItems
