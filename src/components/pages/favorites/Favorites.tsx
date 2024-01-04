import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { fetchUser } from 'store/user/actions'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import FilesTable from '../files/filesTable/FilesTable'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import type { FileData } from 'types/files'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'

function Favorites() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)
  const { userId, error } = useFetchUserFromToken(user)
  // TODO: SNACKBAR ERROR IF ERROR

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const filesData: FileData = {
    files: [
      {
        id: 18,
        name: 'Documents',
        size: '305 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Documents',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 2,
        name: 'Photos',
        size: '452 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Photos',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 3,
        name: 'Images',
        size: '262 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Images',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 4,
        name: 'Download',
        size: '159 KB',
        modified: '2012-12-14',
        isFavorite: true,
        path: 'Download',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
    ],
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
