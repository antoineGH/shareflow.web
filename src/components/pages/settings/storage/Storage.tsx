import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { calculateStoragePercentage } from './helpers'
import StyledLinearProgress from './StyledLinearProgress'
import { useSelector } from 'store/hooks'
import { selectStorageSelector } from 'store/settings/storage/selector'
import { userStateSelector } from 'store/user/selector'
import { Skeleton } from '@mui/material'

function Storage() {
  const storage = useSelector(selectStorageSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)

  if (isLoadingFetch) {
    return (
      <Box p={1}>
        <Box position="relative" display="inline-flex" width="100%">
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" height={36} />
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
            {`You are using ${storageUsed} MB (total: ${totalStorage} MB)`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Storage
