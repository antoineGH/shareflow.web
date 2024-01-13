import { ReactNode } from 'react'

import { Dialog, DialogContent } from '@mui/material'

type Props = {
  open: boolean
  close: () => void
  children: ReactNode
}

function PreviewModal({ open, close, children }: Props) {
  if (!children) return null

  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        sx: {
          maxWidth: '1240px',
          position: 'absolute',
          width: '100%',
          top: '5%',
          p: 0,
          borderRadius: '3px',
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default PreviewModal
