import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { Tag } from 'types/tags'
import { createTag, fetchTags, removeTag } from './actions'
import { getStateSliceFromError } from 'store/utils'

type InitialState = {
  status: Status
}

const initialState: InitialState = {
  status: Status.IDLE,
}

export const TagsAdapter = createEntityAdapter({
  selectId: (tag: Tag) => tag.id,
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState: TagsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    // ### fetchTags ###
    builder.addCase(fetchTags.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      TagsAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### createTag ###
    builder.addCase(createTag.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(createTag.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      TagsAdapter.addOne(state, action.payload)
    })
    builder.addCase(createTag.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })

    // ### removeTag ###
    builder.addCase(removeTag.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(removeTag.fulfilled, (state, action) => {
      state.status = Status.SUCCEEDED
      TagsAdapter.removeOne(state, action.payload)
    })
    builder.addCase(removeTag.rejected, (state, action) => {
      state.status = getStateSliceFromError(action)
    })
  },
})

export default tagsSlice.reducer

export const { selectById, selectAll } = TagsAdapter.getSelectors()
