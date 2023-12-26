import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const userStoreState = (state: RootState) => state.user

const userStateSelector = createSelector(userStoreState, state => ({
  isLoading: state.status === 'pending',
  hasError: state.status === 'failed',
}))

const selectUserSelector = createSelector(userStoreState, state => state.user)

export { userStateSelector, selectUserSelector }
