import MUIToolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material'
import MultiAction from './multiActions/MultiActions'
import { ListItemKey } from '../fileMenu/listItems'
import StyledAlert from './StyledAlert'

type Props = {
  selected: number[]
  selectedMultiActions: ListItemKey[]
}

function Toolbar({ selected, selectedMultiActions }: Props) {
  const theme = useTheme()
  const numSelected = selected.length

  return (
    <MUIToolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        mt: 0.5,
        [theme.breakpoints.up('sm')]: {
          minHeight: '36px',
          height: '36px',
          paddingLeft: '16px',
        },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 3,
        }}
      >
        {numSelected > 0 ? (
          <>
            <Grid item>
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="body1"
                component="div"
              >
                {numSelected} selected
              </Typography>
            </Grid>
            <Grid item>
              <MultiAction
                selected={selected}
                selectedMultiActions={selectedMultiActions}
              />
            </Grid>
          </>
        ) : (
          <Grid item sx={{ width: '100%' }}>
            <StyledAlert severity="info">
              Save, organize, and tidy up your files effortlessly in shareFlow
            </StyledAlert>
          </Grid>
        )}
      </Grid>
    </MUIToolbar>
  )
}

export default Toolbar
