import { Stack, Typography } from '@mui/material'

function Title({ name }) {
  return (
    <Stack>
      <Typography
        variant="body2"
        sx={tm => ({
          fontWeight: tm.typography.fontWeightMedium,
        })}
      >
        {name}
      </Typography>
    </Stack>
  )
}

export default Title
