import { RootState } from 'store/store'
import { Status } from 'types/store'
import { selectAll, selectById } from './slice'
import { createSelector } from '@reduxjs/toolkit'
import { Tag } from 'types/tags'

const tagsStoreState = (state: RootState) => state.tags

const tagsStateSelector = createSelector(tagsStoreState, state => ({
  isLoading: state.status === Status.PENDING,
  hasError: state.status === Status.FAILED,
}))

const selectTagsSelector = createSelector(tagsStoreState, slice =>
  selectAll(slice),
)

const selectTagByIdSelector = (tagId: Tag['id']) =>
  createSelector(tagsStoreState, tags => selectById(tags, tagId))

export { tagsStateSelector, selectTagsSelector, selectTagByIdSelector }
