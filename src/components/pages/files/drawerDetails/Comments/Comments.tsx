import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CommentsSection from './Comment/Comment'
import Header from './Header/Header'
import type { Comment } from 'types/comments'

function Comments() {
  const comments: Comment[] = [
    {
      id: 1,
      userId: 1,
      fileId: 201,
      comment: 'This is a comment',
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z',
    },
    {
      id: 2,
      userId: 1,
      fileId: 202,
      comment: 'This is a comment 2',
      createdAt: '2022-01-02T00:00:00Z',
      updatedAt: '2022-01-02T00:00:00Z',
    },
    {
      id: 3,
      userId: 1,
      fileId: 203,
      comment: 'This is a comment 3',
      createdAt: '2022-01-03T00:00:00Z',
      updatedAt: '2022-01-03T00:00:00Z',
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
