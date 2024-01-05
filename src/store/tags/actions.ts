import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTag, getTags, postTag } from 'api/tags'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { Tag } from 'types/tags'

const fetchTags = createAsyncThunk<
  Tag[],
  { userId: number; fileId?: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('tags/fetchTags', async ({ userId, fileId }, { signal, rejectWithValue }) => {
  try {
    const { error, tags } = await getTags({
      userId,
      fileId,
      signal,
    })

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return tags
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

const searchTags = createAsyncThunk<
  Tag[],
  { userId: number; search?: string },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/searchTags',
  async ({ userId, search }, { signal, rejectWithValue }) => {
    try {
      const { error, tags } = await getTags({
        userId,
        search,
        signal,
      })

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return tags
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const createTag = createAsyncThunk<
  Tag,
  {
    userId: number
    fileId: number
    newTag: string
    cb?: () => void
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/createTag',
  async ({ userId, fileId, newTag, cb }, { signal, rejectWithValue }) => {
    try {
      const { error, tag } = await postTag(userId, fileId, newTag, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      cb?.()
      return tag
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeTag = createAsyncThunk<
  Tag['id'],
  { userId: number; fileId: number; tagToDeleteId: number; cb?: () => void },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/removeTag',
  async (
    { userId, fileId, tagToDeleteId, cb },
    { signal, rejectWithValue },
  ) => {
    try {
      const { error, tagId } = await deleteTag(
        userId,
        fileId,
        tagToDeleteId,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      cb?.()
      return tagId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchTags, searchTags, createTag, removeTag }
