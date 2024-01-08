import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import GradeIcon from '@mui/icons-material/Grade'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import RestoreIcon from '@mui/icons-material/Restore'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Theme } from '@mui/material'

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

export function getActivityIcon(activity: string, theme: Theme) {
  const words = activity.split(' ')
  const lastWord = words[words.length - 1]

  switch (lastWord) {
    case 'created':
      return (
        <NoteAddIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'renamed':
      return (
        <DriveFileRenameOutlineIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'updated':
      return (
        <RssFeedIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'deleted':
      return (
        <DeleteIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'restored':
      return (
        <RestoreIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'favorite':
      return (
        <GradeIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    case 'unfavorite':
      return (
        <StarBorderIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
    default:
      return (
        <RssFeedIcon
          sx={{ color: theme.palette.primary.main, fontSize: '1.4rem' }}
        />
      )
  }
}
