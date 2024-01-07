import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import { Status } from 'types/store'
import { Tag } from 'types/tags'

import { createTag, fetchTags, removeTag, searchTags } from './actions'

type InitialState = {
  statusAction: Record<string, Status>
  allTags: ReturnType<typeof TagsAdapter.getInitialState>
  selectedTags: ReturnType<typeof TagsAdapter.getInitialState>
  searchedTags: ReturnType<typeof TagsAdapter.getInitialState>
}

export const TagsAdapter = createEntityAdapter({
  selectId: (tag: Tag) => tag.id,
})

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
    search: Status.IDLE,
    create: Status.IDLE,
    delete: Status.IDLE,
  },
  allTags: TagsAdapter.getInitialState(),
  selectedTags: TagsAdapter.getInitialState(),
  searchedTags: TagsAdapter.getInitialState(),
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    resetTags: () => TagsAdapter.getInitialState(initialState),
    selectTag: (state, action: PayloadAction<Tag>) => {
      TagsAdapter.addOne(state.selectedTags, action.payload)
    },
    unselectTag: (state, action: PayloadAction<Tag>) => {
      TagsAdapter.removeOne(state.selectedTags, action.payload.id)
    },
    resetSelectedTags: state => {
      state.selectedTags = TagsAdapter.getInitialState()
    },
    resetSearchTags: state => {
      state.searchedTags = TagsAdapter.getInitialState()
    },
  },
  extraReducers: builder => {
    // ### fetchTags ###
    builder.addCase(fetchTags.pending, state => {
      state.statusAction.fetch = Status.PENDING
    })
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.statusAction.fetch = Status.SUCCEEDED
      state.allTags = TagsAdapter.setAll(state.allTags, action.payload)
    })
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })

    // ### searchTags ###
    builder.addCase(searchTags.pending, state => {
      state.statusAction.search = Status.PENDING
    })
    builder.addCase(searchTags.fulfilled, (state, action) => {
      state.statusAction.search = Status.SUCCEEDED
      state.searchedTags = TagsAdapter.setAll(
        state.searchedTags,
        action.payload,
      )
    })
    builder.addCase(searchTags.rejected, (state, action) => {
      state.statusAction.search = getStateSliceFromError(action)
    })

    // ### createTag ###
    builder.addCase(createTag.pending, state => {
      state.statusAction.create = Status.PENDING
    })
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.statusAction.create = Status.SUCCEEDED
      state.allTags = TagsAdapter.addOne(state.allTags, action.payload)
    })
    builder.addCase(createTag.rejected, (state, action) => {
      state.statusAction.create = getStateSliceFromError(action)
    })

    // ### removeTag ###
    builder.addCase(removeTag.pending, state => {
      state.statusAction.delete = Status.PENDING
    })
    builder.addCase(removeTag.fulfilled, (state, action) => {
      state.statusAction.delete = Status.SUCCEEDED
      state.allTags = TagsAdapter.removeOne(state.allTags, action.payload)
    })
    builder.addCase(removeTag.rejected, (state, action) => {
      state.statusAction.delete = getStateSliceFromError(action)
    })
  },
})

export default tagsSlice.reducer
export const {
  resetTags,
  selectTag,
  unselectTag,
  resetSelectedTags,
  resetSearchTags,
} = tagsSlice.actions
export const { selectById, selectAll } = TagsAdapter.getSelectors()
