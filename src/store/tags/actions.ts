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
>(
  'tags/fetchTags',
  async ({ userId, fileId }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, tags } = await getTags({
        userId,
        fileId,
        signal,
      })

      if (error) throw new HttpResponseError(null, error.message)

      return tags
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

const searchTags = createAsyncThunk<
  Tag[],
  { userId: number; search?: string },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/searchTags',
  async ({ userId, search }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, tags } = await getTags({
        userId,
        search,
        signal,
      })

      if (error) throw new HttpResponseError(null, error.message)

      return tags
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
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
  async (
    { userId, fileId, newTag, cb },
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, tag } = await postTag(userId, fileId, newTag, signal)

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return tag
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
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
    { signal, rejectWithValue, dispatch },
  ) => {
    try {
      const { error, tagId } = await deleteTag(
        userId,
        fileId,
        tagToDeleteId,
        signal,
      )

      if (error) throw new HttpResponseError(null, error.message)

      cb?.()
      return tagId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

export { fetchTags, searchTags, createTag, removeTag }
