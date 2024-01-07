import { useEffect, useState } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import EmptyFiles from 'components/common/EmptyFiles'
import ErrorFiles from 'components/common/ErrorFiles'
import LoadingFiles from 'components/common/LoadingFiles'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { fetchFiles } from 'store/files/actions'
import {
  filesDataStateSelector,
  filesStateSelector,
} from 'store/files/selector'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import type { FileData } from 'types/files'

import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import FilesTable from '../files/filesTable/FilesTable'

function Deleted() {
  const [hasStartedFetching, setHasStartedFetching] = useState(false)
  const dispatch = useDispatch()

  // ### User ###
  const user = useSelector(selectUserSelector)
  const { userId, error } = useFetchUserFromToken(user)
  const {
    isLoadingFetch: isLoadingFetchUser,
    hasErrorFetch: hasErrorFetchUser,
  } = useSelector(userStateSelector)

  useEffect(() => {
    if (!userId) return
    if (!user) dispatch(fetchUser({ userId }))
    setHasStartedFetching(true)
    dispatch(fetchFiles({ userId, filter: 'is_deleted' }))
  }, [userId])

  // ### Files ###
  const fileData: FileData = useSelector(filesDataStateSelector)
  const {
    isLoadingFetch: isLoadingFetchFiles,
    hasErrorFetch: hasErrorFetchFiles,
  } = useSelector(filesStateSelector)

  // ### Error ###
  const isLoading = isLoadingFetchUser || isLoadingFetchFiles
  const hasError = hasErrorFetchUser || hasErrorFetchFiles || error

  useEffect(() => {
    if (!isLoading) return
    setHasStartedFetching(true)
  }, [isLoading])

  useEffect(() => {
    if (error) {
      dispatch(
        openSnackbar({
          isOpen: true,
          severity: 'error',
          message: error?.message || 'Error, please try again',
        }),
      )
    }
  }, [dispatch, error])

  const {
    isDrawerOpen,
    drawerFileId,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerClose,
    handleDrawerOpen,
    toggleDrawer,
  } = useDrawerDetails()

  const { files } = fileData

  if (isLoading || !userId || !hasStartedFetching)
    return <LoadingFiles pageName="Deleted" />

  if (hasError) return <ErrorFiles pageName="Deleted" />

  if (files.length >= 1 && !isLoading && !hasError)
    return (
      <Grid
        container
        sx={{
          height: 'calc(100% - 42px)',
          mt: '42px',
        }}
      >
        <Grid item py={1.5} px={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <BreadcrumbEntry pageName="Deleted" />
          </Breadcrumbs>
        </Grid>
        <FilesTable
          userId={userId}
          files={files}
          isPageDelete
          handleChangeDrawerTab={handleChangeDrawerTab}
          handleDrawerOpen={handleDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
        <DrawerDetails
          open={isDrawerOpen}
          userId={userId}
          fileId={drawerFileId}
          activeDrawerTab={activeDrawerTab}
          handleChangeDrawerTab={handleChangeDrawerTab}
          handleDrawerClose={handleDrawerClose}
        />
      </Grid>
    )

  if (files.length === 0 && !hasError && hasStartedFetching)
    return <EmptyFiles pageName="Deleted" emptyText="No deleted files yet" />

  return null
}

export default Deleted
