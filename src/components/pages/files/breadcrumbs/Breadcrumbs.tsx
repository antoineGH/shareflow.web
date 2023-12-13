import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import BreadcrumbsMUI from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import StyledSeparatorIcon from './StyledSeparatorIcon'

type Props = {
  openModalAddDocs(): void
}

function Breadcrumbs({ openModalAddDocs }: Props) {
  const breadcrumbs = useBreadcrumbs({ openModalAddDocs })

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
