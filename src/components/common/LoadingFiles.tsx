import { Breadcrumbs, Grid, useTheme } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'

import { PageName } from './breadcrumbEntry/types'

type Props = {
  pageName: PageName
}

function LoadingFiles({ pageName }: Props) {
  const theme = useTheme()
  return (
    <Grid container sx={{ height: 'calc(100% - 42px)', mt: '42px' }}>
      <Grid item px={1.5} pt={2} pb={1} xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName={pageName} />
        </Breadcrumbs>
      </Grid>
      <Grid
        container
        sx={{
          height: 'calc(100vh - 800px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Grid item>
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoadingFiles
