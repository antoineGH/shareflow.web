import { useEffect } from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { useDispatch, useSelector } from 'store/hooks'
import { selectSnackbarSelector } from 'store/snackbar/selector'
import { closeSnackbar } from 'store/snackbar/slice'

function SnackBarComponent() {
  const dispatch = useDispatch()
  const { isOpen, message, severity } = useSelector(selectSnackbarSelector)

  const handleClose = () => {
    dispatch(closeSnackbar())
  }

  useEffect(() => {
    if (!isOpen) return
    setTimeout(() => {
      handleClose()
    }, 6000)
  }, [isOpen])

  return (
    <Snackbar
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',

          backgroundColor: theme => {
            switch (severity) {
              case 'error':
                return theme.palette.error.main
              case 'warning':
                return theme.palette.warning.main
              case 'info':
                return theme.palette.info.main
              case 'success':
                return theme.palette.success.main
              default:
                return theme.palette.info.main
            }
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarComponent
