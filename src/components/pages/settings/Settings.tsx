import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Storage from './storage/Storage'
import AccountInfo from './accountInfo/AccountInfo'
import Password from './password/Password'
import Language from './Language'
import Version from './version/Version'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import { fetchUser } from 'store/user/actions'
import { fetchStorage } from 'store/settings/storage/actions'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { openSnackbar } from 'store/snackbar/slice'
import { selectStorageSelector } from 'store/settings/storage/selector'

function Settings() {
  const [editMode, setEditMode] = useState<'userInfo' | 'password' | null>(null)
  const dispatch = useDispatch()

  // ### User ###
  const user = useSelector(selectUserSelector)
  const { userId, error } = useFetchUserFromToken(user)
  const {
    isLoadingFetch: isLoadingFetchUser,
    hasErrorFetch: hasErrorFetchUser,
  } = useSelector(userStateSelector)

  useEffect(() => {
    if (!userId || user) return
    dispatch(fetchUser({ userId }))
  }, [userId, dispatch, user])

  // ### Storage ###
  const storage = useSelector(selectStorageSelector)
  const {
    isLoadingFetch: isLoadingFetchStorage,
    hasErrorFetch: hasErrorFetchStorage,
  } = useSelector(userStateSelector)

  useEffect(() => {
    if (!userId || Object.keys(storage).length !== 0) return
    dispatch(fetchStorage({ userId }))
  }, [userId, dispatch, storage])

  // ### Error ###
  useEffect(() => {
    if (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: 'error',
          message: error.message,
        }),
      )
    }
  }, [dispatch, error])

  const isLoadingFetch = isLoadingFetchUser || isLoadingFetchStorage
  const hasErrorFetch = hasErrorFetchUser || hasErrorFetchStorage

  const handleEditMode = (mode: 'userInfo' | 'password' | null) => {
    if (editMode === mode) {
      setEditMode(null)
    } else {
      setEditMode(mode)
    }
  }

  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
    >
      <Grid item pt={1.5} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName="Settings" />
        </Breadcrumbs>
      </Grid>
      <Grid item sx={{ width: '100%' }} py={0} px={1}>
        <Storage />
        <AccountInfo
          user={user}
          isLoading={isLoadingFetch}
          hasError={hasErrorFetch}
          editMode={editMode}
          handleEditMode={handleEditMode}
        />
        <Password
          user={user}
          isLoading={isLoadingFetch}
          hasError={hasErrorFetch}
          editMode={editMode}
          handleEditMode={handleEditMode}
        />
        <Language />
        <Version />
      </Grid>
    </Grid>
  )
}

export default Settings
