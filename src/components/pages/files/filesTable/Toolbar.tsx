import MUIToolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material'
import MultiAction from './multiActions/MultiActions'
import { ListItemKey } from '../fileMenu/listItems'

type Props = {
  numSelected: number
  selectedMultiActions: ListItemKey[]
}

function Toolbar({ numSelected, selectedMultiActions }: Props) {
  const theme = useTheme()

  return (
    <MUIToolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        [theme.breakpoints.up('sm')]: {
          minHeight: '32px',
          height: '32px',
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
      {numSelected > 0 && (
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
            <MultiAction selectedMultiActions={selectedMultiActions} />
          </Grid>
        </Grid>
      )}
    </MUIToolbar>
  )
}

export default Toolbar
