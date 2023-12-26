import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export const { dispatch, getState } = store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export default store
