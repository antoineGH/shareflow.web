import { useEffect } from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'
import { useDispatch, useSelector } from 'store/hooks'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import type { FileData } from 'types/files'

import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import FilesTable from '../files/filesTable/FilesTable'

function Favorites() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)
  const { userId, error } = useFetchUserFromToken(user)

  const {
    isDrawerOpen,
    drawerFileId,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerClose,
    handleDrawerOpen,
    toggleDrawer,
  } = useDrawerDetails()

  useEffect(() => {
    if (error || !userId || user) return
    dispatch(fetchUser({ userId }))
  }, [userId])

  const filesData: FileData = {
    files: [],
    countFiles: 4,
    countFolders: 4,
    totalSize: '1.17 MB',
  }

  const { files } = filesData

  if (isLoadingFetch) return <>isLoading</>
  if (hasErrorFetch || !userId) return <>hasError</>

  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
    >
      <Grid item pt={1.5} px={2} mb={1.5}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName="Favorites" />
        </Breadcrumbs>
      </Grid>
      <FilesTable
        files={files}
        isPageFavorite={true}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerOpen={handleDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <DrawerDetails
        userId={userId}
        fileId={drawerFileId}
        open={isDrawerOpen}
        activeDrawerTab={activeDrawerTab}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerClose={handleDrawerClose}
      />
    </Grid>
  )
}

export default Favorites
