import { useMemo } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'

import { downloadFiles } from 'api/files'
import { partialRemoveRestoreFiles, removeFiles } from 'store/files/actions'
import { useDispatch } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'

import ButtonToolBar from './ButtonToolBar'
import listItems, {
  type ListItem,
  type ListItemKey,
} from '../../fileMenu/listItems'

type Props = {
  userId: number
  selectedMultiActions: ListItemKey[]
  selected: number[]
  resetSelected: () => void
}

function MultiAction({
  userId,
  selectedMultiActions,
  selected,
  resetSelected,
}: Props) {
  const dispatch = useDispatch()
  const multipleActions = useMemo(() => {
    const result: ListItem[] = []

    selectedMultiActions.forEach(action => {
      const matchingItem = listItems.find(item => item.id === action)
      if (matchingItem) {
        result.push(matchingItem)
      }
    })

    return result
  }, [selectedMultiActions])

  const handleClickMultiDownload = () => {
    if (!selected.length) return

    let messageSuccess =
      selected.length === 1 ? 'File downloaded' : 'Files downloaded'
    const messageError =
      selected.length === 1
        ? 'Error downloading file'
        : 'Error downloading files'

    downloadFiles({
      userId,
      fileIds: selected,
      cb: () => {
        resetSelected()
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: 'success',
            message: messageSuccess,
          }),
        )
      },
      cbError: () => {
        dispatch(
          openSnackbar({
            isOpen: true,
            severity: 'error',
            message: messageError,
          }),
        )
      },
    })
  }

  const handleClickMultiDelete = () => {
    dispatch(
      partialRemoveRestoreFiles({
        userId,
        filesToRestoreIds: selected,
        updates: { isDeleted: true },
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'Files removed',
            }),
          )
          resetSelected()
        },
      }),
    )
  }

  const handleClickMultiRestore = () => {
    dispatch(
      partialRemoveRestoreFiles({
        userId,
        filesToRestoreIds: selected,
        updates: { isDeleted: false },
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'Files restored',
            }),
          )
          resetSelected()
        },
      }),
    )
  }

  const handleClickMultiRemove = () => {
    dispatch(
      removeFiles({
        userId,
        filesToDeleteIds: selected,
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: 'Files removed',
            }),
          )
          resetSelected()
        },
      }),
    )
  }

  const actionMap = {
    download: handleClickMultiDownload,
    delete: handleClickMultiDelete,
    remove: handleClickMultiRemove,
    restore: handleClickMultiRestore,
  }

  const handleClickMulti = (action: string) => {
    actionMap[action]?.(selected)
  }

  return multipleActions.length > 0 ? (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
      gap={0.3}
    >
      {selectedMultiActions.map(action => (
        <Grid item key={action}>
          <ButtonToolBar
            label={listItems.find(item => item.id === action)?.label || ''}
            icon={
              listItems.find(item => item.id === action)?.icon || <DeleteIcon />
            }
            handleClickMulti={() => handleClickMulti(action)}
          />
        </Grid>
      ))}
    </Grid>
  ) : null
}

export default MultiAction
