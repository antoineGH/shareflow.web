import { useState, type MouseEvent } from 'react'
import { useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import FolderIcon from '@mui/icons-material/Folder'
import TableRowMUI from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import FileMenu from '../fileMenu/FileMenu'
import GradeIcon from '@mui/icons-material/Grade'
import { getPath } from './helpers'
import type { FileData } from './types'
import { useNavigate } from 'react-router-dom'

type Props = {
  row: {
    id: number
    name: string
    size: string
    modified: string
  }
  filesData: FileData[]
  isItemSelected: boolean
  labelId: string
  isFavorite?: boolean
  isDelete?: boolean
  onCheckBoxClick: (id: number) => void
  onFavoriteClick: (id: number) => void
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: () => void
  toggleDrawer: () => void
}

function TableRow({
  row,
  filesData,
  isItemSelected,
  labelId,
  isFavorite,
  isDelete,
  onCheckBoxClick,
  onFavoriteClick,
  handleChangeDrawerTab,
  handleDrawerOpen,
  toggleDrawer,
}: Props) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

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

    if (isDelete) return handleDrawerOpen()

    const path = getPath(row.id, filesData)
    if (path) return navigate(`/${path}`)
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
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          ml={isDelete ? 2 : 0}
        >
          {isDelete ? null : isFavorite ? (
            <IconButton onClick={event => handleClickFavorite(event)}>
              <GradeIcon sx={{ color: theme.palette.secondary.light }} />
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
              filesData={filesData}
              isFavorite={isFavorite}
              isDelete={isDelete}
              isHovered={isHovered}
              toggleDrawer={toggleDrawer}
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
