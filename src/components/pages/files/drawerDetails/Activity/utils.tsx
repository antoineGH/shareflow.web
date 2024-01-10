import CommentIcon from '@mui/icons-material/Comment'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import GradeIcon from '@mui/icons-material/Grade'
import LabelIcon from '@mui/icons-material/Label'
import LabelOffIcon from '@mui/icons-material/LabelOff'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import RestoreIcon from '@mui/icons-material/Restore'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import StarBorderIcon from '@mui/icons-material/StarBorder'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

  if (diffHours < 1) return 'Last hour'
  if (diffHours < 24) return 'Today'

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Yesterday'

  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)} - ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  return formattedDate
}

export function getActivityIcon(activity: string) {
  const words = activity.split(' ')
  const lastWord = words[words.length - 1]

  switch (lastWord) {
    case 'created':
      return <NoteAddIcon />
    case 'renamed':
      return <DriveFileRenameOutlineIcon />
    case 'updated':
      return <RssFeedIcon />
    case 'commented':
      return <CommentIcon />
    case 'uncommented':
      return <CommentsDisabledIcon />
    case 'deleted':
      return <DeleteIcon />
    case 'restored':
      return <RestoreIcon />
    case 'favorite':
      return <GradeIcon />
    case 'unfavorite':
      return <StarBorderIcon />
    case 'added':
      return <LabelIcon />
    case 'removed':
      return <LabelOffIcon />
    default:
      return <RssFeedIcon />
  }
}
