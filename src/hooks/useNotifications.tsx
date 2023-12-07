import { useState, useCallback } from 'react'
import { SnackbarOrigin } from '@mui/material/Snackbar'

type Notification = {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
} & SnackbarOrigin

type NotifyAbout = {
  success: (message: string) => void
  error: (message: string) => void
  closeNotification: () => void
}

export function useNotifications(): [Notification, NotifyAbout] {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: '',
    severity: 'success',
    vertical: 'top',
    horizontal: 'center',
  })

  const notifyAbout: NotifyAbout = {
    success: useCallback((message: string) => {
      setNotification({
        open: true,
        message,
        severity: 'success',
        vertical: 'top',
        horizontal: 'right',
      })
    }, []),
    error: useCallback((message: string) => {
      setNotification({
        open: true,
        message,
        severity: 'error',
        vertical: 'top',
        horizontal: 'right',
      })
    }, []),
    closeNotification: useCallback(() => {
      setNotification(prev => ({ ...prev, open: false }))
    }, []),
  }

  return [notification, notifyAbout]
}
