import { createSlice } from '@reduxjs/toolkit'
import { getStateSliceFromError } from 'store/utils'
import { Status } from 'types/store'
import { User } from 'types/users'
import { fetchUser } from './actions'

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
    builder.addCase(fetchUser.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      console.log(action.payload)
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default userSlice.reducer
