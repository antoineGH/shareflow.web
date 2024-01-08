import { useEffect } from 'react'

import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear'
import FolderIcon from '@mui/icons-material/Folder'
import StarIcon from '@mui/icons-material/Star'
import { ClickAwayListener, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { selectFileByIdSelector } from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { fetchTags, removeTag } from 'store/tags/actions'
import { selectAllTagsSelector } from 'store/tags/selector'

import { formatDate } from './Activity/utils'
import StyledChip from './StyledChip'
import DrawerHeader from './StyledDrawerHead'
import Tabs from './Tabs/Tabs'

type Props = {
  open: boolean
  userId: number
  fileId: number
  activeDrawerTab: number
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerClose: () => void
}

function DrawerDetails({
  open,
  userId,
  fileId,
  activeDrawerTab,
  handleChangeDrawerTab,
  handleDrawerClose,
}: Props) {
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    if (!open) return
    dispatch(fetchTags({ userId, fileId }))
  }, [dispatch, fileId, open])

  const tagsFile = useSelector(selectAllTagsSelector)
  const file = useSelector(selectFileByIdSelector(fileId))

  if (!file) return null

  const { name, size, updatedAt, isFavorite } = file

  const handleClickDeleteTag = (tagId: number) => {
    if (!tagId) return
    dispatch(
      removeTag({
        userId,
        fileId,
        tagToDeleteId: tagId,
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              message: 'Tag successfully removed',
              severity: 'success',
            }),
          )
        },
      }),
    )
  }

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Drawer
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader
          sx={{
            mt: '42px',
            pl: 2,
            pb: 1,
          }}
        >
          <Stack direction="column" sx={{ width: '100%' }}>
            <Box sx={{ alignSelf: 'flex-end' }}>
              <IconButton onClick={handleDrawerClose}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </Box>
            <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
              <Box>
                <FolderIcon color="secondary" sx={{ fontSize: 50 }} />
              </Box>
              <Stack direction="column" spacing={0} sx={{ width: '100%' }}>
                <Box sx={{ width: '100%', mt: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.1 }}
                  >
                    {name}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <StarIcon
                      sx={{
                        color: isFavorite
                          ? 'gold'
                          : theme.palette.secondary.light,
                      }}
                      fontSize="small"
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {size},
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: '0.2rem' }}
                    >
                      {formatDate(updatedAt)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ width: '100%' }} mb={1}>
              {tagsFile.slice(0, 3).map(tag => (
                <StyledChip
                  size="small"
                  label={tag.tag.toLowerCase()}
                  key={tag.id}
                  onDelete={() => handleClickDeleteTag(tag.id)}
                  deleteIcon={
                    <CancelIcon
                      style={{
                        color: theme.palette.primary.main,
                      }}
                    />
                  }
                />
              ))}
            </Stack>
          </Stack>
        </DrawerHeader>
        <Divider />
        <Tabs
          userId={userId}
          fileId={fileId}
          activeDrawerTab={activeDrawerTab}
          handleChangeDrawerTab={handleChangeDrawerTab}
        />
      </Drawer>
    </ClickAwayListener>
  )
}

export default DrawerDetails
