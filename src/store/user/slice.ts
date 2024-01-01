import { createSlice } from '@reduxjs/toolkit'
import { getStateSliceFromError } from 'store/utils'
import { Status } from 'types/store'
import { User } from 'types/users'
import { fetchUser, patchUserPassword, updateUser } from './actions'

type InitialState = {
  statusAction: Record<string, Status>
  user: User | null
}

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
    update: Status.IDLE,
    patch: Status.IDLE,
  },
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    // ### fetchUser ###
    builder.addCase(fetchUser.pending, state => {
      state.statusAction.fetch = Status.PENDING
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.statusAction.fetch = Status.SUCCEEDED
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })

    // ### updateUser ###
    builder.addCase(updateUser.pending, state => {
      state.statusAction.update = Status.PENDING
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.statusAction.update = Status.SUCCEEDED
      if (state.user) {
        state.user.fullName = action.meta.arg.newUser.fullName
        state.user.email = action.meta.arg.newUser.email
      }
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.statusAction.update = getStateSliceFromError(action)
    })

    // ### patchUserPassword ###
    builder.addCase(patchUserPassword.pending, state => {
      state.statusAction.patch = Status.PENDING
    })
    builder.addCase(patchUserPassword.fulfilled, state => {
      state.statusAction.patch = Status.SUCCEEDED
    })
    builder.addCase(patchUserPassword.rejected, (state, action) => {
      state.statusAction.patch = getStateSliceFromError(action)
    })
  },
})

export default userSlice.reducer
