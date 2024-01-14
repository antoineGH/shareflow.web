import { ReactNode, useState } from 'react'

import GradeIcon from '@mui/icons-material/Grade'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Dialog,
  DialogActions,
  Divider,
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: '8px',
            }}
          >
            Name:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                mr: '8px',
                color: theme.palette.primary.main,
              }}
            >
              {name}
            </Typography>
          </Typography>
          <Typography variant="body2">
            Last modified:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                mr: '8px',
                color: theme.palette.primary.main,
              }}
            >
              {formatDate(updatedAt)}
            </Typography>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mr: '8px',
            }}
          >
            Size:{' '}
            <Typography
              component="span"
              sx={{
                fontSize: '.8rem',
                color: theme.palette.primary.main,
              }}
            >
              {getSizeFile(size)}
            </Typography>
          </Typography>
          <GradeIcon
            sx={{
              color: isFavorite ? 'gold' : 'grey',
            }}
          />
        </Box>
        <Box>
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
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default PreviewModal
