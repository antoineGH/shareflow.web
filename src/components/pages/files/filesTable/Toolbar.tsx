import { alpha, Skeleton, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import MUIToolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useSelector } from 'store/hooks'
import {
  selectStorageWarningErrorSelector,
  storageStateSelector,
} from 'store/settings/storage/selector'

import MultiAction from './multiActions/MultiActions'
import StyledAlert from './StyledAlert'
import { AlertMessage } from './types'
import { pickAlertMessage } from './utils'
import { ListItemKey } from '../fileMenu/listItems'

type Props = {
  userId: number
  selected: number[]
  resetSelected: () => void
  selectedMultiActions: ListItemKey[]
  isPageDelete?: boolean
}

function Toolbar({
  userId,
  selected,
  resetSelected,
  selectedMultiActions,
  isPageDelete,
}: Props) {
  const theme = useTheme()
  const numSelected = selected.length

  const { isWarning: isWarningStorage, isError: isErrorStorage } = useSelector(
    selectStorageWarningErrorSelector,
  )
  const { isLoadingFetch: isLoadingFetchStorage } =
    useSelector(storageStateSelector)

  const alertMessage: AlertMessage = pickAlertMessage({
    isPageDelete,
    isWarningStorage,
    isErrorStorage,
  })

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
          bgcolor: alpha(
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
                userId={userId}
                selected={selected}
                resetSelected={resetSelected}
                selectedMultiActions={selectedMultiActions}
              />
            </Grid>
          </>
        ) : (
          <Grid item sx={{ width: '100%' }}>
            {isLoadingFetchStorage ? (
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height="62px"
              />
            ) : (
              <StyledAlert severity={alertMessage.severity}>
                {alertMessage.message}
              </StyledAlert>
            )}
          </Grid>
        )}
      </Grid>
    </MUIToolbar>
  )
}

export default Toolbar
