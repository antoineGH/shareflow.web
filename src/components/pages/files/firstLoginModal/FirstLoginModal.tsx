import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import EmptyTagSVG from 'assets/empty_tags.svg?react'

type Props = {
  open: boolean
  handleClose(): void
}

function FirstLoginModal({ open, handleClose }: Props) {
  const onClose = () => handleClose()
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth: '1240px',
          width: '100%',
          padding: 1,
          // position: 'absolute',
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          p: 0,
          m: 0,
        }}
      >
        <IconButton data-testid="close-first-connect-modal" onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: '1rem' }}>
        <Box sx={{ flex: 1, mr: 1, my: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '1.8rem',
              textAlign: 'center',
            }}
          >
            A safe home for all your data
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.secondary.contrastText,
              fontSize: '.85rem',
              textAlign: 'center',
              mt: 2,
            }}
          >
            Access & share your files, calendars, contacts, mail & more from any
            device, on your terms
          </Typography>
          <Box
            sx={{
              flex: 1,
              mr: 1,
              my: 4,
              mb: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EmptyTagSVG
              style={{
                width: '300px',
                height: '300px',
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.secondary.contrastText,
              fontSize: '.85rem',
              textAlign: 'center',
              mt: 2,
            }}
          >
            © 2024 <strong>shareFlow</strong>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default FirstLoginModal
