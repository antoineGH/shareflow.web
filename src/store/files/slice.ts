import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import type { File, FileData } from 'types/files'
import { getStateSliceFromError } from 'store/utils'
import { fetchFiles } from './actions'

type InitialState = {
  status: Status
  countFiles: FileData['countFiles']
  countFolders: FileData['countFolders']
  totalSize: FileData['totalSize']
}

const initialState: InitialState = {
  status: Status.IDLE,
  countFiles: 0,
  countFolders: 0,
  totalSize: '',
}

export const FilesAdapter = createEntityAdapter({
  selectId: (file: File) => file.id,
})

const filesSlice = createSlice({
  name: 'files',
  initialState: FilesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFiles.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.countFiles = action.payload.countFiles
      state.countFolders = action.payload.countFolders
      state.totalSize = action.payload.totalSize
      FilesAdapter.setAll(state, action.payload.files)
    })
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default filesSlice.reducer

export const { selectById, selectAll } = FilesAdapter.getSelectors()
