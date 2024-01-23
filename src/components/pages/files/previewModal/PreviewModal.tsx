import { ReactNode, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import GradeIcon from '@mui/icons-material/Grade'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { downloadFiles } from 'api/files'
import { selectFileByIdSelector } from 'store/files/selector'
import { useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'

import { formatDate } from '../filesTable/helpers'
import { getSizeFile } from '../helpers'

type Props = {
  userId: number
  open: boolean
  close: () => void
  children: ReactNode
  previewFileId: number
}

function PreviewModal({ userId, open, close, children, previewFileId }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const file = useSelector(selectFileByIdSelector(previewFileId))
  const theme = useTheme()
  const dispatch = useDispatch()

  if (!children || !previewFileId) return null

  const { id, name, updatedAt, size, isFavorite } = file

  const handleClickDownload = () => {
    setIsLoading(true)
    downloadFiles({
      userId,
      fileIds: [id],
      cb: () => {
        dispatch(
          openSnackbar({
            isOpen: true,
            message: 'File downloaded',
            severity: 'success',
          }),
          setTimeout(() => {
            setIsLoading(false)
          }, 1000),
        )
      },
      cbError: () => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: 'error',
            message: 'Error downloading file',
          }),
          setTimeout(() => {
            setIsLoading(false)
          }, 1000),
        )
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        sx: {
          maxWidth: '1240px',
          width: '100%',
          maxHeight: '90%',
          display: 'flex',
          justifyContent: 'center',
          p: 0,
          borderRadius: '3px',
          position: { lg: 'absolute' },
          top: { lg: '2%' },
        },
      }}
    >
      {children}
      <Divider sx={{ height: '1px', backgroundColor: '#6c63ff3b' }} />
      <DialogActions
        sx={{
          backgroundColor: '#6c63ff21',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            gap: '8px',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: '8px',
            }}
          >
            name:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                mr: '8px',
                color: theme.palette.primary.main,
              }}
            >
              <strong>{name}</strong>
            </Typography>
          </Typography>
          <Typography variant="body2">
            last modified:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                mr: '8px',
                color: theme.palette.primary.main,
              }}
            >
              <strong>{formatDate(updatedAt)}</strong>
            </Typography>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mr: '8px',
            }}
          >
            size:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                color: theme.palette.primary.main,
              }}
            >
              <strong>{getSizeFile(size)}</strong>
            </Typography>
          </Typography>
          <GradeIcon
            sx={{
              color: isFavorite ? 'gold' : 'grey',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'flex-end',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <LoadingButton
            variant="contained"
            onClick={handleClickDownload}
            size="small"
            loading={isLoading}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.contrastText,
              },
              color: 'white',
              textTransform: 'capitalize',
            }}
          >
            Download
          </LoadingButton>
          <IconButton onClick={close}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewModal
