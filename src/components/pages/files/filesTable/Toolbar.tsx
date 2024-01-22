import { useEffect, useState } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const numSelected = selected.length

  const { isWarning: isWarningStorage, isError: isErrorStorage } = useSelector(
    selectStorageWarningErrorSelector,
  )
  const { isLoadingFetch: isLoadingFetchStorage } =
    useSelector(storageStateSelector)

  useEffect(() => {
    if (!isLoadingFetchStorage) {
      setIsLoading(false)
    }
  }, [isLoadingFetchStorage])

  const alertMessage: AlertMessage = pickAlertMessage({
    isPageDelete,
    isWarningStorage,
    isErrorStorage,
  })

  return (
    <MUIToolbar
      sx={{
        mt: 0.5,
        '@media (min-width: 0px)': {
          p: 0,
          m: 0,
          pb: { xs: '.5rem', md: '0rem' },
          minHeight: '28px',
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
        }}
      >
        {numSelected > 0 ? (
          <>
            <Grid
              item
              sx={{
                minHeight: '36px',
                height: '36px',
                p: 0,
                m: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                pl: 2,
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  fontSize: '.8rem',
                }}
                color="inherit"
                variant="body1"
                component="div"
              >
                {numSelected} selected
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                pr: { xs: 1, sm: 4 },
                pl: { xs: 1, sm: 0 },
              }}
            >
              <MultiAction
                userId={userId}
                selected={selected}
                resetSelected={resetSelected}
                selectedMultiActions={selectedMultiActions}
              />
            </Grid>
          </>
        ) : (
          <Grid
            item
            sx={{
              width: '100%',
              minHeight: '36px',
              height: '36px',
              p: 0,
              m: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                sx={{
                  borderRadius: '3px',
                  height: '58px',
                  p: 0,
                  m: 0,
                }}
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
