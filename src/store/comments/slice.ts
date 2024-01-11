import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import type { Comment } from 'types/comments'
import { Status } from 'types/store'

import { createComment, fetchComments, removeComment } from './actions'

type InitialState = {
  statusActions: Record<string, Status>
}

const initialState: InitialState = {
  statusActions: {
    fetch: Status.IDLE,
    create: Status.IDLE,
    delete: Status.IDLE,
  },
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
      state.statusActions.fetch = Status.PENDING
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.statusActions.fetch = Status.SUCCEEDED
      CommentsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.statusActions.fetch = getStateSliceFromError(action)
    })

    // ### createComment ###
    builder.addCase(createComment.pending, state => {
      state.statusActions.create = Status.PENDING
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.statusActions.create = Status.SUCCEEDED
      CommentsAdapter.addOne(state, action.payload)
    })
    builder.addCase(createComment.rejected, (state, action) => {
      state.statusActions.create = getStateSliceFromError(action)
    })

    // ### removeComment ###
    builder.addCase(removeComment.pending, state => {
      state.statusActions.delete = Status.PENDING
    })
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.statusActions.delete = Status.SUCCEEDED
      CommentsAdapter.removeOne(state, action.payload)
    })
    builder.addCase(removeComment.rejected, (state, action) => {
      state.statusActions.delete = getStateSliceFromError(action)
    })
  },
})

export default commentsSlice.reducer

export const { selectById, selectAll } = CommentsAdapter.getSelectors()
