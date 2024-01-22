import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import BreadcrumbsMUI from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import StyledSeparatorIcon from './StyledSeparatorIcon'

type Props = {
  userId: number
  openModalAddDocs(): void
}

function Breadcrumbs({ userId, openModalAddDocs }: Props) {
  const breadcrumbs = useBreadcrumbs({ userId, openModalAddDocs })

  return (
    <Grid item py={1.5} px={1.5}>
      <BreadcrumbsMUI
        separator={
          <StyledSeparatorIcon>
            <ArrowForwardIosIcon fontSize="small" />
          </StyledSeparatorIcon>
        }
        sx={{
          rowGap: '.5rem',
          pb: { xs: '.5rem', sm: '0rem' },
          '& .MuiBreadcrumbs-ol': { rowGap: '.7rem' },
          '& .MuiBreadcrumbs-li:first-child + .MuiBreadcrumbs-separator': {
            display: 'none',
          },
        }}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </BreadcrumbsMUI>
    </Grid>
  )
}

export default Breadcrumbs
