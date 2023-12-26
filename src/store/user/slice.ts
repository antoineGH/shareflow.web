import { createSlice } from '@reduxjs/toolkit'
import { getStateSliceFromError } from 'store/utils'
import { Status } from 'types/store'
import { User } from 'types/users'
import { fetchUser, updateUser } from './actions'

type InitialState = {
  status: Status
  user: User | null
}

const initialState: InitialState = {
  status: Status.IDLE,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    // ### fetchUser ###
    builder.addCase(fetchUser.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### updateUser ###
    builder.addCase(updateUser.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      state.user = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default userSlice.reducer
