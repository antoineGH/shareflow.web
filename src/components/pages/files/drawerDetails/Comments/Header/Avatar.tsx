import AvatarMUI from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

function Avatar() {
  return (
    <Stack sx={{ width: '100%' }} direction="row" gap={1} alignItems="center">
      <AvatarMUI
        alt="AR avatar"
        sx={{ width: 28, height: 28, fontSize: '1rem' }}
      >
        AR
      </AvatarMUI>
      Antoine Ratat
    </Stack>
  )
}

export default Avatar
