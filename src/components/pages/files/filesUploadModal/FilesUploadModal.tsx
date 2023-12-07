import { useState, useCallback } from 'react'
import { FileRejection } from 'react-dropzone'
import Badge from '@mui/material/Badge'
import Dialog from '@mui/material/Dialog'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { formatAcceptedFiles } from './helpers'
import DropZone from './dropzone/Dropzone'
import Header from './Header'
import Footer from './Footer'
import { RejectedFiles, ValidFiles } from './filesUploadDragNDrop/Files'
import type { DroppedFiles, FileState } from './filesUploadDragNDrop/types'
import { useNotifications } from 'hooks/useNotifications'

type Props = {
  open: boolean
  close(): void
  droppedFiles: DroppedFiles
}

function DocumentsUploadModal({ open, close, droppedFiles }: Props) {
  const [files, setFiles] = useState<FileState[]>(() =>
    formatAcceptedFiles(droppedFiles.accept || []),
  )

  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>(
    () => droppedFiles.reject || [],
  )
  const [uploadState, setUploadState] = useState<
    Record<FileState['id'], 'loading' | 'error' | 'success'>
  >({})
  const [isUploadDone, setIsUploadDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [notification, notifyAbout] = useNotifications()

  const onCloseDocumentsUploaded = () => {
    close()
  }

  const resetFiles = () => {
    setFiles([])
    setRejectedFiles([])
    setUploadState({})
    setIsUploadDone(false)
  }

  const onClose = () => {
    if (isUploadDone) onCloseDocumentsUploaded()
    else {
      resetFiles()
      close()
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], failedFiles: FileRejection[]) => {
      const formatNewFiles = formatAcceptedFiles(acceptedFiles)

      setFiles(prev => [...prev, ...formatNewFiles])
      setRejectedFiles(failedFiles)
    },
    [],
  )

  const onRemoveFile = async (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))

    return undefined
  }

  const uploadDocument = async (file: File) => {
    console.log(file)
    return { error: false }
  }
  const onUpload = async () => {
    if (submitting) return

    setSubmitting(true)

    const outcomes = await Promise.allSettled(
      files.map(async ({ id, file }) => {
        setUploadState(prev => ({ ...prev, [id]: 'loading' }))
        const res = await uploadDocument(file)
        setUploadState(prev => ({
          ...prev,
          [id]: res?.error ? 'error' : 'success',
        }))
        return res
      }),
    )
    setSubmitting(false)

    const areAllUploaded = outcomes.every(o => o.status === 'fulfilled')

    if (areAllUploaded) {
      notifyAbout.success('Files uploaded successfully')
      resetFiles()
      return
    }

    setIsUploadDone(true)
  }

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      PaperProps={{ sx: { maxWidth: '740px', padding: 3 } }}
      disableEscapeKeyDown={submitting}
    >
      <Header close={onClose} disabledClose={submitting} />

      <DialogContent sx={{ px: 0 }}>
        <DropZone
          onDrop={onDrop}
          disabled={isUploadDone || submitting}
          accept={{}}
          maxSize={104857600}
          multiple
          subtitle="Maximum file size is 12Mb"
        />

        {(files.length > 0 || rejectedFiles.length > 0) && (
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Documents
            </Typography>
            {files.length > 0 && (
              <Badge
                badgeContent={files.length.toString()}
                color="primary"
                sx={{
                  '.MuiBadge-badge': {
                    position: 'initial',
                    transform: 'none',
                  },
                }}
              />
            )}
          </Stack>
        )}

        <ValidFiles
          files={files}
          uploadState={uploadState}
          onRemoveFile={onRemoveFile}
          disabled={submitting}
        />

        <RejectedFiles files={rejectedFiles} disabled={submitting} />
      </DialogContent>

      {files.length > 0 && (
        <Footer
          isUploadDone={isUploadDone}
          close={onClose}
          submitting={submitting}
          onUpload={onUpload}
        />
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={1700}
        message={notification.message}
        onClose={notifyAbout.closeNotification}
        anchorOrigin={{
          vertical: notification.vertical,
          horizontal: notification.horizontal,
        }}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Dialog>
  )
}

export default DocumentsUploadModal
