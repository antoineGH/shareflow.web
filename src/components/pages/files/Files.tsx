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
import { fetchStorage } from 'store/settings/storage/actions'
import { selectStorageSelector } from 'store/settings/storage/selector'
import { openSnackbar } from 'store/snackbar/slice'
import { fetchUser } from 'store/user/actions'
import { selectUserSelector, userStateSelector } from 'store/user/selector'
import { FileData } from 'types/files'

import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import CountFiles from './countFiles/CountFiles'
import DrawerDetails from './drawerDetails/DrawerDetails'
import useDrawerDetails from './drawerDetails/useDrawerDetails'
import FilesTable from './filesTable/FilesTable'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import FirstLoginModal from './firstLoginModal/FirstLoginModal'
import useFirstConnect from './firstLoginModal/useFirstConnect'
import { extractRoutingParams } from './helpers'
import FilePreview from './previewModal/FilePreview'
import PreviewModal from './previewModal/PreviewModal'

function Files() {
  const [hasStartedFetching, setHasStartedFetching] = useState(false)
  const [hasFetchedStorage, setHasFetchedStorage] = useState(false)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [previewFileId, setPreviewFileId] = useState<number | null>(null)
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

  // ### Storage ###
  const storage = useSelector(selectStorageSelector)
  const { hasErrorFetch: hasErrorFetchStorage } = useSelector(userStateSelector)

  useEffect(() => {
    if (!userId || hasFetchedStorage) return
    dispatch(fetchStorage({ userId }))
    setHasFetchedStorage(true)
  }, [userId, dispatch, hasFetchedStorage])

  useEffect(() => {
    if (storage.storageUsed !== undefined) {
      setHasFetchedStorage(false)
    }
  }, [storage.storageUsed])

  // ### Files ###
  const fileData: FileData = useSelector(filesDataStateSelector)
  const {
    isLoadingFetch: isLoadingFetchFiles,
    hasErrorFetch: hasErrorFetchFiles,
  } = useSelector(filesStateSelector)

  // ### Error ###
  const isLoading = isLoadingFetchUser || isLoadingFetchFiles
  const hasError =
    hasErrorFetchUser || hasErrorFetchFiles || hasErrorFetchStorage || error

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

  const setPreviewUrlCallback = (url: string, fileId: number) => {
    setPreviewFile(url)
    setPreviewFileId(fileId)
  }

  const closePreviewModal = () => {
    setPreviewFile(null)
    setPreviewFileId(null)
  }

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
        <FilesTable
          userId={userId}
          files={files}
          handleChangeDrawerTab={handleChangeDrawerTab}
          handleDrawerOpen={handleDrawerOpen}
          toggleDrawer={toggleDrawer}
          setPreviewUrlCallback={setPreviewUrlCallback}
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
              totalSize={totalSize || 0}
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
        <PreviewModal
          userId={userId}
          open={!!previewFile}
          close={closePreviewModal}
          previewFileId={previewFileId || 0}
        >
          <FilePreview
            previewFileUrl={previewFile || ''}
            previewFileId={previewFileId || 0}
          />
        </PreviewModal>
      </Grid>
    )

  return null
}

export default Files
