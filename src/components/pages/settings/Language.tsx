import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function Language() {
  return (
    <Box p={2} pt={0} sx={{ height: '100px' }}>
      <Box>
        <Typography variant="h6">Language</Typography>
      </Box>
      <Stack gap={1} direction="row" mt={1}>
        <Typography variant="body1">
          Language selector is disabled for this instance.
        </Typography>
      </Stack>
    </Box>
  )
}

export default Language
