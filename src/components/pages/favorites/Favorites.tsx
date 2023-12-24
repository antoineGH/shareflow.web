import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import FilesTable from '../files/filesTable/FilesTable'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import type { FileData } from 'types/files'

function Favorites() {
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
        isFavorite={true}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerOpen={handleDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <DrawerDetails
        open={isDrawerOpen}
        activeDrawerTab={activeDrawerTab}
        handleChangeDrawerTab={handleChangeDrawerTab}
        handleDrawerClose={handleDrawerClose}
      />
    </Grid>
  )
}

export default Favorites
