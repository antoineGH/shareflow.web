import { createSelector } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { selectAll, selectById } from './slice'
import { RootState } from 'store/store'
import { Activity } from 'types/activities'

const activitiesStoreState = (state: RootState) => state.activities

const activitiesStateSelector = createSelector(activitiesStoreState, state => ({
  isLoadingFetch: state.actionStatus.fetch === Status.PENDING,
  hasErrorFetch: state.actionStatus.fetch === Status.FAILED,
  isLoadingCreate: state.actionStatus.create === Status.PENDING,
  hasErrorCreate: state.actionStatus.create === Status.FAILED,
}))

const selectActivitiesSelector = createSelector(activitiesStoreState, slice =>
  selectAll(slice),
)

const selectActivityByIdSelector = (activityId: Activity['id']) =>
  createSelector(activitiesStoreState, activities =>
    selectById(activities, activityId),
  )

export {
  activitiesStateSelector,
  selectActivitiesSelector,
  selectActivityByIdSelector,
}
