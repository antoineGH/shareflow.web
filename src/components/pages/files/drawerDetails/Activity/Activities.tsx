import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector } from 'store/user/selector'
import {
  activitiesStateSelector,
  selectActivitiesSelector,
} from 'store/activities/selector'
import { fetchActivities } from 'store/activities/actions'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ActivitySection from './ActivitiesSection'
import type { Activity } from 'types/activities'

type Props = {
  fileId: number
}

function Activities({ fileId }: Props) {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const activities: Activity[] = useSelector(selectActivitiesSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(activitiesStateSelector)

  console.log('isLoadingFetch', isLoadingFetch)
  console.log('hasErrorFetch', hasErrorFetch)
  console.log('activities', activities)

  useEffect(() => {
    if (!user) return
    dispatch(fetchActivities({ userId: user.id, fileId: fileId }))
  }, [dispatch, fileId, user])

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
        <ActivitySection
          activities={activities}
          isLoading={isLoadingFetch}
          hasError={hasErrorFetch}
        />
      </Box>
    </Stack>
  )
}

export default Activities
