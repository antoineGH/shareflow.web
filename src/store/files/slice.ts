import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import type { File, FileData } from 'types/files'
import { Status } from 'types/store'

import {
  createFile,
  fetchFiles,
  partialUpdateFile,
  removeFile,
  updateFile,
} from './actions'

type InitialState = {
  statusAction: Record<string, Status>
  countFiles?: FileData['countFiles']
  countFolders?: FileData['countFolders']
  totalSize?: FileData['totalSize']
}

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
    create: Status.IDLE,
    update: Status.IDLE,
    patch: Status.IDLE,
    remove: Status.IDLE,
  },
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
      state.statusAction.fetch = Status.PENDING
    })
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.statusAction.fetch = Status.SUCCEEDED
      state.countFiles = action.payload.countFiles
      state.countFolders = action.payload.countFolders
      state.totalSize = action.payload.totalSize
      FilesAdapter.setAll(state, action.payload.files)
    })
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })

    // ### createFile ###
    builder.addCase(createFile.pending, state => {
      state.statusAction.create = Status.PENDING
    })
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.statusAction.create = Status.SUCCEEDED
      state.countFiles = action.payload.countFiles
      state.countFolders = action.payload.countFolders
      state.totalSize = action.payload.totalSize
      FilesAdapter.addOne(state, action.payload.file)
    })
    builder.addCase(createFile.rejected, (state, action) => {
      state.statusAction.create = getStateSliceFromError(action)
    })

    // ### updateFile ###
    builder.addCase(updateFile.pending, state => {
      state.statusAction.update = Status.PENDING
    })
    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.statusAction.update = Status.SUCCEEDED
      FilesAdapter.upsertOne(state, action.payload.file)
    })
    builder.addCase(updateFile.rejected, (state, action) => {
      state.statusAction.update = getStateSliceFromError(action)
    })

    // ### patchFile ###
    builder.addCase(partialUpdateFile.pending, state => {
      state.statusAction.patch = Status.PENDING
    })
    builder.addCase(partialUpdateFile.fulfilled, (state, action) => {
      state.statusAction.patch = Status.SUCCEEDED
      FilesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(partialUpdateFile.rejected, (state, action) => {
      state.statusAction.patch = getStateSliceFromError(action)
    })

    // ### removeFile ###
    builder.addCase(removeFile.pending, state => {
      state.statusAction.remove = Status.PENDING
    })
    builder.addCase(removeFile.fulfilled, (state, action) => {
      state.statusAction.remove = Status.SUCCEEDED
      FilesAdapter.removeOne(state, action.payload)
    })
    builder.addCase(removeFile.rejected, (state, action) => {
      state.statusAction.remove = getStateSliceFromError(action)
    })
  },
})

export default filesSlice.reducer

export const { selectById, selectAll } = FilesAdapter.getSelectors()
