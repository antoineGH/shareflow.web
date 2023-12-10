import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import FolderIcon from '@mui/icons-material/Folder'
import TableRowMUI from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import FileMenu from '../fileMenu/FileMenu'

type Props = {
  row: {
    id: number
    name: string
    size: string
    modified: string
  }
  isItemSelected: boolean
  labelId: string
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void
}

function TableRow({ row, isItemSelected, labelId, handleClick }: Props) {
  return (
    <TableRowMUI
      hover
      onClick={event => handleClick(event, row.id)}
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
          <Checkbox
            color="primary"
            size="small"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
          <FolderIcon color="secondary" fontSize="medium" />
          {row.name}
        </Stack>
      </TableCell>

      <TableCell align="right" colSpan={2}>
        <Stack direction="row" justifyContent="flex-end" gap={4} mr={3}>
          <Stack direction="row" alignItems="center" gap={2}>
            <FileMenu />
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
