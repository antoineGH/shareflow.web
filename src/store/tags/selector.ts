import { RootState } from 'store/store'
import { Status } from 'types/store'
import { TagsAdapter } from './slice'
import { createSelector } from '@reduxjs/toolkit'
import { Tag } from 'types/tags'

const tagsStoreState = (state: RootState) => state.tags

const tagsStateSelector = createSelector(tagsStoreState, state => ({
  isLoadingFetch: state.statusAction.fetch === Status.PENDING,
  hasErrorFetch: state.statusAction.fetch === Status.FAILED,
  isLoadingSearch: state.statusAction.search === Status.PENDING,
  hasErrorSearch: state.statusAction.search === Status.FAILED,
  isLoadingCreate: state.statusAction.create === Status.PENDING,
  hasErrorCreate: state.statusAction.create === Status.FAILED,
  isLoadingDelete: state.statusAction.delete === Status.PENDING,
  hasErrorDelete: state.statusAction.delete === Status.FAILED,
}))

const selectAllTagsSelector = createSelector(tagsStoreState, state =>
  TagsAdapter.getSelectors().selectAll(state.allTags),
)

const selectSearchedTagsSelector = createSelector(tagsStoreState, state =>
  TagsAdapter.getSelectors().selectAll(state.searchedTags),
)

const selectedTagsSelector = createSelector(tagsStoreState, state =>
  TagsAdapter.getSelectors().selectAll(state.selectedTags),
)

const selectTagByIdSelector = (tagId: Tag['id']) =>
  createSelector(tagsStoreState, state =>
    TagsAdapter.getSelectors().selectById(state.allTags, tagId),
  )

export {
  tagsStateSelector,
  selectAllTagsSelector,
  selectSearchedTagsSelector,
  selectedTagsSelector,
  selectTagByIdSelector,
}
