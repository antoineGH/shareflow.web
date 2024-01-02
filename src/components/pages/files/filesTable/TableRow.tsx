import { useState, type MouseEvent } from 'react'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FolderIcon from '@mui/icons-material/Folder'
import TableRowMUI from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import FileMenu from '../fileMenu/FileMenu'
import GradeIcon from '@mui/icons-material/Grade'
import { getPath } from './helpers'
import { useNavigate } from 'react-router-dom'
import type { File } from 'types/files'
import { useTheme } from '@mui/material'

type Props = {
  row: {
    id: number
    name: string
    size: string
    modified: string
  }
  files: File[]
  isItemSelected: boolean
  labelId: string
  isPageFavorite?: boolean
  isPageDelete?: boolean
  onCheckBoxClick: (id: number) => void
  onFavoriteClick: (id: number) => void
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: (fileId: number) => void
  toggleDrawer: (fileId: number) => void
}

function TableRow({
  row,
  files,
  isItemSelected,
  labelId,
  isPageFavorite,
  isPageDelete,
  onCheckBoxClick,
  onFavoriteClick,
  handleChangeDrawerTab,
  handleDrawerOpen,
  toggleDrawer,
}: Props) {
  const navigate = useNavigate()
  const theme = useTheme()

  const [isHovered, setIsHovered] = useState(false)

  const isFavorite = files.find(file => file.id === row.id)?.isFavorite || false

  const handleCheckBoxClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onCheckBoxClick(row.id)
  }

  const handleClickFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavoriteClick(row.id)
  }

  const handleClickRow = (e: MouseEvent<HTMLTableRowElement>) => {
    e.stopPropagation()

    if (isPageDelete) return handleDrawerOpen(row.id)

    const path = getPath(row.id, files)
    if (path) return navigate(`/auth/files/${path}`)
  }

  return (
    <TableRowMUI
      hover
      onClick={e => handleClickRow(e)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          {isPageFavorite ? (
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
          <FolderIcon color="secondary" fontSize="medium" />
          {row.name}
        </Stack>
      </TableCell>

      <TableCell align="right" colSpan={2}>
        <Stack direction="row" justifyContent="flex-end" gap={4} mr={3}>
          <Stack direction="row" alignItems="center" gap={2}>
            <FileMenu
              id={row.id}
              files={files}
              isPageFavorite={isPageFavorite}
              isPageDelete={isPageDelete}
              isHovered={isHovered}
              toggleDrawer={toggleDrawer}
              handleDrawerOpen={handleDrawerOpen}
              onFavoriteClick={onFavoriteClick}
              handleChangeDrawerTab={handleChangeDrawerTab}
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
