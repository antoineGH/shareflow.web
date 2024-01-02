import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector } from 'store/user/selector'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { commentsStatesStateSelector } from 'store/comments/selector'
import { createComment } from 'store/comments/actions'
import LoadingButton from '@mui/lab/LoadingButton'

type FormData = {
  comment: string
}

type Props = {
  fileId: number
}

function AddCommentForm({ fileId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<FormData>()
  const dispatch = useDispatch()

  const comment = watch('comment', '')
  const user = useSelector(selectUserSelector)
  const { isLoadingCreate } = useSelector(commentsStatesStateSelector)
  const disabledSubmit =
    Boolean(errors.comment) || comment.length === 0 || isLoadingCreate

  const onSubmit: SubmitHandler<FormData> = data => {
    if (!user) return
    dispatch(
      createComment({
        userId: user.id,
        fileId: fileId,
        newComment: data.comment,
        cb: () => {
          reset()
        },
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Stack sx={{ width: '100%', mb: 1 }}>
        <TextField
          {...register('comment', {
            minLength: {
              value: 3,
              message: '3 characters minimum',
            },
            maxLength: {
              value: 255,
              message: '255 characters maximum',
            },
          })}
          error={Boolean(errors.comment)}
          onBlur={() => trigger('comment')}
          id="standard-multiline-static"
          label="Comment"
          multiline
          rows={3}
          placeholder="Add a comment..."
          variant="filled"
          FormHelperTextProps={{
            style: {
              textAlign: 'right',
            },
          }}
          helperText={
            errors.comment
              ? errors.comment.message
              : `${255 - (comment.length || 0)} characters left`
          }
        />
        <Box>
          <LoadingButton
            size="small"
            variant="contained"
            loading={isLoadingCreate}
            disabled={disabledSubmit}
            type="submit"
            sx={{ color: 'white', textTransform: 'capitalize' }}
          >
            Add Comment
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  )
}

export default AddCommentForm
