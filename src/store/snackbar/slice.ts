import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  isOpen: boolean
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

const initialState: InitialState = {
  isOpen: false,
  message: '',
  severity: 'success',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<InitialState>) => {
      state.isOpen = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    closeSnackbar: state => {
      state.isOpen = false
    },
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
