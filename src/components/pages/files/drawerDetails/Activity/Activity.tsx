import RssFeedIcon from '@mui/icons-material/RssFeed'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { formatDate } from './utils'

type Props = {
  activity: string
  createdAt: string
}

function Activity({ activity, createdAt }: Props) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        my: 1.5,
        backgroundColor: '#6c63ff29',
        borderRadius: '10px',
        padding: '0.7rem',
        marginRight: '1rem',
        '&:last-child': {
          paddingBottom: '.3rem',
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={1.5}>
        <RssFeedIcon sx={{ color: theme.palette.primary.main }} />
        <Typography
          variant="body2"
          ml={1}
          sx={{ justifyContent: 'center', alignContent: 'center' }}
        >
          {activity}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize="0.7rem"
        align="right"
      >
        {formatDate(createdAt)}
      </Typography>
    </Box>
  )
}

export default Activity
