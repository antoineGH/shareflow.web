import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import type { File, FileData } from 'types/files'
import { getStateSliceFromError } from 'store/utils'
import { createFile, fetchFiles, removeFile, updateFile } from './actions'

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
    // ### fetchFiles ###
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

    // ### createFile ###
    builder.addCase(createFile.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.countFiles = action.payload.countFiles
      state.countFolders = action.payload.countFolders
      state.totalSize = action.payload.totalSize
      FilesAdapter.addOne(state, action.payload.file)
    })
    builder.addCase(createFile.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### updateFile ###
    builder.addCase(updateFile.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.countFiles = action.payload.countFiles
      state.countFolders = action.payload.countFolders
      state.totalSize = action.payload.totalSize
      FilesAdapter.upsertOne(state, action.payload.file)
    })
    builder.addCase(updateFile.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### removeFile ###
    builder.addCase(removeFile.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(removeFile.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      FilesAdapter.removeOne(state, action.payload)
    })
    builder.addCase(removeFile.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default filesSlice.reducer

export const { selectById, selectAll } = FilesAdapter.getSelectors()
