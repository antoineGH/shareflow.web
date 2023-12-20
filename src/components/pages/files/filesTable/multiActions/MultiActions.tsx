import DeleteIcon from '@mui/icons-material/Delete'
import Grid from '@mui/material/Grid'
import Button from '../multiActions/Button'
import type { ListItemKey } from '../../fileMenu/listItems'
import listItems, { type ListItem } from '../../fileMenu/listItems'
import { useMemo } from 'react'

type Props = {
  selectedMultiActions: ListItemKey[]
}

function MultiAction({ selectedMultiActions }: Props) {
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
          <Button
            label={listItems.find(item => item.id === action)?.label || ''}
            icon={
              listItems.find(item => item.id === action)?.icon || <DeleteIcon />
            }
          />
        </Grid>
      ))}
    </Grid>
  ) : null
}

export default MultiAction
