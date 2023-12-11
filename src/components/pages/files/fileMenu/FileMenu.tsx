import { useState, type MouseEvent } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import Menu from './Menu'

type Props = {
  handleDrawerOpen: () => void
}

function FileMenu({ handleDrawerOpen }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const handleClickDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('Clicked Details')
    handleDrawerOpen()
    closeMenu()
  }

  const handleClickComment = () => {
    console.log('Clicked Comment')
    handleDrawerOpen()
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
