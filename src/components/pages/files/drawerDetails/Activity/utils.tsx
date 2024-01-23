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

  const formattedDate = `${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })} - ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`

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
