import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import type { Comment } from 'types/comments'
import { createComment, fetchComments, removeComment } from './actions'
import { getStateSliceFromError } from 'store/utils'

type InitialState = {
  status: Status
}

const initialState: InitialState = {
  status: Status.IDLE,
}

export const CommentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id,
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: CommentsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    // ### fetchComments ###
    builder.addCase(fetchComments.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      CommentsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### createComment ###
    builder.addCase(createComment.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      CommentsAdapter.addOne(state, action.payload)
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### removeComment ###
    builder.addCase(removeComment.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      CommentsAdapter.removeOne(state, action.payload)
    })
    builder.addCase(removeComment.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default commentsSlice.reducer

export const { selectById, selectAll } = CommentsAdapter.getSelectors()
