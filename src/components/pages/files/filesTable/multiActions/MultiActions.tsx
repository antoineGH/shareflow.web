import { useMemo } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'
import ButtonToolBar from './ButtonToolBar'
import {
  handleClickMultiDelete,
  handleClickMultiDownload,
  handleClickMultiRemove,
  handleClickMultiRestore,
} from './helpers'
import type { ListItemKey } from '../../fileMenu/listItems'
import listItems, { type ListItem } from '../../fileMenu/listItems'

type Props = {
  selectedMultiActions: ListItemKey[]
  selected: number[]
}

function MultiAction({ selectedMultiActions, selected }: Props) {
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
