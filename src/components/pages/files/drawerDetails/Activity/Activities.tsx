import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ActivitySection from './ActivitiesSection'
import type { Activity } from './types'

function Activities() {
  const activities: Activity[] = [
    {
      id: '1',
      activity: 'This is an activity',
      createdAt: 'One minute ago',
    },
    {
      id: '2',
      activity: 'This is an activity 2',
      createdAt: 'Yesterday',
    },
    {
      id: '3',
      activity: 'This is an activity 3',
      createdAt: 'Yesterday',
    },
  ]

  return (
    <Stack gap={1}>
      <Box
        sx={{
          width: '100%',
          p: 2,
          pt: 0.5,
          pr: 0,
        }}
      >
        <ActivitySection activities={activities} />
      </Box>
    </Stack>
  )
}

export default Activities
