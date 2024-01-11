import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'store/store'

const storageStoreState = (state: RootState) => state.settings.storage

const storageStateSelector = createSelector(storageStoreState, state => ({
  isLoadingFetch: state.statusAction.fetch === 'pending',
  hasErrorFetch: state.statusAction.fetch === 'failed',
}))

const selectStorageSelector = createSelector(
  storageStoreState,
  state => state.storage,
)
export { storageStateSelector, selectStorageSelector }
