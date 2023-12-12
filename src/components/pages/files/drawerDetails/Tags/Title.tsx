import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { TagData } from './types'

type Props = {
  option: TagData
}

function Title({ option }: Props) {
  const { name } = option

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Typography
        variant="body2"
        sx={tm => ({
          fontWeight: tm.typography.fontWeightMedium,
        })}
      >
        {name}
      </Typography>
      <Box flexGrow={1} />
    </Stack>
  )
}

export default Title
