import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchBreadcrumbs } from 'api/breadcrumbs'
import { HttpResponseError } from 'helpers/errors'
import type { RootState } from 'store/store'
import { catchAsyncThunk } from 'store/utils'
import type { Breadcrumb } from 'types/breadcrumbs'

const getBreadcrumbs = createAsyncThunk<
  Breadcrumb[],
  {
    userId: number
    folderIds: Breadcrumb['id'][]
  },
  { state: RootState; rejectValue: { errorMessage: string; code?: number } }
>(
  'breadcrumbs/getBreadcrumbs',
  async ({ userId, folderIds }, { signal, rejectWithValue, dispatch }) => {
    try {
      const { error, breadcrumbs } = await fetchBreadcrumbs(
        userId,
        folderIds,
        signal,
      )

      if (error) throw new HttpResponseError(null, error.message)

      return breadcrumbs
    } catch (error) {
      return catchAsyncThunk(error, rejectWithValue, dispatch, true)
    }
  },
)

export { getBreadcrumbs }
