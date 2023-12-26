import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const storageStoreState = (state: RootState) => state.settings.storage

const storageStateSelector = createSelector(storageStoreState, state => ({
  isLoading: state.status === 'pending',
  hasError: state.status === 'failed',
}))

const selectStorageSelector = createSelector(
  storageStoreState,
  state => state.storage,
)
export { storageStateSelector, selectStorageSelector }
