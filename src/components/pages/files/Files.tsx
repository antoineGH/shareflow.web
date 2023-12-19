import Grid from '@mui/material/Grid'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import TextContainer from './filesUploadModal/filesUploadDragNDrop/TextContainer'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'
import useDrawerDetails from './drawerDetails/useDrawerDetails'
import FilesTable from './filesTable/FilesTable'
import DrawerDetails from './drawerDetails/DrawerDetails'
import type { FilesData } from './filesTable/types'
import CountFiles from './countFiles/CountFiles'
import { useParams } from 'react-router-dom'
import { extractRoutingParams } from './helpers'

function Files() {
  const params = useParams<{ path: string }>()

  const routingParams = extractRoutingParams(params)
  // TODO: use routingParams to fetch files in context from the API
  console.log('routingParams', routingParams)

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

  const filesData: FilesData = {
    files: [
      {
        id: 1,
        name: 'Documents',
        size: '305 KB',
        date: '2012-12-14',
        path: 'Documents',
      },
      {
        id: 2,
        name: 'Photos',
        size: '452 KB',
        date: '2012-12-14',
        path: 'Photos',
      },
      {
        id: 3,
        name: 'Images',
        size: '262 KB',
        date: '2012-12-14',
        path: 'Images',
      },
      {
        id: 4,
        name: 'Download',
        size: '159 KB',
        date: '2012-12-14',
        path: 'Download',
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
        filesData={files}
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
