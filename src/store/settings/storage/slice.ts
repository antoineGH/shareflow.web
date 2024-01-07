import { createSlice } from '@reduxjs/toolkit'
import { Settings } from 'types/settings'
import { Status } from 'types/store'
import { fetchStorage } from './actions'
import { getStateSliceFromError } from 'store/utils'

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
  reducers: {},
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

export default storageSlice.reducer
