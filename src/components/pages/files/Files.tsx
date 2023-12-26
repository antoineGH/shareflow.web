import Grid from '@mui/material/Grid'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import TextContainer from './filesUploadModal/filesUploadDragNDrop/TextContainer'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'
import useDrawerDetails from './drawerDetails/useDrawerDetails'
import FilesTable from './filesTable/FilesTable'
import DrawerDetails from './drawerDetails/DrawerDetails'
import CountFiles from './countFiles/CountFiles'
import { useParams } from 'react-router-dom'
import { extractRoutingParams } from './helpers'
import { FileData } from 'types/files'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'store/hooks'

function Files() {
  const params = useParams<{ path: string }>()

  // TODO: use routingParams to fetch files in context from the API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routingParams = extractRoutingParams(params)

  // TODO: TESTING ONLY - TO REMOVE
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(fetchFiles({ userId: 1 }))
  }, [])

  // const myFiles = useSelector(selectFilesSelector)
  // console.log('myFiles', myFiles)

  const {
    droppedFiles,
    isModalAddDocumentsOpen,
    closeModalAddDocs,
    openModalAddDocs,
  } = useAddDocumentsDropZone({ disabled: false })

  const {
    isDrawerOpen,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerClose,
    handleDrawerOpen,
    toggleDrawer,
  } = useDrawerDetails()

  const filesData: FileData = {
    files: [
      {
        id: 1,
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
        activeDrawerTab={activeDrawerTab}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerClose={handleDrawerClose}
      />
      <DocumentsUploadModal
        open={isModalAddDocumentsOpen}
        close={closeModalAddDocs}
        droppedFiles={droppedFiles}
      />
    </Grid>
  )
}

export default Files
