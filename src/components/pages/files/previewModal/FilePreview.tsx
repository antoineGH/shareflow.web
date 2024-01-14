import { DialogContent } from '@mui/material'
import { useSelector } from 'react-redux'

import { selectFileByIdSelector } from 'store/files/selector'

type Props = {
  previewFileUrl: string
  previewFileId: number
}
function FilePreview({ previewFileUrl, previewFileId }: Props) {
  const file = useSelector(selectFileByIdSelector(previewFileId))
  const previewFileExt = file?.path?.split('.').pop() || ''

  if (!previewFileExt) return null

  switch (previewFileExt) {
    case 'pdf':
      return (
        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
            height: 'calc(100vh - 154px)',
          }}
        >
          <iframe src={previewFileUrl} width="100%" height="100%" />
        </DialogContent>
      )
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return (
        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={previewFileUrl} width="100%" />
        </DialogContent>
      )
    case 'mp4':
    case 'webm':
    case 'mov':
      return (
        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <video src={previewFileUrl} width="100%" controls />
        </DialogContent>
      )
    case 'mp3':
    case 'wav':
      return (
        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 1150px)',
          }}
        >
          <audio src={previewFileUrl} controls />
        </DialogContent>
      )
    default:
      return null
  }
}
export default FilePreview
