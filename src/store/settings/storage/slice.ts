import { createSlice } from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import { Settings } from 'types/settings'
import { Status } from 'types/store'

import { fetchStorage } from './actions'

type InitialState = {
  statusAction: Record<string, Status>
  storage: Settings['storage'] | Record<string, never>
}

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
  },
  storage: {},
}

const storageSlice = createSlice({
  name: 'settings/storage',
  initialState: initialState,
  reducers: {
    incrementStorageUsed: (state, action) => {
      state.storage.storageUsed += action.payload
    },
  },
  extraReducers: builder => {
    // ### fetchStorage ###
    builder.addCase(fetchStorage.pending, state => {
      state.statusAction.fetch = Status.PENDING
    })
    builder.addCase(fetchStorage.fulfilled, (state, action) => {
      state.statusAction.fetch = Status.SUCCEEDED
      state.storage = action.payload
    })
    builder.addCase(fetchStorage.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })
  },
})

export const { incrementStorageUsed } = storageSlice.actions

export default storageSlice.reducer
