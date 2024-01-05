import { Skeleton, Typography } from '@mui/material'
import AvatarMUI from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'

function Avatar() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)

  useEffect(() => {
    // TODO: Get userId from JWT
    if (!user) {
      dispatch(fetchUser({ userId: 1 }))
    }
  }, [dispatch, user])

  const fullName = user?.fullName || ''
  const avatarUrl = user?.avatarUrl || ''

  if (isLoadingFetch)
    return (
      <Stack sx={{ width: '100%' }} direction="row" gap={1} alignItems="center">
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton variant="text" width="50%" />
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
          border: '0.1px solid lightgray',
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
