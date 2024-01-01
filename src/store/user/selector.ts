import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const userStoreState = (state: RootState) => state.user

const userStateSelector = createSelector(userStoreState, state => ({
  isLoadingFetch: state.statusAction.fetch === 'pending',
  hasErrorFetch: state.statusAction.fetch === 'failed',
  isLoadingUpdate: state.statusAction.update === 'pending',
  hasErrorUpdate: state.statusAction.update === 'failed',
  isLoadingPatch: state.statusAction.patch === 'pending',
  hasErrorPatch: state.statusAction.patch === 'failed',
}))

const selectUserSelector = createSelector(userStoreState, state => state.user)

export { userStateSelector, selectUserSelector }
