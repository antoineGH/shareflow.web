import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { getStateSliceFromError } from 'store/utils'
import { Breadcrumb } from 'types/breadcrumbs'
import { Status } from 'types/store'

import { getBreadcrumbs } from './actions'

type InitialState = {
  statusAction: Record<string, Status>
}

const initialState: InitialState = {
  statusAction: {
    fetch: Status.IDLE,
  },
}

export const BreadcrumbsAdapter = createEntityAdapter({
  selectId: (breadcrumb: Breadcrumb) => breadcrumb.id,
})

const breadcrumbSlice = createSlice({
  name: 'breadcrumbs',
  initialState: BreadcrumbsAdapter.getInitialState(initialState),
  reducers: {
    resetBreadcrumbs: () => BreadcrumbsAdapter.getInitialState(initialState),
  },
  extraReducers: builder => {
    // ### fetchBreadcrumbs ###
    builder.addCase(getBreadcrumbs.pending, state => {
      state.statusAction.fetch = Status.PENDING
    })
    builder.addCase(getBreadcrumbs.fulfilled, (state, action) => {
      state.statusAction.fetch = Status.SUCCEEDED
      BreadcrumbsAdapter.setAll(state, action.payload)
    })
    builder.addCase(getBreadcrumbs.rejected, (state, action) => {
      state.statusAction.fetch = getStateSliceFromError(action)
    })
  },
})

export const { resetBreadcrumbs } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer

export const { selectAll } = BreadcrumbsAdapter.getSelectors()
