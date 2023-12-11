import { useState, useMemo } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRowMUI from '@mui/material/TableRow'

import TableRow from './TableRow'
import TableHead from './TableHead'
import { createData, stableSort, getComparator } from './helpers'

import type { Data, Order } from './types'

const rows = [
  createData(1, 'Documents', '305 KB', '2012-12-14'),
  createData(2, 'Photos', '452 KB', '2012-12-14'),
  createData(3, 'Images', '262 KB', '2012-12-14'),
  createData(4, 'Download', '159 KB', '2012-12-14'),
]

type Props = {
  handleDrawerOpen: () => void
}

function FilesTable({ handleDrawerOpen }: Props) {
  const [selected, setSelected] = useState<readonly number[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [page, setPage] = useState(0)

  const rowsPerPage = 20

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  )

  return (
    <>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id)
              const labelId = `enhanced-table-checkbox-${index}`
              return (
                <TableRow
                  key={row.id}
                  row={row}
                  isItemSelected={isItemSelected}
                  labelId={labelId}
                  handleClick={handleClick}
                  handleDrawerOpen={handleDrawerOpen}
                />
              )
            })}
            {emptyRows > 0 && (
              <TableRowMUI
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRowMUI>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length >= 19 && (
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </>
  )
}

export default FilesTable
