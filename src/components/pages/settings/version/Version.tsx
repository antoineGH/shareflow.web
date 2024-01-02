import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Version() {
  return (
    <Box p={2} pt={0}>
      <Box>
        <Typography variant="h6">Version</Typography>
      </Box>
      <Stack direction="column" mt={1}>
        <Typography variant="body1">shareFlow demo project </Typography>
        <Typography variant="body1">
          Contact on{' '}
          <Link
            href="https://www.linkedin.com/in/antoinert/"
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </Link>
          ,{' '}
          <Link
            href="https://github.com/antoineGH"
            target="_blank"
            rel="noopener"
          >
            Github
          </Link>
          .
        </Typography>
      </Stack>
    </Box>
  )
}

export default Version
