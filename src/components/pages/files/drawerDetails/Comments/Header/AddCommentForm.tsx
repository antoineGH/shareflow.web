import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function AddCommentForm() {
  return (
    <Stack gap={1} sx={{ width: '100%' }}>
      <TextField
        id="standard-multiline-static"
        label="Comment"
        multiline
        rows={3}
        placeholder="Add a comment..."
        variant="filled"
      />
      <Box>
        <Button
          size="small"
          variant="contained"
          sx={{ color: 'white', textTransform: 'capitalize' }}
        >
          Add Comment
        </Button>
      </Box>
    </Stack>
  )
}

export default AddCommentForm
