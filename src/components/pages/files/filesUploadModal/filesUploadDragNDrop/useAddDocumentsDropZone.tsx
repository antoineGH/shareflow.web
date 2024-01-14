import { useCallback, useState } from 'react'

import { DropzoneState, FileRejection, useDropzone } from 'react-dropzone'

type DroppedFiles = {
  accept: File[]
  reject: FileRejection[]
}

type HookReturnValue = {
  isModalAddDocumentsOpen: boolean
  closeModalAddDocs(): void
  openModalAddDocs(): void
  droppedFiles: DroppedFiles
  getInputProps: DropzoneState['getInputProps']
  getRootProps: DropzoneState['getRootProps']
  isDragActive: DropzoneState['isDragActive']
}

function useAddDocumentsDropZone({
  disabled = false,
}: {
  disabled?: boolean
}): HookReturnValue {
  const [isModalAddDocumentsOpen, setIsModalAddDocumentsOpen] = useState(false)
  const [droppedFiles, setDroppedFiles] = useState<DroppedFiles>({
    accept: [],
    reject: [],
  })

  const openModalAddDocs = () => setIsModalAddDocumentsOpen(true)

  const closeModalAddDocs = () => {
    setIsModalAddDocumentsOpen(false)
    const { accept, reject } = droppedFiles
    if (accept.length || reject.length)
      setDroppedFiles({ accept: [], reject: [] })
  }

  const onDropFiles = useCallback(
    (acceptedFiles: File[], failedFiles: FileRejection[]) => {
      setDroppedFiles({ accept: acceptedFiles, reject: failedFiles })
      openModalAddDocs()
    },
    [],
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: 104_857_600, // 12Mb
    multiple: true,
    onDrop: onDropFiles,
    noClick: true,
    noDragEventsBubbling: true,
    noKeyboard: true,
    disabled: isModalAddDocumentsOpen || disabled,
  })

  return {
    isModalAddDocumentsOpen,
    closeModalAddDocs,
    openModalAddDocs,
    droppedFiles,
    getInputProps,
    getRootProps,
    isDragActive,
  }
}

export default useAddDocumentsDropZone
