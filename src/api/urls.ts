// TODO: Update base api url
// const BASE_API = 'http://localhost:5000/api/v1'
const BASE_API = 'http://localhost:8080'

// ### STORAGE ###
const GET_STORAGE = `${BASE_API}/users/{userId}/settings`

// ### USER ###
const GET_USER = `${BASE_API}/users/{userId}`
const PUT_USER = `${BASE_API}/users/{userId}`
const PATCH_USER = `${BASE_API}/users/{userId}/password`

// ### ACTIVITIES ###
const GET_ACTIVITIES = `${BASE_API}/users/{userId}/activities.json`
const POST_ACTIVITY = `${BASE_API}/users/{userId}/activities.json`

// ### COMMENTS ###
const GET_COMMENTS = `${BASE_API}/users/{fileId}/comments.json`
const POST_COMMENT = `${BASE_API}/users/{fileId}/comments.json`
const DELETE_COMMENT = `${BASE_API}/users/{fileId}/comments/{commentId}.json`

// ### TAGS ###
const GET_TAGS = `${BASE_API}/users/{fileId}/tags.json`
const POST_TAG = `${BASE_API}/users/{fileId}/tags.json`
const DELETE_TAG = `${BASE_API}/users/{fileId}/tags/{tagId}.json`

// ### FILES ###
const GET_FILES = `${BASE_API}/users/{userId}/files.json`
const POST_FILE = `${BASE_API}/users/{userId}/files.json`
const PUT_FILE = `${BASE_API}/users/{userId}/files/{fileId}.json`
const PATCH_FILE = `${BASE_API}/users/{userId}/files/{fileId}.json`
const DELETE_FILE = `${BASE_API}/users/{userId}/files/{fileId}.json`

export {
  GET_STORAGE,
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
  PUT_FILE,
  PATCH_FILE,
  DELETE_FILE,
}
