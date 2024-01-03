import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { fetchTags, removeTag } from 'store/tags/actions'
import { selectAllTagsSelector } from 'store/tags/selector'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear'
import DrawerHeader from './StyledDrawerHead'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'
import FolderIcon from '@mui/icons-material/Folder'
import Typography from '@mui/material/Typography'
import StyledChip from './StyledChip'
import Tabs from './Tabs/Tabs'
import CancelIcon from '@mui/icons-material/Cancel'
import { useTheme } from '@mui/material'

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
    dispatch(fetchTags({ userId, fileId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fileId])

  const tagsFile = useSelector(selectAllTagsSelector)

  const handleClickDeleteTag = (tagId: number) => {
    if (!tagId) return
    dispatch(removeTag({ userId, fileId, tagToDeleteId: tagId }))
  }

  return (
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
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <StarIcon color="secondary" fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    47 KB,
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: '0.2rem' }}
                  >
                    37 Minutes ago
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
          {/* TODO: REMOVE TAG FROM HERE WITH TAG ID */}
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
  )
}

export default DrawerDetails
