import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'

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
import { FileData } from 'types/files'

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
  const [hasStartedFetching, setHasStartedFetching] = useState(false)
  const dispatch = useDispatch()
  const params = useParams<{ path: string }>()

  const routingParams = extractRoutingParams(params)
  const parentId = Number(routingParams[routingParams.length - 1])

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
    dispatch(fetchFiles({ userId, filter: 'all_files', parentId }))
  }, [userId, parentId])

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

  const { files, countFiles, countFolders, totalSize } = fileData

  if (isLoading || !userId || !hasStartedFetching)
    return <LoadingFiles pageName="Files" />

  if (hasError) return <ErrorFiles pageName="Files" />

  if (!isLoading && !hasError)
    return (
      <Grid
        container
        sx={{
          height: 'calc(100% - 42px)',
          mt: '42px',
          width: isDrawerOpen ? 'calc(100% - 320px)' : '100%',
        }}
      >
        <Breadcrumbs userId={userId} openModalAddDocs={openModalAddDocs} />
        <TextContainer />
        <FilesTable
          userId={userId}
          files={files}
          handleChangeDrawerTab={handleChangeDrawerTab}
          handleDrawerOpen={handleDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
        {files.length === 0 && !hasError && hasStartedFetching ? (
          <EmptyFiles
            pageName="Files"
            emptyText="No files yet"
            hasHeader={false}
          />
        ) : (
          <>
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
          </>
        )}
        <DocumentsUploadModal
          userId={userId}
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

  // if (files.length === 0 && !hasError && hasStartedFetching)
  //   return <EmptyFiles pageName="Files" emptyText="No files yet" />

  return null
}

export default Files
