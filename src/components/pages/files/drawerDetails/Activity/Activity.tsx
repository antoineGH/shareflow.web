import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { formatDate } from './utils'

type Props = {
  activity: string
  createdAt: string
}

function Activity({ activity, createdAt }: Props) {
  return (
    <Box
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
      <Typography variant="body2">{activity}</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontSize="0.75rem"
        align="right"
      >
        {formatDate(createdAt)}
      </Typography>
    </Box>
  )
}

export default Activity
