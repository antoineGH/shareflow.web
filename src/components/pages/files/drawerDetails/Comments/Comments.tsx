import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { fetchComments, removeComment } from 'store/comments/actions'
import {
  commentsStatesStateSelector,
  selectCommentsSelector,
} from 'store/comments/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { selectUserSelector } from 'store/user/selector'
import type { Comment } from 'types/comments'

import CommentsSection from './Comment/Comment'
import Header from './Header/Header'

type Props = {
  fileId: number
}

function Comments({ fileId }: Props) {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const comments: Comment[] = useSelector(selectCommentsSelector)
  const { isLoadingFetch, hasErrorFetch, isLoadingDelete } = useSelector(
    commentsStatesStateSelector,
  )

  useEffect(() => {
    if (!user) return
    dispatch(fetchComments({ userId: user.id, fileId }))
  }, [dispatch, fileId, user])

  const handleDeleteComment = (commentId: number) => {
    if (!user) return
    dispatch(
      removeComment({
        userId: user.id,
        fileId,
        commentToDeleteId: commentId,
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              message: 'Comment removed successfully',
              severity: 'success',
            }),
          )
        },
      }),
    )
  }

  if (!user) return null

  return (
    <Stack gap={1}>
      <Header fileId={fileId} />
      <Box
        sx={{
          width: '100%',
          p: 2,
          pt: 0.5,
          pr: 0,
          height: 'calc(100vh - 440px)',
        }}
      >
        <CommentsSection
          comments={comments}
          isLoading={isLoadingFetch}
          hasError={hasErrorFetch}
          isLoadingDelete={isLoadingDelete}
          handleDeleteComment={handleDeleteComment}
        />
      </Box>
    </Stack>
  )
}

export default Comments
