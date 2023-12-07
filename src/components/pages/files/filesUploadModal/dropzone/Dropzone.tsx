import { useDropzone, DropzoneProps } from 'react-dropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import UploadIcon from '@mui/icons-material/Upload'
import { type SxProps } from '@mui/material'
import { DropzoneContainer } from './StyledDropzone'

type Props = Omit<DropzoneProps, 'children'> & {
  sx?: SxProps
  title?: string
  subtitle?: string
}

function DropZone({
  onDrop,
  disabled = false,
  title = 'Drag and drop or import',
  subtitle,
  sx = {},
  ...rest
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    ...rest,
    onDrop,
    disabled,
  })

  return (
    <DropzoneContainer
      {...getRootProps()}
      data-testid="dropzone-documents"
      disabled={disabled}
      sx={sx}
    >
      <Box
        component="input"
        data-testid="dropzone-document-inputs"
        id="dropzone-document-inputs"
        sx={{ display: 'none' }}
        {...getInputProps()}
      />
      <UploadIcon sx={{ fill: disabled ? 'grey' : 'black' }} fontSize="large" />
      <Typography>{title}</Typography>
      {subtitle && <Typography variant="body2">{subtitle}</Typography>}
    </DropzoneContainer>
  )
}

export default DropZone
