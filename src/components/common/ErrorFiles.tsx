import { Breadcrumbs, Grid, Typography } from '@mui/material'
// eslint-disable-next-line import/no-unresolved
import ServerDownSVG from 'assets/server_down.svg?react'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'

import { PageName } from './breadcrumbEntry/types'

type Props = {
  pageName: PageName
  errorText?: string
}

function ErrorFiles({
  pageName,
  errorText = 'An error occured, please try again',
}: Props) {
  return (
    <Grid container sx={{ height: 'calc(100vh - 800px)', mt: '42px' }}>
      <Grid item px={1.5} pt={2} pb={1} xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <BreadcrumbEntry pageName={pageName} />
        </Breadcrumbs>
      </Grid>
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
          <ServerDownSVG style={{ width: '310px', height: '310px' }} />
        </Grid>
        <Grid item>
          <Typography variant="body1" fontSize=".9rem">
            {errorText}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ErrorFiles
