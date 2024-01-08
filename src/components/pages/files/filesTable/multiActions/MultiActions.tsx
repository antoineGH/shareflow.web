import { useMemo } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'

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
}

function MultiAction({ userId, selectedMultiActions, selected }: Props) {
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
    console.log('Selected Ids: ', selected)
    console.log('Clicked Download Multi')
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
