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

import type { Data, FileData, Order } from './types'

type Props = {
  filesData: FileData[]
  isFavorite?: boolean
  isDelete?: boolean
  toggleDrawer: () => void
  handleChangeDrawerTab: (tab: number) => void
}

function FilesTable({
  filesData,
  isFavorite,
  isDelete,
  toggleDrawer,
  handleChangeDrawerTab,
}: Props) {
  const [selected, setSelected] = useState<readonly number[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [page, setPage] = useState(0)

  const rowsPerPage = 20

  const rows = filesData.map(file =>
    createData(file.id, file.name, file.size, file.date),
  )

  const onCheckBoxClick = (id: number) => {
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

  const onFavoriteClick = (id: number) => {
    console.log('onFavoriteClick', id)
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
    [order, orderBy, page, rows],
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
            isFavorite={isFavorite}
            isDelete={isDelete}
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
                  isFavorite={isFavorite}
                  isDelete={isDelete}
                  onCheckBoxClick={onCheckBoxClick}
                  onFavoriteClick={onFavoriteClick}
                  handleChangeDrawerTab={handleChangeDrawerTab}
                  toggleDrawer={toggleDrawer}
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
