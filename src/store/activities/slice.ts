import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import type { Activity } from 'types/activities'
import { createActivity, fetchActivities } from './actions'
import { getStateSliceFromError } from 'store/utils'

type InitialState = {
  actionStatus: Record<string, Status>
}

const initialState: InitialState = {
  actionStatus: {
    fetch: Status.IDLE,
    create: Status.IDLE,
  },
}

export const ActivitiesAdapter = createEntityAdapter({
  selectId: (activity: Activity) => activity.id,
})

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: ActivitiesAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    // ### fetchActivities ###
    builder.addCase(fetchActivities.pending, state => {
      state.actionStatus.fetch = Status.PENDING
    })
    builder.addCase(fetchActivities.fulfilled, (state, action) => {
      state.actionStatus.fetch = Status.SUCCEEDED
      ActivitiesAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchActivities.rejected, (state, action) => {
      state.actionStatus.fetch = getStateSliceFromError(action)
    })

    // ### createActivity ###
    builder.addCase(createActivity.pending, state => {
      state.actionStatus.create = Status.PENDING
    })
    builder.addCase(createActivity.fulfilled, (state, action) => {
      state.actionStatus.create = Status.SUCCEEDED
      ActivitiesAdapter.addOne(state, action.payload)
    })
    builder.addCase(createActivity.rejected, (state, action) => {
      state.actionStatus.create = getStateSliceFromError(action)
    })
  },
})

export default activitiesSlice.reducer

export const { selectById, selectAll } = ActivitiesAdapter.getSelectors()
