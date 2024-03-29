import LoadingButton from '@mui/lab/LoadingButton'
import { Button, DialogActions } from '@mui/material'

type Props = {
  isUploadDone: boolean
  submitting: boolean
  isUploadDisabled: boolean
  close(): void
  onUpload(): Promise<void>
}

function Footer({
  isUploadDone,
  submitting,
  isUploadDisabled,
  close,
  onUpload,
}: Props) {
  return (
    <DialogActions sx={{ px: 0 }}>
      {isUploadDone ? (
        <Button
          data-testid="done-upload-button"
          variant="contained"
          onClick={close}
        >
          Done
        </Button>
      ) : (
        <>
          <Button
            data-testid="cancel-upload-button"
            disabled={submitting}
            onClick={close}
            sx={{ textTransform: 'capitalize' }}
          >
            Cancel
          </Button>
          <LoadingButton
            data-testid="add-upload-button"
            variant="contained"
            onClick={onUpload}
            loading={submitting}
            disabled={isUploadDisabled}
            sx={{ color: 'white', textTransform: 'capitalize' }}
          >
            Add
          </LoadingButton>
        </>
      )}
    </DialogActions>
  )
}

export default Footer
