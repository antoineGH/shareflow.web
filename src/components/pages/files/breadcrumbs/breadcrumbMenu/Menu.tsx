import FolderIcon from '@mui/icons-material/Folder'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormHelperText, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'

import { createFolder } from 'store/files/actions'
import { filesStateSelector } from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { selectUserSelector } from 'store/user/selector'

import { breadcrumbAction } from './helpers'
import { useFolderMenu } from './hooks/useFolderMenu'
import listItems from './listItems'
import StyledIcon from './styledIcon'
import StyledMenu from './StyledMenu'

type FormData = {
  fileName: string
}

type Props = {
  anchorEl: null | HTMLElement
  open: boolean
  openModalAddDocs(): void
  closeMenu: () => void
}

function Menu({ anchorEl, open, openModalAddDocs, closeMenu }: Props) {
  const { isHidden, openFolder, closeFolder } = useFolderMenu()
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

  const fileName = watch('fileName')

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!user || !user.id) return

    await dispatch(
      createFolder({
        userId: user.id,
        newFolder: { name: data.fileName, isFolder: true },
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

  function handleBreadCrumbAction(
    e: React.MouseEvent<HTMLLIElement>,
    id: string,
  ) {
    e.stopPropagation()
    breadcrumbAction({ id, closeMenu, openFolder, openModalAddDocs })
  }

  function cancelFolder(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    reset()
    closeFolder()
  }

  return (
    <StyledMenu
      anchorEl={anchorEl}
      id="breadcrumb-menu"
      open={open}
      onClose={closeMenu}
      onClick={closeMenu}
      PaperProps={{
        elevation: 0,
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {!isHidden && (
        <MenuItem
          key="menu-item-folder"
          disableRipple
          onClick={event => event.stopPropagation()}
        >
          <ListItemIcon>
            <StyledIcon>
              <FolderIcon />
            </StyledIcon>
          </ListItemIcon>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Stack spacing={1} direction="column">
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
              <FormHelperText
                error={Boolean(errors.fileName)}
                style={{ visibility: errors.fileName ? 'visible' : 'hidden' }}
              >
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
        </MenuItem>
      )}
      {!isHidden && <Divider key="divider" sx={{ my: 0.5 }} />}
      {listItems.map(({ id, label, icon }) => (
        <MenuItem
          key={id}
          onClick={e => handleBreadCrumbAction(e, id)}
          disabled={!isHidden && id === 'folder'}
        >
          <ListItemIcon>
            <StyledIcon>{icon}</StyledIcon>
          </ListItemIcon>
          {label}
        </MenuItem>
      ))}
    </StyledMenu>
  )
}

export default Menu
