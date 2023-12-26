import { createSlice } from '@reduxjs/toolkit'
import { Settings } from 'types/settings'
import { Status } from 'types/store'
import { fetchStorage } from './actions'
import { getStateSliceFromError } from 'store/utils'

type InitialState = {
  status: Status
  storage: Settings['storage']
}

const initialState: InitialState = {
  status: Status.IDLE,
  storage: {
    storageUsed: 0,
    totalStorage: 0,
  },
}

const storageSlice = createSlice({
  name: 'settings/storage',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchStorage.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchStorage.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.storage = action.payload
    })
    builder.addCase(fetchStorage.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default storageSlice.reducer
