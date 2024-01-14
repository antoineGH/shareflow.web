import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormHelperText, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { createFolder } from 'store/files/actions'
import { filesStateSelector } from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { selectUserSelector } from 'store/user/selector'

import StyledIcon from './styledIcon'
import StyledMenu from './StyledMenu'

type FormData = {
  fileName: string
}

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  closeMenu: () => void
}

function Menu({ anchorEl, open, closeMenu }: Props) {
  const location = useLocation()
  const excludedPathName = ['auth', 'files', '']

  const pathnames = location.pathname
    .split('/')
    .filter(pathname => !excludedPathName.includes(pathname))

  const parentId = Number(pathnames[pathnames.length - 1]) || undefined

  const user = useSelector(selectUserSelector)
  const { isLoadingCreate } = useSelector(filesStateSelector)
  const theme = useTheme()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<FormData>()

  const fileName = watch('fileName', '')

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!user || !user.id) return

    await dispatch(
      createFolder({
        userId: user.id,
        newFolder: { name: data.fileName, isFolder: true, parentId },
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'File created',
            }),
          )
          reset()
          closeMenu()
        },
      }),
    )
  }

  function cancelFolder(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    reset()
    closeMenu()
  }

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="breadcrumb-menu"
      open={open}
      onClose={closeMenu}
      onClick={closeMenu}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      sx={{ mt: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack
          spacing={1}
          p={1.5}
          direction="column"
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <Stack spacing={1} direction="row">
            <StyledIcon theme={theme}>
              <CreateNewFolderIcon />
            </StyledIcon>
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
              id="standard-basic"
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
          </Stack>
          <FormHelperText sx={{ textAlign: 'left', pl: 4 }}>
            {errors.fileName
              ? errors.fileName.message
              : `${20 - (fileName.length || 0)} characters left`}
            {errors.fileName && errors.fileName.message}
          </FormHelperText>
          <Stack spacing={1} direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={e => cancelFolder(e)}
              sx={{ textTransform: 'capitalize' }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              size="small"
              loading={isLoadingCreate}
              disabled={
                isLoadingCreate ||
                Boolean(errors.fileName) ||
                fileName?.length === 0
              }
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.contrastText,
                },
                color: 'white',
                textTransform: 'capitalize',
              }}
            >
              Create
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </StyledMenu>
  )
}

export default Menu
