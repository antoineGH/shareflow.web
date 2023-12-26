import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTag, getTags, postTag } from 'api/tags'
import { HttpResponseError } from 'helpers/errors'
import { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { Tag } from 'types/tags'

const fetchTags = createAsyncThunk<
  Tag[],
  { fileId: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('tags/fetchTags', async ({ fileId }, { signal, rejectWithValue }) => {
  try {
    const { error, tags } = await getTags(fileId, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return tags
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

const createTag = createAsyncThunk<
  Tag,
  { fileId: number; newTag: Omit<Tag, 'id'> },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>('tags/createTag', async ({ fileId, newTag }, { signal, rejectWithValue }) => {
  try {
    const { error, tag } = await postTag(fileId, newTag, signal)

    if (error) throw new HttpResponseError(error.code || null, error.message)

    return tag
  } catch (error) {
    return catchAsyncThunk(error, rejectWithValue)
  }
})

const removeTag = createAsyncThunk<
  Tag['id'],
  { fileId: number; tagToDeleteId: number },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'tags/removeTag',
  async ({ fileId, tagToDeleteId }, { signal, rejectWithValue }) => {
    try {
      const { error, tagId } = await deleteTag(fileId, tagToDeleteId, signal)

      if (error) throw new HttpResponseError(error.code || null, error.message)

      return tagId
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue)
    }
  },
)

export { fetchTags, createTag, removeTag }
