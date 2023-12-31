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

function Settings() {
  const [editMode, setEditMode] = useState<'userInfo' | 'password' | null>(null)
  const user = useSelector(selectUserSelector)
  const { isLoading: isLoadingUser, hasError: hasErrorUser } =
    useSelector(userStateSelector)
  const dispatch = useDispatch()

  const handleEditMode = (mode: 'userInfo' | 'password' | null) => {
    if (editMode === mode) {
      setEditMode(null)
    } else {
      setEditMode(mode)
    }
  }

  useEffect(() => {
    if (!user) {
      // TODO: update userId here from JWT
      dispatch(fetchUser({ userId: 1 }))
    }
  }, [dispatch, user])

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
          isLoading={isLoadingUser}
          hasError={hasErrorUser}
          editMode={editMode}
          handleEditMode={handleEditMode}
        />
        <Password editMode={editMode} handleEditMode={handleEditMode} />
        <Language />
        <Version />
      </Grid>
    </Grid>
  )
}

export default Settings
