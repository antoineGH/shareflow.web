import BreadcrumbsMUI from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'

type Props = {
  openModalAddDocs(): void
}

function Breadcrumbs({ openModalAddDocs }: Props) {
  const breadcrumbs = useBreadcrumbs({ openModalAddDocs })

  return (
    <Grid item py={2}>
      <BreadcrumbsMUI
        separator={<ArrowForwardIosIcon color="primary" fontSize="medium" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </BreadcrumbsMUI>
    </Grid>
  )
}

export default Breadcrumbs
