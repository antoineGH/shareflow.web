import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTag, getTags, postTag } from 'api/tags'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { Tag } from 'types/tags'

const fetchTags = createAsyncThunk<
  Tag[],
  { userId: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('tags/fetchTags', async ({ userId }, { signal, rejectWithValue }) => {
  try {
    const { error, tags } = await getTags({
      userId,
      fileId: 1,
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
        fileId: 1,
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
    newTag: Omit<Tag, 'id' | 'userId' | 'fileId'>
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/createTag',
  async ({ userId, fileId, newTag }, { signal, rejectWithValue }) => {
    try {
      const { error, tag } = await postTag(userId, fileId, newTag, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return tag
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

const removeTag = createAsyncThunk<
  Tag['id'],
  { userId: number; fileId: number; tagToDeleteId: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/removeTag',
  async ({ userId, fileId, tagToDeleteId }, { signal, rejectWithValue }) => {
    try {
      const { error, tagId } = await deleteTag(
        userId,
        fileId,
        tagToDeleteId,
        signal,
      )

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return tagId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchTags, searchTags, createTag, removeTag }
