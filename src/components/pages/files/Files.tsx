import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { fetchUser } from 'store/user/actions'
import { useParams } from 'react-router-dom'
import { FileData } from 'types/files'
import Grid from '@mui/material/Grid'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import TextContainer from './filesUploadModal/filesUploadDragNDrop/TextContainer'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'
import useDrawerDetails from './drawerDetails/useDrawerDetails'
import FilesTable from './filesTable/FilesTable'
import DrawerDetails from './drawerDetails/DrawerDetails'
import CountFiles from './countFiles/CountFiles'
import useFirstConnect from './firstLoginModal/useFirstConnect'
import FirstLoginModal from './firstLoginModal/FirstLoginModal'
import { extractRoutingParams } from './helpers'

function Files() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const { isLoadingFetch, hasErrorFetch } = useSelector(userStateSelector)

  const params = useParams<{ path: string }>()

  // TODO: use routingParams to fetch files in context from the API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routingParams = extractRoutingParams(params)

  useEffect(() => {
    if (!user) {
      // TODO: update userId here from JWT
      dispatch(fetchUser({ userId: 1 }))
    }
  }, [dispatch, user])

  const {
    open: openFirstConnectModal,
    handleClose: handleCloseFirstConnectModal,
  } = useFirstConnect()

  const {
    droppedFiles,
    isModalAddDocumentsOpen,
    closeModalAddDocs,
    openModalAddDocs,
  } = useAddDocumentsDropZone({ disabled: false })

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
        isFavorite: true,
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

  const { files, countFiles, countFolders, totalSize } = filesData

  if (isLoadingFetch) return <>isLoading</>
  if (hasErrorFetch || !user) return <>hasError</>

  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
        width: isDrawerOpen ? 'calc(100% - 320px)' : '100%',
      }}
    >
      <Breadcrumbs openModalAddDocs={openModalAddDocs} />
      <TextContainer />
      <FilesTable
        files={files}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerOpen={handleDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <CountFiles
        countFiles={countFiles}
        countFolders={countFolders}
        totalSize={totalSize}
      />
      <DrawerDetails
        open={isDrawerOpen}
        userId={user.id}
        fileId={drawerFileId}
        activeDrawerTab={activeDrawerTab}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerClose={handleDrawerClose}
      />
      <DocumentsUploadModal
        open={isModalAddDocumentsOpen}
        close={closeModalAddDocs}
        droppedFiles={droppedFiles}
      />
      <FirstLoginModal
        open={openFirstConnectModal}
        handleClose={handleCloseFirstConnectModal}
      />
    </Grid>
  )
}

export default Files
