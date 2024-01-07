import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'store/store'
import type { Comment } from 'types/comments'
import { Status } from 'types/store'

import { selectAll, selectById } from './slice'

const commentsStoreState = (state: RootState) => state.comments

const commentsStatesStateSelector = createSelector(
  commentsStoreState,
  state => ({
    isLoadingFetch: state.statusActions.fetch === Status.PENDING,
    hasErrorFetch: state.statusActions.fetch === Status.FAILED,
    isLoadingCreate: state.statusActions.create === Status.PENDING,
    hasErrorCreate: state.statusActions.create === Status.FAILED,
    isLoadingDelete: state.statusActions.delete === Status.PENDING,
    hasErrorDelete: state.statusActions.delete === Status.FAILED,
  }),
)

const selectCommentByIdSelector = (commentId: Comment['id']) =>
  createSelector(commentsStoreState, comments =>
    selectById(comments, commentId),
  )

const selectCommentsSelector = createSelector(commentsStoreState, slice => {
  const comments = selectAll(slice)
  return comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
})

export {
  commentsStatesStateSelector,
  selectCommentsSelector,
  selectCommentByIdSelector,
}
