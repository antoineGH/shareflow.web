import ArchiveIcon from '@mui/icons-material/Archive'
import AudioFileIcon from '@mui/icons-material/AudioFile'
import DescriptionIcon from '@mui/icons-material/Description'
import FolderIcon from '@mui/icons-material/Folder'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SlideshowIcon from '@mui/icons-material/Slideshow'
import TableChartIcon from '@mui/icons-material/TableChart'
import VideoFileIcon from '@mui/icons-material/VideoFile'
import { styled, SvgIcon } from '@mui/material'

export const StyledIcon = styled(SvgIcon)({
  color: '#6c63ff91',
  fontSize: '1.5rem',
})

export function getRowIcon(isFolder: boolean, name: string) {
  if (!isFolder) {
    const ext = name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf':
        return <PictureAsPdfIcon />
      case 'doc':
      case 'docx':
        return <DescriptionIcon />
      case 'xls':
      case 'xlsx':
        return <TableChartIcon />
      case 'ppt':
      case 'pptx':
        return <SlideshowIcon />
      case 'zip':
      case 'rar':
        return <ArchiveIcon />
      case 'mp3':
        return <AudioFileIcon />
      case 'mp4':
        return <VideoFileIcon />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon color="secondary" fontSize="medium" />
      default:
        return <InsertDriveFileIcon />
    }
  }
  return <FolderIcon />
}
