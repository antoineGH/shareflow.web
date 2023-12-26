import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteComment, getComments } from 'api/comments'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import { Comment } from 'types/comments'

const fetchComments = createAsyncThunk<
  Comment[],
  {
    fileId: number
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('comments/fetchComments', async ({ fileId }, { signal, rejectWithValue }) => {
  try {
    const { error, comments } = await getComments(fileId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return comments
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

const createComment = createAsyncThunk<
  Comment,
  { fileId: number; newComment: Omit<Comment, 'id'> },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'comments/createComment',
  async ({ fileId, newComment }, { signal, rejectWithValue }) => {
    try {
      const { error, comment } = await createComment(fileId, newComment, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return comment
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeComment = createAsyncThunk<
  Comment['id'],
  { fileId: number; commentToDeleteId: number }
>(
  'comments/deleteComment',
  async ({ fileId, commentToDeleteId }, { signal, rejectWithValue }) => {
    try {
      const { error, commentId } = await deleteComment(
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
