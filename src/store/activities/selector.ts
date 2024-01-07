import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'store/store'
import { Activity } from 'types/activities'
import { Status } from 'types/store'

import { selectAll, selectById } from './slice'

const activitiesStoreState = (state: RootState) => state.activities

const activitiesStateSelector = createSelector(activitiesStoreState, state => ({
  isLoadingFetch: state.actionStatus.fetch === Status.PENDING,
  hasErrorFetch: state.actionStatus.fetch === Status.FAILED,
  isLoadingCreate: state.actionStatus.create === Status.PENDING,
  hasErrorCreate: state.actionStatus.create === Status.FAILED,
}))

const selectActivitiesSelector = createSelector(activitiesStoreState, slice => {
  const activities = selectAll(slice)
  return activities.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
})

const selectActivityByIdSelector = (activityId: Activity['id']) =>
  createSelector(activitiesStoreState, activities =>
    selectById(activities, activityId),
  )

export {
  activitiesStateSelector,
  selectActivitiesSelector,
  selectActivityByIdSelector,
}
