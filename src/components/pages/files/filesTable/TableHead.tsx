import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TableHeadMUI from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import type { EnhancedTableProps, Data, HeadCell } from './types'

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 'modified',
    numeric: true,
    disablePadding: false,
    label: 'Modified',
  },
]

function TableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  isPageFavorite,
}: EnhancedTableProps) {
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHeadMUI>
      <TableRow>
        <TableCell padding="checkbox">
          {isPageFavorite ? null : (
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          )}
        </TableCell>
        {headCells.slice(0, -2).map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropUpIcon}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right" colSpan={2}>
          <Stack direction="row" justifyContent="flex-end" gap={3}>
            {headCells.slice(-2).map(headCell => (
              <div key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  IconComponent={ArrowDropUpIcon}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </div>
            ))}
          </Stack>
        </TableCell>
      </TableRow>
    </TableHeadMUI>
  )
}

export default TableHead
