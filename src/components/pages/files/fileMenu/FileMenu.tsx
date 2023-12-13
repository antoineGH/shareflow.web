import { useState, type MouseEvent } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import GradeIcon from '@mui/icons-material/Grade'
import Menu from './Menu'

type Props = {
  id: number
  isFavorite?: boolean
  onFavoriteClick: (id: number) => void
  handleDrawerOpen: () => void
  handleChangeDrawerTab: (tab: number) => void
}

function FileMenu({
  id,
  isFavorite,
  onFavoriteClick,
  handleDrawerOpen,
  handleChangeDrawerTab,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
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

  const handleClickComment = () => {
    handleDrawerOpen()
    handleChangeDrawerTab(1)
    closeMenu()
  }

  const handleClickTag = () => {
    handleDrawerOpen()
    handleChangeDrawerTab(2)
    closeMenu()
  }

  const handleClickRename = () => {
    console.log('Clicked Rename')
    closeMenu()
  }

  const handleClickDownload = () => {
    console.log('Clicked Download')
    closeMenu()
  }

  const handleClickDelete = () => {
    console.log('Clicked Delete')
    closeMenu()
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
    actionMap[id]?.()
  }

  return (
    <>
      {isFavorite ? null : (
        <IconButton size="small" onClick={e => handleClickFavorite(e)}>
          <GradeIcon color="disabled" />
        </IconButton>
      )}
      <IconButton size="small" onClick={e => handleClickDetails(e)}>
        <InfoIcon color="disabled" />
      </IconButton>
      <IconButton size="small" sx={{ mr: 3 }} onClick={openMenu}>
        <MoreHorizIcon color="disabled" />
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
