import LoadingButton from '@mui/lab/LoadingButton'
import { Box, FormHelperText, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { partialUpdateFile } from 'store/files/actions'
import { filesStateSelector } from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'

type FormData = {
  fileName: string
}

type Props = {
  userId: number
  id: number
  name: string
  resetRowIdRename: () => void
}

function RenameFileForm({ userId, id, name, resetRowIdRename }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>()

  const dispatch = useDispatch()
  const { isLoadingPatch } = useSelector(filesStateSelector)
  const disabledSubmit = isLoadingPatch || Boolean(errors.fileName)

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch(
      partialUpdateFile({
        userId,
        fileId: id,
        updates: { name: data.fileName },
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'File renamed',
            }),
          )
          reset()
          resetRowIdRename()
        },
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Stack
        sx={{
          flexDirection: 'row',
        }}
        gap={1}
      >
        <Box
          sx={{
            width: '100%',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <TextField
              {...register('fileName', {
                minLength: {
                  value: 2,
                  message: '2 characters minimum',
                },
                maxLength: {
                  value: 20,
                  message: '20 characters maximum',
                },
              })}
              size="small"
              error={Boolean(errors.fileName)}
              onBlur={() => trigger('fileName')}
              id="rename-multiline-static"
              placeholder="Rename"
              defaultValue={name}
              variant="outlined"
              FormHelperTextProps={{
                style: {
                  textAlign: 'right',
                },
              }}
              inputProps={{
                style: {
                  fontSize: '.8rem',
                  padding: '0.25rem .5rem',
                },
              }}
            />
            <FormHelperText
              error={Boolean(errors.fileName)}
              style={{ visibility: errors.fileName ? 'visible' : 'hidden' }}
            >
              {errors.fileName && errors.fileName.message}
            </FormHelperText>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            display: 'flex',
          }}
        >
          <LoadingButton
            size="small"
            variant="contained"
            loading={isLoadingPatch}
            disabled={disabledSubmit}
            type="submit"
            sx={{ color: 'white', textTransform: 'capitalize', mb: 0.5 }}
          >
            Rename
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  )
}

export default RenameFileForm
