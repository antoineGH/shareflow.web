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

const selectStorageWarningErrorSelector = createSelector(
  storageStoreState,
  state => {
    const { storageUsed, totalStorage } = state.storage
    return {
      isWarning: (storageUsed / totalStorage) * 100 >= 75,
      isError: (storageUsed / totalStorage) * 100 >= 90,
      isUploadDisabled: storageUsed >= totalStorage,
    }
  },
)

const selectStorageUploadDisableSelector = createSelector(
  storageStoreState,
  state => {
    const { storageUsed, totalStorage } = state.storage
    return storageUsed >= totalStorage
  },
)

export {
  storageStateSelector,
  selectStorageSelector,
  selectStorageWarningErrorSelector,
  selectStorageUploadDisableSelector,
}
