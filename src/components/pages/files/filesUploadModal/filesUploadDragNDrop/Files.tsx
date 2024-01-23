import Stack from '@mui/material/Stack'
import { FileRejection } from 'react-dropzone'

import FileCard from './FileCard'
import type { FileState } from './types'
import { fileErrorsMessages, getFileErrorMessage } from '../helpers'

type ValidFilesProps = {
  files: FileState[]
  uploadState: Record<FileState['id'], 'loading' | 'error' | 'success'>
  disabled: boolean
  onRemoveFile(id: FileState['id']): Promise<undefined>
}

function ValidFiles({
  files,
  uploadState,
  disabled,
  onRemoveFile,
}: ValidFilesProps) {
  return files?.length > 0 ? (
    <>
      {files.map(({ id, file }) => (
        <Stack direction="row" alignItems="center" gap={0.5} key={id}>
          <FileCard
            disabled={disabled}
            id={id}
            filename={file.name}
            onRemove={uploadState[id] ? undefined : () => onRemoveFile(id)}
            status={uploadState[id]}
            error={
              uploadState[id] === 'error'
                ? fileErrorsMessages['api-error']
                : undefined
            }
          />
        </Stack>
      ))}
    </>
  ) : null
}

type RejectedFilesProps = {
  files: FileRejection[]
  disabled: boolean
}

function RejectedFiles({ files, disabled }: RejectedFilesProps) {
  return files?.length > 0 ? (
    <>
      {files.map(({ file, errors }, idx) => {
        const error = getFileErrorMessage(errors)
        return (
          <FileCard
            key={`${file.name}-${idx.toString()}`}
            id={file.name}
            filename={file.name}
            status="error"
            disabled={disabled}
            error={error ? `${error} The file will not be sent.` : undefined}
          />
        )
      })}
    </>
  ) : null
}

export { ValidFiles, RejectedFiles }
