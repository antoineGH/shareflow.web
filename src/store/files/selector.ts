import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'
import { Status } from 'types/store'
import { selectAll, selectById } from './slice'
import { File } from 'types/files'

const filesStoreState = (state: RootState) => state.files

const filesStateSelector = createSelector(filesStoreState, state => ({
  isLoading: state.status === Status.PENDING,
  hasError: state.status === Status.FAILED,
}))

const selectFilesSelector = createSelector(filesStoreState, slice =>
  selectAll(slice),
)

const selectFileByIdSelector = (fileId: File['id']) =>
  createSelector(filesStoreState, files => selectById(files, fileId))

export { filesStateSelector, selectFilesSelector, selectFileByIdSelector }
