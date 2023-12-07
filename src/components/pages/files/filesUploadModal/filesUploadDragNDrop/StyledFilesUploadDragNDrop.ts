import { styled, Box } from '@mui/material'

const StyledFilesUploadDragNDrop = styled(Box)(({ theme: t }) => ({
  position: 'absolute',
  top: '8px',
  bottom: '8px',
  left: '8px',
  right: '8px',

  background: `${t.palette.primary.main}14`, // with opacity
  border: `2px solid ${t.palette.primary.main}`,

  zIndex: 10,
  padding: '64px',
  boxSizing: 'border-box',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '4px',
}))

export { StyledFilesUploadDragNDrop }
