import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FolderIcon from '@mui/icons-material/Folder'
import TableRowMUI from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import FileMenu from '../fileMenu/FileMenu'
import GradeIcon from '@mui/icons-material/Grade'
import type { MouseEvent } from 'react'

type Props = {
  row: {
    id: number
    name: string
    size: string
    modified: string
  }
  isItemSelected: boolean
  labelId: string
  isFavorite?: boolean
  onRowClick: (id: number) => void
  onFavoriteClick: (id: number) => void
  handleDrawerOpen: () => void
}

function TableRow({
  row,
  isItemSelected,
  labelId,
  isFavorite,
  onRowClick,
  onFavoriteClick,
  handleDrawerOpen,
}: Props) {
  const handleClickRow = (e: MouseEvent<HTMLTableRowElement>) => {
    e.stopPropagation()
    onRowClick(row.id)
  }

  const handleClickFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavoriteClick(row.id)
  }

  return (
    <TableRowMUI
      hover
      onClick={event => handleClickRow(event)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="checkbox"
        align="left"
        colSpan={2}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {isFavorite ? (
            <IconButton onClick={event => handleClickFavorite(event)}>
              <GradeIcon />
            </IconButton>
          ) : (
            <Checkbox
              color="primary"
              size="small"
              checked={isItemSelected}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          )}
          <FolderIcon color="secondary" fontSize="medium" />
          {row.name}
        </Stack>
      </TableCell>

      <TableCell align="right" colSpan={2}>
        <Stack direction="row" justifyContent="flex-end" gap={4} mr={3}>
          <Stack direction="row" alignItems="center" gap={2}>
            <FileMenu
              id={row.id}
              isFavorite={isFavorite}
              handleDrawerOpen={handleDrawerOpen}
              onFavoriteClick={onFavoriteClick}
            />
            {row.size}
          </Stack>
          <Stack direction="row" alignItems="center">
            {row.modified}
          </Stack>
        </Stack>
      </TableCell>
    </TableRowMUI>
  )
}

export default TableRow
