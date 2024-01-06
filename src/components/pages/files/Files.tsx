import { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'

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

import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import CountFiles from './countFiles/CountFiles'
import DrawerDetails from './drawerDetails/DrawerDetails'
import useDrawerDetails from './drawerDetails/useDrawerDetails'
import FilesTable from './filesTable/FilesTable'
import TextContainer from './filesUploadModal/filesUploadDragNDrop/TextContainer'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import FirstLoginModal from './firstLoginModal/FirstLoginModal'
import useFirstConnect from './firstLoginModal/useFirstConnect'
import { extractRoutingParams } from './helpers'

function Files() {
  const dispatch = useDispatch()
  const params = useParams<{ path: string }>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routingParams = extractRoutingParams(params)
  // TODO: use routingParams to fetch files in context from the API

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
  }, [userId, user])

  // ### Files ###
  const filesData = useSelector(filesDataStateSelector)
  const {
    isLoadingFetch: isLoadingFetchFiles,
    hasErrorFetch: hasErrorFetchFiles,
  } = useSelector(filesStateSelector)

  useEffect(() => {
    if (!userId || filesData.files.length !== 0) return
    dispatch(fetchFiles({ userId }))
  }, [userId])

  // ### Error ###
  const isLoading = isLoadingFetchUser || isLoadingFetchFiles
  const hasError = hasErrorFetchUser || hasErrorFetchFiles || error

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

  if (isLoading) return <>isLoading</>
  if (hasError || !userId || error || !filesData) return <>hasError</>

  const { files, countFiles, countFolders, totalSize } = filesData

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
        countFiles={countFiles || 0}
        countFolders={countFolders || 0}
        totalSize={totalSize || '0'}
      />
      <DrawerDetails
        open={isDrawerOpen}
        userId={userId}
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
