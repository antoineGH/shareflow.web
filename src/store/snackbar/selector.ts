import type { RootState } from 'store/store'

export const selectSnackbarSelector = (state: RootState) => state.snackbar
