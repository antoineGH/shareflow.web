import { createSelector } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { RootState } from 'store/store'
import { selectAll, selectById } from './slice'
import { Comment } from 'types/comments'

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

const selectCommentsSelector = createSelector(commentsStoreState, slice =>
  selectAll(slice),
)

const selectCommentByIdSelector = (commentId: Comment['id']) =>
  createSelector(commentsStoreState, comments =>
    selectById(comments, commentId),
  )

export {
  commentsStatesStateSelector,
  selectCommentsSelector,
  selectCommentByIdSelector,
}
