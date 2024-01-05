import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'store/hooks'
import { selectSnackbarSelector } from 'store/snackbar/selector'
import { closeSnackbar } from 'store/snackbar/slice'
import { useEffect } from 'react'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBarComponent
