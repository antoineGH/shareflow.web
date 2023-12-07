import type { FileRejection } from 'react-dropzone'

export type FileState = { id: string; file: File }

export type DroppedFiles = {
  accept: File[]
  reject: FileRejection[]
}
