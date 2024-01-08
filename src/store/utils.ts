import { Dispatch, PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { getErrorStatusMessage, HttpResponseError } from 'helpers/errors'
import { Status } from 'types/store'

import { openSnackbar } from './snackbar/slice'

export function catchAsyncThunk(
  error: Error,
  rejectWithValue,
  dispatch?: Dispatch,
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
  } else if (error instanceof SyntaxError) {
    errorMessage = error.message
  }

  if (!preventSnackbarDisplay && dispatch) {
    dispatch(
      openSnackbar({
        isOpen: true,
        message: errorMessage,
        severity: 'error',
      }),
    )
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
