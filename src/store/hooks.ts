import {
  TypedUseSelectorHook,
  useDispatch as useDispatch_,
  useSelector as useSelector_,
} from 'react-redux'

import type { AppDispatch, RootState } from './store'

export const useDispatch = () => useDispatch_<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useSelector_
