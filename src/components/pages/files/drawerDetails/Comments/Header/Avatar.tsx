import { Skeleton, Typography } from '@mui/material'
import AvatarMUI from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

import { useSelector } from 'store/hooks'
import { selectUserSelector, userStateSelector } from 'store/user/selector'

function Avatar() {
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)

  const fullName = user?.fullName || ''
  const avatarUrl = user?.avatarUrl || ''

  if (isLoadingFetch)
    return (
      <Stack sx={{ width: '100%' }} direction="row" gap={1} alignItems="center">
        <Skeleton animation="wave" variant="circular" width={28} height={28} />
        <Skeleton animation="wave" variant="text" width="50%" />
      </Stack>
    )

  if (hasErrorFetch) return null

  return (
    <Stack sx={{ width: '100%' }} direction="row" gap={1} alignItems="center">
      <AvatarMUI
        alt="avatar"
        sx={{
          width: 36,
          height: 36,
          mb: 1,
          backgroundColor: '#6c63ff29',
        }}
        src={avatarUrl}
      >
        {fullName[0]}
      </AvatarMUI>
      <Typography variant="body1" fontSize=".9rem" fontWeight="bold">
        {fullName}
      </Typography>
    </Stack>
  )
}

export default Avatar
