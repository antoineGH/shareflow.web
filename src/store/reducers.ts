import { combineReducers } from 'redux'

import activities from './activities/slice'
import comments from './comments/slice'
import files from './files/slice'
import storage from './settings/storage/slice'
import snackbar from './snackbar/slice'
import tags from './tags/slice'
import user from './user/slice'

const settings = combineReducers({
  storage,
})

const rootReducer = combineReducers({
  snackbar,
  activities,
  comments,
  tags,
  user,
  settings,
  files,
})

function reducer(state = {}, action) {
  return rootReducer(state, action)
}

export default reducer
