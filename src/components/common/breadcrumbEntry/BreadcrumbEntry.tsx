import { useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import breadcrumbsLabelIcon from './breadcrumbLabelIcon'
import StyledIcon from './StyledIcon'
import type { BreadcrumbPageName, PageName } from './types'

type Props = {
  pageName: PageName
}

function BreadcrumbEntry({ pageName }: Props) {
  const theme = useTheme()
  const { label, icon } = breadcrumbsLabelIcon[pageName as BreadcrumbPageName]

  const isFilesPage = pageName === 'Files'
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        pl: isFilesPage && isSmallScreen ? '0rem' : '1rem',
      }}
    >
      <Grid item>
        <StyledIcon
          sx={{
            marginTop: '.25rem',
          }}
        >
          {icon}
        </StyledIcon>
      </Grid>
      <Grid item>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            marginTop: '.25rem',
            lineHeight: pageName === 'Files' ? '1.5rem' : '1.4rem',
            color: theme.palette.secondary.contrastText,
          }}
        >
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default BreadcrumbEntry
