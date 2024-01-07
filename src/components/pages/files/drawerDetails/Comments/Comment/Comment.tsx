import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import EmptyCommentSVG from 'assets/empty_comment.svg?react'

import { useSelector } from 'store/hooks'
import { selectUserSelector } from 'store/user/selector'
import type { Comment } from 'types/comments'

import { formatDate } from './utils'
import { defineAvatarInitials } from '../helpers'

type Props = {
  comments: Comment[]
  isLoading: boolean
  hasError: boolean
  isLoadingDelete: boolean
  handleDeleteComment: (commentId: number) => void
}

function CommentsSection({
  comments,
  isLoading,
  hasError,
  isLoadingDelete,
  handleDeleteComment,
}: Props) {
  const user = useSelector(selectUserSelector)

  if (isLoading)
    return [...Array(3)].map((_, index) => (
      <Box
        key={index}
        sx={{
          mt: 2,
          mb: 3,
          mr: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={100} height={24} />
          <Box flexGrow={1} />
          <Skeleton variant="text" width={100} height={24} />
        </Stack>
        <Card
          sx={{
            mt: 1,
            pr: '1rem',
            backgroundColor: '#6c63ff29',
            borderRadius: '10px',
            padding: '0.7rem',
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
            <Skeleton variant="text" />
          </CardContent>
        </Card>
      </Box>
    ))

  if (hasError || !user)
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
                width: 32,
                height: 32,
                backgroundColor: '#6c63ff29',
              }}
            >
              {defineAvatarInitials(comment.user?.fullName || '')}
            </Avatar>
            <Typography variant="body2" fontWeight="bold">
              {comment.user?.fullName || ''}
            </Typography>

            <Box flexGrow={1} />
            {comment.user.userId === user.id && (
              <IconButton
                disabled={isLoadingDelete}
                onClick={() => handleDeleteComment(comment.id)}
                sx={{ m: 0, p: 0 }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
          <Card
            sx={{
              mt: 1,
              borderRadius: '10px',
              backgroundColor: '#6c63ff29',
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                '&:last-child': {
                  paddingBottom: '.3rem',
                },
              }}
            >
              <Typography variant="body2">{comment.comment}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize="0.7rem"
                align="right"
              >
                {formatDate(comment.createdAt)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}

export default CommentsSection
