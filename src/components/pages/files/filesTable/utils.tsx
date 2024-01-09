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

export function getRowIcon(isFolder: boolean, name: string) {
  if (!isFolder) {
    const ext = name.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf':
        return <PictureAsPdfIcon color="secondary" fontSize="medium" />
      case 'doc':
      case 'docx':
        return <DescriptionIcon color="secondary" fontSize="medium" />
      case 'xls':
      case 'xlsx':
        return <TableChartIcon color="secondary" fontSize="medium" />
      case 'ppt':
      case 'pptx':
        return <SlideshowIcon color="secondary" fontSize="medium" />
      case 'zip':
      case 'rar':
        return <ArchiveIcon color="secondary" fontSize="medium" />
      case 'mp3':
        return <AudioFileIcon color="secondary" fontSize="medium" />
      case 'mp4':
        return <VideoFileIcon color="secondary" fontSize="medium" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon color="secondary" fontSize="medium" />
      default:
        return <InsertDriveFileIcon color="secondary" fontSize="medium" />
    }
  }
  return <FolderIcon color="secondary" fontSize="medium" />
}
