import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { Tag } from 'types/tags'
import { fetchTags } from './actions'
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
  },
})

export default tagsSlice.reducer

export const { selectById, selectAll } = TagsAdapter.getSelectors()
