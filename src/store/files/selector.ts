import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'store/store'
import type { FileT } from 'types/files'
import { Status } from 'types/store'

import { selectAll, selectById } from './slice'

const filesStoreState = (state: RootState) => state.files

const filesDataStateSelector = createSelector(filesStoreState, slice => {
  return {
    countFiles: slice.countFiles,
    countFolders: slice.countFolders,
    totalSize: slice.totalSize,
    files: selectAll(slice),
  }
})

const filesStateSelector = createSelector(filesStoreState, state => ({
  isLoadingFetch: state.statusAction.fetch === Status.PENDING,
  hasErrorFetch: state.statusAction.fetch === Status.FAILED,
  isLoadingCreate: state.statusAction.create === Status.PENDING,
  hasErrorCreate: state.statusAction.create === Status.FAILED,
  isLoadingUpdate: state.statusAction.update === Status.PENDING,
  hasErrorUpdate: state.statusAction.update === Status.FAILED,
  isLoadingPatch: state.statusAction.patch === Status.PENDING,
  hasErrorPatch: state.statusAction.patch === Status.FAILED,
  isLoadingRemove: state.statusAction.remove === Status.PENDING,
  hasErrorRemove: state.statusAction.remove === Status.FAILED,
}))

const selectFilesSelector = createSelector(filesStoreState, slice =>
  selectAll(slice),
)

const selectFileByIdSelector = (fileId: FileT['id']) =>
  createSelector(filesStoreState, files => selectById(files, fileId))

export {
  filesStateSelector,
  filesDataStateSelector,
  selectFilesSelector,
  selectFileByIdSelector,
}
