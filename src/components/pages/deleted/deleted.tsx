import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import FilesTable from '../files/filesTable/FilesTable'
import type { FileData } from '../favorites/types'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'

function Deleted() {
  const {
    isDrawerOpen,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerOpen,
    handleDrawerClose,
    toggleDrawer,
  } = useDrawerDetails()

  const filesData: FileData[] = [
    {
      id: 1,
      name: 'Documents',
      size: '305 KB',
      date: '2012-12-14',
    },
    {
      id: 2,
      name: 'Photos',
      size: '452 KB',
      date: '2012-12-14',
    },
    {
      id: 3,
      name: 'Images',
      size: '262 KB',
      date: '2012-12-14',
    },
    {
      id: 4,
      name: 'Download',
      size: '159 KB',
      date: '2012-12-14',
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
      <Grid item py={1.5} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName="Deleted" />
        </Breadcrumbs>
      </Grid>
      <FilesTable
        filesData={filesData}
        isDelete={true}
        handleDrawerOpen={handleDrawerOpen}
        handleChangeDrawerTab={handleChangeDrawerTab}
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

export default Deleted
