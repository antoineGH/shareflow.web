import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { fetchActivities } from 'store/activities/actions'
import {
  activitiesStateSelector,
  selectActivitiesSelector,
} from 'store/activities/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector } from 'store/user/selector'
import type { Activity } from 'types/activities'

import ActivitySection from './ActivitiesSection'

type Props = {
  fileId: number
}

function Activities({ fileId }: Props) {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const activities: Activity[] = useSelector(selectActivitiesSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(activitiesStateSelector)

  useEffect(() => {
    if (!user || !fileId) return
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
          maxHeight: 'calc(100vh - 440px)',
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
