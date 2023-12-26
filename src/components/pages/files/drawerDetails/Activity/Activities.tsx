import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ActivitySection from './ActivitiesSection'
import type { Activity } from 'types/activities'

function Activities() {
  const activities: Activity[] = [
    {
      id: 1,
      userId: 101,
      fileId: 201,
      activity: 'ActivityType1',
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 2,
      userId: 102,
      fileId: 202,
      activity: 'ActivityType2',
      createdAt: '2022-01-02T00:00:00Z',
      updatedAt: '2022-01-02T00:00:00Z',
    },
    {
      id: 3,
      userId: 103,
      fileId: 203,
      activity: 'ActivityType3',
      createdAt: '2022-01-03T00:00:00Z',
      updatedAt: '2022-01-03T00:00:00Z',
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
