import { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { HttpResponseError, getErrorStatusMessage } from 'helpers/errors'

import { Status } from 'types/store'

export function catchAsyncThunk(
  error: Error,
  rejectWithValue,
  keepInitialErrorMessage = false,
  preventSnackbarDisplay = false,
) {
  const defaultMessage = 'An error has occurred. Please try again'
  let errorMessage = error?.message || defaultMessage
  let errorCode
  if (!keepInitialErrorMessage && error instanceof HttpResponseError) {
    errorMessage = defaultMessage
    if (error.code) {
      errorCode = error?.code
      const errorMsgByCode = getErrorStatusMessage(error.code)
      errorMessage = errorMsgByCode ? errorMsgByCode : errorMessage
    }
  }
  return rejectWithValue({
    errorMessage,
    code: errorCode,
    preventSnackbarDisplay,
  })
}

export function getStateSliceFromError(
  action: PayloadAction<unknown, string, unknown, SerializedError>,
): Status {
  return action?.error?.name === 'AbortError' ? Status.IDLE : Status.FAILED
}
