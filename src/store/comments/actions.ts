import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteComment, getComments, postComment } from 'api/comments'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import { Comment } from 'types/comments'

const fetchComments = createAsyncThunk<
  Comment[],
  {
    userId: number
    fileId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'comments/fetchComments',
  async ({ userId, fileId }, { signal, rejectWithValue }) => {
    try {
      const { error, comments } = await getComments(userId, fileId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return comments
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const createComment = createAsyncThunk<
  Comment,
  {
    userId: number
    fileId: number
    newComment: Comment['comment']
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'comments/createComment',
  async ({ userId, fileId, newComment, cb }, { signal, rejectWithValue }) => {
    try {
      console.log('action createComment', userId, fileId, newComment)
      const { error, comment } = await postComment(
        userId,
        fileId,
        newComment,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      cb?.()
      return comment
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeComment = createAsyncThunk<
  Comment['id'],
  { userId: number; fileId: number; commentToDeleteId: number }
>(
  'comments/deleteComment',
  async (
    { userId, fileId, commentToDeleteId },
    { signal, rejectWithValue },
  ) => {
    try {
      const { error, commentId } = await deleteComment(
        userId,
        fileId,
        commentToDeleteId,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return commentId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchComments, createComment, removeComment }
