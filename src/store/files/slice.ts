import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import type { FileData, FileT } from 'types/files'
import { Status } from 'types/store'

import {
  createFile,
  createFolder,
  fetchFiles,
  partialRemoveRestoreFile,
  partialRemoveRestoreFiles,
  partialUpdateFile,
  removeFile,
  removeFiles,
  updateFile,
} from './actions'

type InitialState = {
  statusAction: Record<string, Status>
  countFiles: FileData['countFiles']
  countFolders: FileData['countFolders']
  totalSize: FileData['totalSize']
}

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
    create: Status.IDLE,
    update: Status.IDLE,
    patch: Status.IDLE,
    remove: Status.IDLE,
  },
  countFiles: 0,
  countFolders: 0,
  totalSize: 0,
}

export const FilesAdapter = createEntityAdapter({
  selectId: (file: FileT) => file.id,
})

const filesSlice = createSlice({
  name: 'files',
  initialState: FilesAdapter.getInitialState(initialState),
  reducers: {
    resetFileSlice: state => {
      FilesAdapter.getInitialState(initialState)
      state.statusAction = initialState.statusAction
    },
    setLoadingPendingFetchFiles: state => {
      state.statusAction.fetch = Status.PENDING
    },
  },
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
      if (!action.payload.files) return FilesAdapter.removeAll(state)
      FilesAdapter.setAll(state, action.payload.files)
    })
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })

    // ### createFolder ###
    builder.addCase(createFolder.pending, state => {
      state.statusAction.create = Status.PENDING
    })
    builder.addCase(createFolder.fulfilled, (state, action) => {
      state.statusAction.create = Status.SUCCEEDED
      if (state.countFolders) {
        state.countFolders += 1
      } else {
        state.countFolders = 1
      }
      FilesAdapter.addOne(state, action.payload)
    })
    builder.addCase(createFolder.rejected, (state, action) => {
      state.statusAction.create = getStateSliceFromError(action)
    })

    // ### createFile ###
    builder.addCase(createFile.pending, state => {
      state.statusAction.create = Status.PENDING
    })
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.statusAction.create = Status.SUCCEEDED
      if (state.totalSize) {
        state.totalSize += action.payload.size
      } else {
        state.totalSize = action.payload.size
      }
      if (state.countFiles) {
        state.countFiles += 1
      } else {
        state.countFiles = 1
      }

      FilesAdapter.addOne(state, action.payload)
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
      if (action.meta.arg.isFavoritePage) {
        FilesAdapter.removeOne(state, action.payload.id)
        return
      }
      FilesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(partialUpdateFile.rejected, (state, action) => {
      state.statusAction.patch = getStateSliceFromError(action)
    })

    // ### partialRemoveRestoreFile ###
    builder.addCase(partialRemoveRestoreFile.pending, state => {
      state.statusAction.patch = Status.PENDING
    })
    builder.addCase(partialRemoveRestoreFile.fulfilled, (state, action) => {
      state.statusAction.patch = Status.SUCCEEDED
      const updates = action.meta.arg.updates
      const multiplier = updates.isDeleted ? -1 : 1

      if (state.totalSize) {
        state.totalSize += multiplier * state.totalSize
      }
      if (state.countFiles) {
        state.countFiles += multiplier * state.countFiles
      }
      if (state.countFolders) {
        state.countFolders += multiplier * state.countFolders
      }
      FilesAdapter.removeOne(state, action.payload.id)
    })
    builder.addCase(partialRemoveRestoreFile.rejected, (state, action) => {
      state.statusAction.patch = getStateSliceFromError(action)
    })

    // ### partialRemoveRestoreFiles ###
    builder.addCase(partialRemoveRestoreFiles.pending, state => {
      state.statusAction.patch = Status.PENDING
    })
    builder.addCase(partialRemoveRestoreFiles.fulfilled, (state, action) => {
      state.statusAction.patch = Status.SUCCEEDED
      const fileSelectors = FilesAdapter.getSelectors()
      const files = action.payload.map(id =>
        fileSelectors.selectById(state, id),
      )
      const updates = action.meta.arg.updates
      const totalSizeChange = files.reduce((acc, file) => acc + file.size, 0)
      const countFilesChange = files.filter(file => !file.isFolder).length
      const countFoldersChange = files.filter(file => file.isFolder).length
      const multiplier = updates.isDeleted ? -1 : 1

      if (state.totalSize) {
        state.totalSize += multiplier * totalSizeChange
      }
      if (state.countFiles) {
        state.countFiles += multiplier * countFilesChange
      }
      if (state.countFolders) {
        state.countFolders += multiplier * countFoldersChange
      }
      FilesAdapter.removeMany(state, action.payload)
    })
    builder.addCase(partialRemoveRestoreFiles.rejected, (state, action) => {
      state.statusAction.patch = getStateSliceFromError(action)
    })

    // ### permanentlyRemoveFile ###
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

    // ### permanentlyRemoveFiles ###
    builder.addCase(removeFiles.pending, state => {
      state.statusAction.remove = Status.PENDING
    })
    builder.addCase(removeFiles.fulfilled, (state, action) => {
      state.statusAction.remove = Status.SUCCEEDED
      FilesAdapter.removeMany(state, action.payload)
    })
    builder.addCase(removeFiles.rejected, (state, action) => {
      state.statusAction.remove = getStateSliceFromError(action)
    })
  },
})

export default filesSlice.reducer

export const { resetFileSlice, setLoadingPendingFetchFiles } =
  filesSlice.actions

export const { selectById, selectAll } = FilesAdapter.getSelectors()
