import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { calculateStoragePercentage } from './helpers'
import StyledLinearProgress from './StyledLinearProgress'
import type { Settings } from 'types/storage'

function Storage() {
  const settings: Settings = {
    storage: {
      storageUsed: 5,
      totalStorage: 10,
    },
  }

  const { storageUsed, totalStorage } = settings.storage

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
            {`You are using ${storageUsed} MB`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Storage
