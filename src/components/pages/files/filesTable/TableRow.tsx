import { type MouseEvent, useState } from 'react'

import GradeIcon from '@mui/icons-material/Grade'
import { Box, Typography, useTheme } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRowMUI from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import TagsTableCell from 'components/pages/tags/tagsTableCell/TagsTableCell'
import type { FileT, RowFile } from 'types/files'

import { formatDate, getPath } from './helpers'
import RenameFileForm from './RenameFileForm'
import { getRowIcon, StyledIcon } from './utils'
import FileMenu from '../fileMenu/FileMenu'
import { getSizeFile } from '../helpers'

type Props = {
  userId: number
  row: RowFile
  files: FileT[]
  isItemSelected: boolean
  labelId: string
  isPageFavorite?: boolean
  isPageTag?: boolean
  isPageDelete?: boolean
  onCheckBoxClick: (id: number) => void
  onFavoriteClick: (id: number, fileFavState: boolean) => void
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: (fileId: number) => void
  toggleDrawer: (fileId: number) => void
}

function TableRow({
  userId,
  row,
  files,
  isItemSelected,
  labelId,
  isPageFavorite,
  isPageTag,
  isPageDelete,
  onCheckBoxClick,
  onFavoriteClick,
  handleChangeDrawerTab,
  handleDrawerOpen,
  toggleDrawer,
}: Props) {
  const navigate = useNavigate()
  const theme = useTheme()

  const [rowIdRename, setRowIdRename] = useState<number | null>(null)

  const resetRowIdRename = () => setRowIdRename(null)

  const isFavorite = files.find(file => file.id === row.id)?.isFavorite || false
  const isFolder = files.find(file => file.id === row.id)?.isFolder || false
  const isNotClickable = rowIdRename === row.id || !isFolder

  const handleCheckBoxClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCheckBoxClick(row.id)
  }

  const handleClickFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavoriteClick(row.id, isFavorite)
  }

  const handleClickRow = (e: MouseEvent<HTMLTableRowElement>) => {
    e.stopPropagation()

    if (isPageDelete) return handleDrawerOpen(row.id)

    const path = getPath(row.id, files)
    if (path) return navigate(`/auth/files/${path}`)
  }

  const renameRow = () => {
    setRowIdRename(row.id)
  }

  return (
    <ClickAwayListener onClickAway={resetRowIdRename}>
      <TableRowMUI
        hover
        onClick={isNotClickable ? () => {} : e => handleClickRow(e)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
        sx={{
          cursor: isNotClickable ? 'default' : 'pointer',
          height: '67px',
        }}
      >
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="checkbox"
          align="left"
          colSpan={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ minWidth: '250px' }}
          >
            {isPageFavorite || isPageTag ? (
              <IconButton onClick={event => handleClickFavorite(event)}>
                <GradeIcon
                  sx={{
                    color: isFavorite
                      ? 'gold'
                      : theme.palette.primary.contrastText,
                  }}
                />
              </IconButton>
            ) : (
              <Checkbox
                color="primary"
                size="small"
                checked={isItemSelected}
                onClick={event => handleCheckBoxClick(event)}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
            )}
            <StyledIcon>{getRowIcon(isFolder, row.name, theme)}</StyledIcon>
            {rowIdRename === row.id ? (
              <RenameFileForm
                userId={userId}
                id={row.id}
                name={row.name}
                resetRowIdRename={resetRowIdRename}
              />
            ) : (
              <Typography
                variant="body1"
                fontWeight={isFolder ? 'bold' : 'normal'}
                sx={{
                  fontSize: '.8rem',
                }}
              >
                {row.name}
              </Typography>
            )}
          </Stack>
        </TableCell>
        <TableCell align="right" colSpan={1}>
          <Stack direction="row" justifyContent="flex-end" gap={4} mr={3}>
            {isPageTag && (
              <Stack direction="row" alignItems="center" gap={2}>
                <TagsTableCell />
              </Stack>
            )}
            <Stack direction="row" alignItems="center" gap={2}>
              <FileMenu
                userId={userId}
                id={row.id}
                files={files}
                isPageFavorite={isPageFavorite}
                isPageTag={isPageTag}
                isPageDelete={isPageDelete}
                toggleDrawer={toggleDrawer}
                handleDrawerOpen={handleDrawerOpen}
                onFavoriteClick={onFavoriteClick}
                handleChangeDrawerTab={handleChangeDrawerTab}
                renameRow={renameRow}
              />
              <Box sx={{ minWidth: '50px' }} justifyContent="flex-end">
                {getSizeFile(row.size)}
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ minWidth: '55px' }}
            >
              {formatDate(row.updatedAt)}
            </Stack>
          </Stack>
        </TableCell>
      </TableRowMUI>
    </ClickAwayListener>
  )
}

export default TableRow
