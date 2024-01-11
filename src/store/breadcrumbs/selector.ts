import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'store/store'
import { Status } from 'types/store'

import { selectAll } from './slice'

const breadcrumbsStoreState = (state: RootState) => state.breadcrumbs

const breadcrumbsStateSelector = createSelector(
  breadcrumbsStoreState,
  state => ({
    isLoadingFetch: state.statusAction.fetch === Status.PENDING,
    hasErrorFetch: state.statusAction.fetch === Status.FAILED,
  }),
)

const selectbreadcrumbsSelector = createSelector(breadcrumbsStoreState, slice =>
  selectAll(slice),
)

export { breadcrumbsStateSelector, selectbreadcrumbsSelector }
