import { Breadcrumbs, Grid, Typography } from '@mui/material'
// eslint-disable-next-line import/no-unresolved
import ZenSVG from 'assets/zen.svg?react'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'

import { PageName } from './breadcrumbEntry/types'

type Props = {
  pageName: PageName
  emptyText?: string
  hasHeader?: boolean
}

function EmptyFiles({
  emptyText = 'No files',
  pageName,
  hasHeader = true,
}: Props) {
  return (
    <Grid container sx={{ height: 'calc(100vh - 1000px)' }}>
      {hasHeader && (
        <Grid item px={1.5} pt={2} pb={1} xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <BreadcrumbEntry pageName={pageName} />
          </Breadcrumbs>
        </Grid>
      )}
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Grid item mt={10}>
          <ZenSVG style={{ width: '160px', height: '160px' }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize=".85rem">
            {emptyText}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EmptyFiles
