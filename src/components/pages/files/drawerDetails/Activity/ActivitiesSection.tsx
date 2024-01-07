import { Skeleton, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
// eslint-disable-next-line import/no-unresolved
import EmptySearchSVG from 'assets/empty_search.svg?react'

import { Activity as ActivityT } from 'types/activities'

import Activity from './Activity'

type Props = {
  activities: ActivityT[]
  isLoading: boolean
  hasError: boolean
}

function ActivitySection({ activities, isLoading, hasError }: Props) {
  if (isLoading)
    return [...Array(3)].map((_, index) => (
      <Box
        key={index}
        sx={{
          my: 1.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#6c63ff29',
          borderRadius: '10px',
          padding: '0.7rem',
          marginRight: '1rem',
        }}
      >
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="30%" sx={{ alignSelf: 'flex-end' }} />
      </Box>
    ))

  if (hasError)
    return (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={2}
      >
        <EmptySearchSVG style={{ width: '200px', height: '200px' }} />
        <Typography variant="body1" fontSize=".8rem">
          Error loading activities
        </Typography>
      </Stack>
    )

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 250px)',
      }}
    >
      {activities.map(({ id, activity, createdAt }) => (
        <Box key={id}>
          <Activity activity={activity} createdAt={createdAt} />
        </Box>
      ))}
    </Box>
  )
}

export default ActivitySection
