import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import FilesTable from '../files/filesTable/FilesTable'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import type { FileData } from 'types/files'
import useFetchUserFromToken from 'hooks/useFetchUserFromToken'

function Deleted() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)
  const { userId, error } = useFetchUserFromToken(user)
  // TODO: SNACKBAR ERROR IF ERROR

  useEffect(() => {
    if (error || !userId || user) return
    dispatch(fetchUser({ userId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const {
    isDrawerOpen,
    drawerFileId,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerClose,
    handleDrawerOpen,
    toggleDrawer,
  } = useDrawerDetails()

  const filesData: FileData = {
    files: [
      {
        id: 18,
        name: 'Documents',
        size: '305 KB',
        modified: '2012-12-14',
        path: 'Documents',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 2,
        name: 'Photos',
        size: '452 KB',
        modified: '2012-12-14',
        path: 'Photos',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 3,
        name: 'Images',
        size: '262 KB',
        modified: '2012-12-14',
        path: 'Images',
        action: ['comments', 'tags', 'restore', 'download', 'delete'],
      },
      {
        id: 4,
        name: 'Download',
        size: '159 KB',
        modified: '2012-12-14',
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
      <Grid item py={1.5} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName="Deleted" />
        </Breadcrumbs>
      </Grid>
      <FilesTable
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
}

export default Deleted
