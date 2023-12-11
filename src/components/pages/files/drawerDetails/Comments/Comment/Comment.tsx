import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import type { Comment } from '../types'
import { defineAvatarInitials } from '../helpers'

type Props = {
  comments: Comment[]
}

function CommentsSection({ comments }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 420px)',
      }}
    >
      {comments.map(({ id, comment, createdAt, user }) => (
        <Box key={id} sx={{ my: 2, pr: '1rem' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              alt="avatar comment"
              sx={{ width: 22, height: 22, fontSize: '.7rem' }}
            >
              {defineAvatarInitials(user.name)}
            </Avatar>
            <Typography variant="body2" fontWeight="bold">
              {user.name}
            </Typography>
            <Box flexGrow={1} />
            <Typography variant="body2" color="text.secondary">
              {createdAt}
            </Typography>
          </Stack>
          <Card
            sx={{
              mt: 1,
              borderRadius: '5px',
              backgroundColor: '#f5f5f5',
              boxShadow:
                'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                '&:last-child': {
                  paddingBottom: '1rem',
                },
              }}
            >
              <Typography variant="body2">{comment}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}

export default CommentsSection
