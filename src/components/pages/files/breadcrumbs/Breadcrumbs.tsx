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
    <Grid item py={1} px={2}>
      <BreadcrumbsMUI
        separator={
          <StyledSeparatorIcon>
            <ArrowForwardIosIcon fontSize="small" />
          </StyledSeparatorIcon>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </BreadcrumbsMUI>
    </Grid>
  )
}

export default Breadcrumbs
