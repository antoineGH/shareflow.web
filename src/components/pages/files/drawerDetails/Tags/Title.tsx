import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Tag } from 'types/tags'

type Props = {
  option: Tag
}

function Title({ option }: Props) {
  const { tag } = option

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
        {tag}
      </Typography>
      <Box flexGrow={1} />
    </Stack>
  )
}

export default Title
