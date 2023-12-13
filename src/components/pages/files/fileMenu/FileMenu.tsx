import { useState, type MouseEvent } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import GradeIcon from '@mui/icons-material/Grade'
import Menu from './Menu'
import { useTheme } from '@mui/material'
import { e } from 'vitest/dist/reporters-LLiOBu3g'

type Props = {
  id: number
  isFavorite?: boolean
  isDelete?: boolean
  isHovered?: boolean
  onFavoriteClick: (id: number) => void
  handleDrawerOpen: () => void
  handleChangeDrawerTab: (tab: number) => void
}

function FileMenu({
  id,
  isFavorite,
  isDelete,
  isHovered,
  onFavoriteClick,
  handleDrawerOpen,
  handleChangeDrawerTab,
}: Props) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const shouldDisplayFavoriteButton = !isFavorite && !isDelete && isHovered

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const handleClickFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavoriteClick(id)
  }

  const handleClickDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleChangeDrawerTab(0)
    handleDrawerOpen()
  }

  const handleClickComment = e => {
    handleDrawerOpen()
    handleChangeDrawerTab(1)
    closeMenu(e)
  }

  const handleClickTag = e => {
    handleDrawerOpen()
    handleChangeDrawerTab(2)
    closeMenu(e)
  }

  const handleClickRename = e => {
    console.log('Clicked Rename')
    closeMenu(e)
  }

  const handleClickDownload = e => {
    console.log('Clicked Download')
    closeMenu(e)
  }

  const handleClickDelete = e => {
    console.log('Clicked Delete')
    closeMenu(e)
  }

  const actionMap = {
    comments: handleClickComment,
    tags: handleClickTag,
    rename: handleClickRename,
    download: handleClickDownload,
    delete: handleClickDelete,
  }

  const handleClickMore = (e: MouseEvent<HTMLLIElement>, id: string) => {
    e.stopPropagation()
    actionMap[id]?.(e)
  }

  return (
    <>
      {shouldDisplayFavoriteButton && (
        <IconButton size="small" onClick={e => handleClickFavorite(e)}>
          <GradeIcon sx={{ color: theme.palette.secondary.light }} />
        </IconButton>
      )}
      <IconButton size="small" onClick={e => handleClickDetails(e)}>
        <InfoIcon sx={{ color: theme.palette.secondary.light }} />
      </IconButton>
      <IconButton size="small" sx={{ mr: 3 }} onClick={openMenu}>
        <MoreHorizIcon sx={{ color: theme.palette.secondary.light }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        closeMenu={closeMenu}
        handleClickMore={handleClickMore}
      />
    </>
  )
}
export default FileMenu
