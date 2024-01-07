import { Breadcrumbs, Grid, Typography } from '@mui/material'
// eslint-disable-next-line import/no-unresolved
import ZenSVG from 'assets/zen.svg?react'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'

import { PageName } from './breadcrumbEntry/types'

type Props = {
  pageName: PageName
  emptyText?: string
}

function EmptyFiles({ emptyText = 'No files', pageName }: Props) {
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
          <ZenSVG style={{ width: '200px', height: '200px' }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize=".9rem">
            {emptyText}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EmptyFiles
