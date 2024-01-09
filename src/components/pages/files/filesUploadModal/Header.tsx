import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

type Props = {
  close(): void
  disabledClose: boolean
}

function Header({ close, disabledClose }: Props) {
  return (
    <DialogTitle
      component="div"
      sx={{ display: 'flex', alignItems: 'flex-start', p: 0, pb: 3 }}
    >
      <Box sx={{ flex: 1, mr: 1 }}>
        <Typography variant="h6">Add files</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Import all your files in this area. After processing, they will be
          available in the Shareflow application.
        </Typography>
      </Box>
      <IconButton
        data-testid="close-upload-documents-modal"
        onClick={close}
        disabled={disabledClose}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </DialogTitle>
  )
}

export default Header
