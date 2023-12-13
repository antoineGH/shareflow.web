import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import GradeIcon from '@mui/icons-material/Grade'
import FilesTable from '../files/filesTable/FilesTable'
import DrawerDetails from '../files/drawerDetails/DrawerDetails'
import useDrawerDetails from '../files/drawerDetails/useDrawerDetails'
import type { FileData } from './types'

function Favorites() {
  const {
    isDrawerOpen,
    activeDrawerTab,
    handleChangeDrawerTab,
    handleDrawerOpen,
    handleDrawerClose,
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
      <Grid item py={1} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Grid
            container
            sx={{ display: 'flex', flexDirection: 'row' }}
            mt={0.5}
          >
            <Grid item>
              <GradeIcon sx={{ mr: 1 }} fontSize="inherit" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ lineHeight: 'inherit' }}>
                My Favorites
              </Typography>
            </Grid>
          </Grid>
        </Breadcrumbs>
      </Grid>
      <FilesTable
        filesData={filesData}
        isFavorite={true}
        handleDrawerOpen={handleDrawerOpen}
        handleChangeDrawerTab={handleChangeDrawerTab}
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
