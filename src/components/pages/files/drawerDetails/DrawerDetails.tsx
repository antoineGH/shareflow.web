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

type Props = {
  open: boolean
  handleDrawerClose: () => void
}

function DrawerDetails({ open, handleDrawerClose }: Props) {
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
          <Stack direction="row" spacing={0.5} sx={{ width: '100%' }} mb={1}>
            <StyledChip size="small" label="test" />
            <StyledChip size="small" label="test2" />
            <StyledChip size="small" label="test3" />
          </Stack>
        </Stack>
      </DrawerHeader>
      <Divider />
      <Tabs />
    </Drawer>
  )
}

export default DrawerDetails