import { FileError } from 'react-dropzone'
import { v4 as uuidV4 } from 'uuid'

type DropzoneErrorMessageType =
  | 'file-invalid-type'
  | 'file-too-large'
  | 'too-many-files'
  | 'api-error'

export const fileErrorsMessages: Partial<
  Record<DropzoneErrorMessageType, string>
> = {
  'file-invalid-type': 'The type is invalid, PDF only accepted.',
  'api-error': 'An error has occurred. Please try again',
  'file-too-large': 'Maximum 1Mb file.',
}

export const getFileErrorMessage = (
  errors: FileError[],
): string | undefined => {
  const apiError = errors.find(x => x.code === 'api-error')
  if (apiError) {
    return fileErrorsMessages[apiError.code]
      ? fileErrorsMessages[apiError.code]
      : apiError.message
  }

  const firstError = errors[0]

  if (firstError) {
    return fileErrorsMessages[firstError.code]
      ? fileErrorsMessages[firstError.code]
      : firstError.message
  }

  return undefined
}

export function formatAcceptedFiles(files: File[]) {
  return files.map(file => ({ id: uuidV4(), file }))
}
