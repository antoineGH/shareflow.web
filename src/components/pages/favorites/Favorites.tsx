import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import FilesTable from '../files/filesTable/FilesTable'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import type { FileData } from '../files/filesTable/types'

function Favorites() {
  const {
    isDrawerOpen,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerClose,
    handleDrawerOpen,
    toggleDrawer,
  } = useDrawerDetails()

  const filesData: FileData[] = [
    {
      id: 1,
      name: 'Documents',
      size: '305 KB',
      date: '2012-12-14',
      path: 'Documents',
      action: [],
    },
    {
      id: 2,
      name: 'Photos',
      size: '452 KB',
      date: '2012-12-14',
      path: 'Photos',
      action: [],
    },
    {
      id: 3,
      name: 'Images',
      size: '262 KB',
      date: '2012-12-14',
      path: 'Images',
      action: [],
    },
    {
      id: 4,
      name: 'Download',
      size: '159 KB',
      date: '2012-12-14',
      path: 'Download',
      action: [],
    },
  ]

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
        filesData={filesData}
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
