import { createSelector } from '@reduxjs/toolkit'
import { Status } from 'types/store'
import { selectAll, selectById } from './slice'
import { RootState } from 'store/store'
import { Activity } from 'types/activities'

const activitiesStoreState = (state: RootState) => state.activities

const activitiesStateSelector = createSelector(activitiesStoreState, state => ({
  isLoading: state.status === Status.PENDING,
  hasError: state.status === Status.FAILED,
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
