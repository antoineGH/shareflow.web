import { createSelector } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { RootState } from 'store/store'
import { selectAll, selectById } from './slice'
import { Comment } from 'types/comments'

const commentsStoreState = (state: RootState) => state.comments

const commentsStatesStateSelector = createSelector(
  commentsStoreState,
  state => ({
    isLoading: state.status === Status.PENDING,
    hasError: state.status === Status.FAILED,
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
