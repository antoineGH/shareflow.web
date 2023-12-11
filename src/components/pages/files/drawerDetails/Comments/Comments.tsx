import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CommentsSection from './Comment/Comment'
import Header from './Header/Header'
import type { Comment } from './types'

function Comments() {
  const comments: Comment[] = [
    {
      id: '1',
      comment: 'This is a comment',
      createdAt: 'One minute ago',
      user: {
        id: '1',
        name: 'Antoine Ratat',
      },
    },
    {
      id: '2',
      comment: 'This is a comment 2',
      createdAt: 'Yesterday',
      user: {
        id: '2',
        name: 'Antoine Ratat',
      },
    },
    {
      id: '3',
      comment: 'This is a comment 3',
      createdAt: 'Yesterday',
      user: {
        id: '3',
        name: 'Antoine Ratat',
      },
    },
  ]

  return (
    <Stack gap={1}>
      <Header />
      <Box
        sx={{
          width: '100%',
          p: 2,
          pt: 0.5,
          pr: 0,
        }}
      >
        <CommentsSection comments={comments} />
      </Box>
    </Stack>
  )
}

export default Comments
