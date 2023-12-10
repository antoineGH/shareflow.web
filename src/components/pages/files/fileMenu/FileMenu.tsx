import { useState, type MouseEvent } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import Menu from './Menu'

function FileMenu() {
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
  }

  const handleClickComment = () => {
    console.log('Clicked Comment')
  }

  const handleClickRename = () => {
    console.log('Clicked Rename')
  }

  const handleClickDownload = () => {
    console.log('Clicked Download')
  }

  const handleClickDelete = () => {
    console.log('Clicked Delete')
  }

  const actionMap = {
    comment: handleClickComment,
    rename: handleClickRename,
    download: handleClickDownload,
    delete: handleClickDelete,
  }

  const handleClickMore = (e: MouseEvent<HTMLLIElement>, id: string) => {
    e.stopPropagation()
    actionMap[id]()
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
