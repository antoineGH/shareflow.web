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
      return <iframe src={previewFileUrl} width="100%" />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return <img src={previewFileUrl} width="100%" />
    case 'mp4':
    case 'webm':
    case 'mov':
      return <video src={previewFileUrl} width="100%" controls />
    case 'mp3':
    case 'wav':
      return <audio src={previewFileUrl} controls />
    default:
      return null
  }
}
export default FilePreview
