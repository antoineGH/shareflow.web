import { useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRowMUI from '@mui/material/TableRow'
import { create } from 'domain'
import { useLocation } from 'react-router-dom'

import { partialUpdateFile } from 'store/files/actions'
import { useDispatch } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import type { File, RowFile } from 'types/files'

import {
  createData,
  getComparator,
  getSelectedMultiActions,
  stableSort,
} from './helpers'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Toolbar from './Toolbar'
import type { Order } from './types'

type Props = {
  userId: number
  files: File[]
  isPageFavorite?: boolean
  isPageTag?: boolean
  isPageDelete?: boolean
  toggleDrawer: (fileId: number) => void
  handleDrawerOpen: (fileId: number) => void
  handleChangeDrawerTab: (tab: number) => void
}

function FilesTable({
  userId,
  files,
  isPageFavorite,
  isPageTag,
  isPageDelete,
  toggleDrawer,
  handleDrawerOpen,
  handleChangeDrawerTab,
}: Props) {
  const [selected, setSelected] = useState<number[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof RowFile>('name')
  const [page, setPage] = useState(0)

  const location = useLocation()
  const dispatch = useDispatch()

  const isFavoritePage = location.pathname === '/auth/favorites'
  const rowsPerPage = 20

  const rows: RowFile[] = files.map(file =>
    createData(file.id, file.name, file.size, file.updatedAt),
  )

  const filteredSelectedActions = useMemo(() => {
    const filteredActions = ['comments', 'tags']
    const result = files.map(file => ({
      ...file,
      actions: file.actions.filter(action => !filteredActions.includes(action)),
    }))
    return result
  }, [files])

  const selectedMultiActions = getSelectedMultiActions(
    selected,
    filteredSelectedActions,
  )

  const onCheckBoxClick = (id: number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: number[] = []

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

  const onFavoriteClick = (id: number, fileFavState: boolean) => {
    const message = fileFavState
      ? 'File removed from favorites'
      : 'File added to favorites'
    dispatch(
      partialUpdateFile({
        userId,
        fileId: id,
        updates: { isFavorite: !fileFavState },
        isFavoritePage,
        cb: () => {
          dispatch(
            openSnackbar({
              isOpen: true,
              severity: 'success',
              message: message,
            }),
          )
        },
      }),
    )
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
    property: keyof RowFile,
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

  const visibleRows: RowFile[] = useMemo(
    () =>
      stableSort<RowFile>(
        rows,
        getComparator<keyof RowFile>(order, orderBy),
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rows],
  )

  return (
    // <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        {isPageFavorite || isPageTag ? null : (
          <Toolbar
            selectedMultiActions={selectedMultiActions}
            selected={selected}
            isPageDelete={isPageDelete}
          />
        )}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isPageFavorite={isPageFavorite}
              isPageTag={isPageTag}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    key={row.id}
                    row={row}
                    files={files}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    isPageFavorite={isPageFavorite}
                    isPageTag={isPageTag}
                    isPageDelete={isPageDelete}
                    onCheckBoxClick={onCheckBoxClick}
                    onFavoriteClick={onFavoriteClick}
                    handleChangeDrawerTab={handleChangeDrawerTab}
                    handleDrawerOpen={handleDrawerOpen}
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
      </Paper>
    </Box>
  )
}

export default FilesTable
