import Box from '@mui/material/Box'
import Activity from './Activity'
import type { Activity as ActivityT } from './types'

type Props = {
  activities: ActivityT[]
}

function ActivitySection({ activities }: Props) {
  return (
    <>
      {activities.map(({ id, activity, createdAt }) => (
        <Box key={id}>
          <Activity activity={activity} createdAt={createdAt} />
        </Box>
      ))}
    </>
  )
}

export default ActivitySection
