const BASE_API = 'http://localhost:8080'

// ### STORAGE ###
const GET_STORAGE = `${BASE_API}/users/{userId}/settings`

// ### AUTH ###
const POST_AUTH = `${BASE_API}/login`

// ### USER ###
const GET_USER = `${BASE_API}/users/{userId}`
const PUT_USER = `${BASE_API}/users/{userId}`
const PATCH_USER = `${BASE_API}/users/{userId}/password`

// ### ACTIVITIES ###
const GET_ACTIVITIES = `${BASE_API}/users/{userId}/files/{fileId}/activities`
const POST_ACTIVITY = `${BASE_API}/users/{userId}/files/{fileId}/activities`

// ### COMMENTS ###
const GET_COMMENTS = `${BASE_API}/users/{userId}/files/{fileId}/comments`
const POST_COMMENT = `${BASE_API}/users/{userId}/files/{fileId}/comments`
const DELETE_COMMENT = `${BASE_API}/users/{userId}/files/{fileId}/comments/{commentId}`

// ### TAGS ###
const GET_TAGS = `${BASE_API}/users/{userId}/files/{fileId}/tags`
const POST_TAG = `${BASE_API}/users/{userId}/files/{fileId}/tags`
const DELETE_TAG = `${BASE_API}/users/{userId}/files/{fileId}/tags/{tagId}`

// ### FILES ###
const GET_FILES = `${BASE_API}/users/{userId}/files`
const POST_FOLDER = `${BASE_API}/users/{userId}/files`
const POST_FILE = `${BASE_API}/users/{userId}/files/upload`
const PUT_FILE = `${BASE_API}/users/{userId}/files/{fileId}`
const PATCH_FILE = `${BASE_API}/users/{userId}/files/{fileId}`
const DELETE_FILE = `${BASE_API}/users/{userId}/files/{fileId}`
const DELETE_FILES = `${BASE_API}/users/{userId}/files`
const PATCH_FILES = `${BASE_API}/users/{userId}/files`

export {
  GET_STORAGE,
  POST_AUTH,
  GET_USER,
  PUT_USER,
  PATCH_USER,
  GET_ACTIVITIES,
  POST_ACTIVITY,
  GET_COMMENTS,
  POST_COMMENT,
  DELETE_COMMENT,
  GET_TAGS,
  POST_TAG,
  DELETE_TAG,
  GET_FILES,
  POST_FILE,
  POST_FOLDER,
  PUT_FILE,
  PATCH_FILE,
  DELETE_FILE,
  DELETE_FILES,
  PATCH_FILES,
}
