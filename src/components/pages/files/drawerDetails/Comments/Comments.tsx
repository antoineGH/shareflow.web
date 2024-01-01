import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import CommentsSection from './Comment/Comment'
import Header from './Header/Header'
import type { Comment } from 'types/comments'
import { useDispatch, useSelector } from 'store/hooks'
import { useEffect } from 'react'
import { fetchComments } from 'store/comments/actions'
import {
  commentsStatesStateSelector,
  selectCommentsSelector,
} from 'store/comments/selector'

function Comments() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComments({ userId: 1, fileId: 18 }))
  }, [dispatch])

  const comments: Comment[] = useSelector(selectCommentsSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(
    commentsStatesStateSelector,
  )

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
        <CommentsSection
          comments={comments}
          isLoading={isLoadingFetch}
          hasError={hasErrorFetch}
        />
      </Box>
    </Stack>
  )
}

export default Comments
