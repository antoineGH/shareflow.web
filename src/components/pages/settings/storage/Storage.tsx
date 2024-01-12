import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { getSizeFile } from 'components/pages/files/helpers'
import { useSelector } from 'store/hooks'
import {
  selectStorageSelector,
  storageStateSelector,
} from 'store/settings/storage/selector'
import { userStateSelector } from 'store/user/selector'

import { calculateStoragePercentage } from './helpers'
import StyledLinearProgress from './StyledLinearProgress'

type Props = {
  hasStartedFetching: boolean
}

function Storage({ hasStartedFetching }: Props) {
  const storage = useSelector(selectStorageSelector)
  const {
    isLoadingFetch: isLoadingFetchUser,
    hasErrorFetch: hasErrorFetchUser,
  } = useSelector(userStateSelector)
  const {
    isLoadingFetch: isLoadingFetchSettings,
    hasErrorFetch: hasErrorFetchSettings,
  } = useSelector(storageStateSelector)

  const loading =
    isLoadingFetchUser || isLoadingFetchSettings || !hasStartedFetching
  const hasErrorFetch = hasErrorFetchUser || hasErrorFetchSettings

  if (loading) {
    return (
      <Box p={1}>
        <Box position="relative" display="inline-flex" width="100%">
          <Box sx={{ width: '100%' }}>
            <Skeleton animation="wave" variant="rectangular" height={36} />
          </Box>
        </Box>
      </Box>
    )
  }

  if (hasErrorFetch || !storage) {
    return (
      <Box p={1}>
        <Box position="relative" display="inline-flex" width="100%">
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ lineHeight: '1', pl: 1 }}>
              Error loading settings
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  const { storageUsed, totalStorage } = storage

  return (
    <Box p={1}>
      <Box position="relative" display="inline-flex" width="100%">
        <Box sx={{ width: '100%' }}>
          <StyledLinearProgress
            variant="determinate"
            value={calculateStoragePercentage({ storageUsed, totalStorage })}
          />
        </Box>
        <Box
          top={0}
          left="1rem"
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
        >
          <Typography variant="body2" component="div" color="text.secondary">
            {`You are using ${getSizeFile(storageUsed)} (total: ${getSizeFile(
              totalStorage,
            )})`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Storage
