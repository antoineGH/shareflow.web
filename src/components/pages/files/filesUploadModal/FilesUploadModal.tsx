import { useCallback, useEffect, useState } from 'react'

import Badge from '@mui/material/Badge'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FileRejection } from 'react-dropzone'

import { createFile } from 'store/files/actions'
import { filesStateSelector } from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'

import DropZone from './dropzone/Dropzone'
import { RejectedFiles, ValidFiles } from './filesUploadDragNDrop/Files'
import type { DroppedFiles, FileState } from './filesUploadDragNDrop/types'
import Footer from './Footer'
import Header from './Header'
import { formatAcceptedFiles } from './helpers'

type Props = {
  userId: number
  open: boolean
  close(): void
  droppedFiles: DroppedFiles
}

function DocumentsUploadModal({ userId, open, close, droppedFiles }: Props) {
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
  const dispatch = useDispatch()
  const { isLoadingCreate } = useSelector(filesStateSelector)

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
    dispatch(
      createFile({
        userId,
        newFile: {
          name: file.name,
          isFolder: Boolean(!file),
          file,
        },
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'File uploaded',
            }),
          )
        },
      }),
    )
    return { error: false }
  }
  const onUpload = async () => {
    if (submitting || isLoadingCreate) return

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

    if (areAllUploaded && !isLoadingCreate) {
      return
    }

    setIsUploadDone(true)
  }

  useEffect(() => {
    if (isLoadingCreate) return
    if (isUploadDone) return
    onClose()
  }, [isLoadingCreate, isUploadDone])

  return (
    <Dialog
      open={open}
      onClose={submitting || isLoadingCreate ? undefined : onClose}
      PaperProps={{
        sx: {
          maxWidth: '940px',
          padding: 3,
          position: 'absolute',
          top: '15%',
          width: '100%',
        },
      }}
      disableEscapeKeyDown={submitting || isLoadingCreate}
    >
      <Header close={onClose} disabledClose={submitting || isLoadingCreate} />

      <DialogContent sx={{ px: 0 }}>
        <DropZone
          onDrop={onDrop}
          disabled={isUploadDone || submitting || isLoadingCreate}
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
                    color: 'white',
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
          disabled={submitting || isLoadingCreate}
        />

        <RejectedFiles
          files={rejectedFiles}
          disabled={submitting || isLoadingCreate}
        />
      </DialogContent>

      {files.length > 0 && (
        <Footer
          isUploadDone={isUploadDone}
          close={onClose}
          submitting={submitting || isLoadingCreate}
          onUpload={onUpload}
        />
      )}
    </Dialog>
  )
}

export default DocumentsUploadModal
