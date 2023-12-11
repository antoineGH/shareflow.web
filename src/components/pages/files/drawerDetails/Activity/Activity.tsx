import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type Props = {
  activity: string
  createdAt: string
}

function Activity({ activity, createdAt }: Props) {
  return (
    <Box sx={{ my: 1.5 }}>
      <Typography variant="body2">{activity}</Typography>
      <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
        {createdAt}
      </Typography>
    </Box>
  )
}

export default Activity
