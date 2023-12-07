import Grid from '@mui/material/Grid'
import Breadcrumbs from './breadcrumbs/Breadcrumbs'
import TextContainer from './filesUploadModal/filesUploadDragNDrop/TextContainer'
import DocumentsUploadModal from './filesUploadModal/FilesUploadModal'
import useAddDocumentsDropZone from './filesUploadModal/filesUploadDragNDrop/useAddDocumentsDropZone'

function Files() {
  const {
    droppedFiles,
    isModalAddDocumentsOpen,
    closeModalAddDocs,
    openModalAddDocs,
  } = useAddDocumentsDropZone({ disabled: false })

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        height: 'calc(100vh - 42px)',
        width: '100%',
        p: 0,
        m: 0,
        mt: '42px',
      }}
    >
      <Breadcrumbs openModalAddDocs={openModalAddDocs} />
      <TextContainer />
      <DocumentsUploadModal
        open={isModalAddDocumentsOpen}
        close={closeModalAddDocs}
        droppedFiles={droppedFiles}
      />
    </Grid>
  )
}

export default Files
