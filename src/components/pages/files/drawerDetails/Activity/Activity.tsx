import { Stack, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { formatDate, getActivityIcon } from './utils'

type Props = {
  activity: string
  createdAt: string
}

function Activity({ activity, createdAt }: Props) {
  const theme = useTheme()
  return (
    <Stack
      sx={{
        my: 1.5,
        backgroundColor: '#6c63ff29',
        borderRadius: '10px',
        padding: '0.5rem',
        marginRight: '1rem',
        '&:last-child': {
          paddingBottom: '.4rem',
        },
        flexDirection: 'row',
      }}
      gap={1.5}
    >
      <Box display="flex" alignItems="center" ml={0.5}>
        {getActivityIcon(activity, theme)}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="body2">{activity}</Typography>
        <Typography variant="body2" color="text.secondary" fontSize="0.7rem">
          {formatDate(createdAt)}
        </Typography>
      </Box>
    </Stack>
  )
}

export default Activity
