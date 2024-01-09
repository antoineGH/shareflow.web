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
        return <PictureAsPdfIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'doc':
      case 'docx':
        return <DescriptionIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'xls':
      case 'xlsx':
        return <TableChartIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'ppt':
      case 'pptx':
        return <SlideshowIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'zip':
      case 'rar':
        return <ArchiveIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'mp3':
        return <AudioFileIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'mp4':
        return <VideoFileIcon color="secondary" sx={{ fontSize: 50 }} />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon color="secondary" sx={{ fontSize: 50 }} />
      default:
        return <InsertDriveFileIcon color="secondary" sx={{ fontSize: 50 }} />
    }
  }
  return <FolderIcon color="secondary" sx={{ fontSize: 50 }} />
}
