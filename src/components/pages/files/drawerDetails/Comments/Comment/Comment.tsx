import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { defineAvatarInitials } from '../helpers'
import EmptyCommentSVG from 'assets/empty_comment.svg?react'
import type { Comment } from 'types/comments'
import { formatDate } from './utils'
import { IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

type Props = {
  comments: Comment[]
  isLoading: boolean
  hasError: boolean
  handleDeleteComment: (commentId: number) => void
}

function CommentsSection({
  comments,
  isLoading,
  hasError,
  handleDeleteComment,
}: Props) {
  if (isLoading)
    return [...Array(3)].map((_, index) => (
      <Box key={index} sx={{ mt: 2, mb: 3, pr: '1rem' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={100} height={24} />
          <Box flexGrow={1} />
          <Skeleton variant="text" width={100} height={24} />
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
            <Skeleton variant="text" />
          </CardContent>
        </Card>
      </Box>
    ))

  if (hasError)
    return (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <EmptyCommentSVG style={{ width: '200px', height: '200px' }} />
        <Typography variant="body1" fontSize=".8rem">
          Error loading comments
        </Typography>
      </Stack>
    )

  if (!comments.length)
    return (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <EmptyCommentSVG style={{ width: '200px', height: '200px' }} />
      </Stack>
    )

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 440px)',
      }}
    >
      {comments.map(comment => (
        <Box key={comment.id} sx={{ mt: 2, mb: 3, pr: '1rem' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              alt="avatar comment"
              src={comment.user?.avatarUrl || ''}
              sx={{
                width: 24,
                height: 24,
                fontSize: '.7rem',
                pt: 0.4,
                pb: 0.4,
              }}
            >
              {defineAvatarInitials(comment.user?.fullName || '')}
            </Avatar>
            <Typography variant="body2" fontWeight="bold">
              {comment.user?.fullName || ''}
            </Typography>
            <Box flexGrow={1} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(comment.createdAt)}
            </Typography>
            <IconButton
              onClick={() => handleDeleteComment(comment.id)}
              sx={{ m: 0, p: 0 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
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
              <Typography variant="body2">{comment.comment}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}

export default CommentsSection
