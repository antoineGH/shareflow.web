import { useState, type MouseEvent, useMemo } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import GradeIcon from '@mui/icons-material/Grade'
import Menu from './Menu'
import { useTheme } from '@mui/material'
import { getAvailableActions } from './helpers'
import type { ListItem } from './listItems'
import type { FileData } from '../filesTable/types'

type Props = {
  id: number
  filesData: FileData[]
  isFavorite?: boolean
  isDelete?: boolean
  isHovered?: boolean
  toggleDrawer: () => void
  handleDrawerOpen: () => void
  onFavoriteClick: (id: number) => void
  handleChangeDrawerTab: (tab: number) => void
}

function FileMenu({
  id,
  filesData,
  isFavorite,
  isDelete,
  isHovered,
  toggleDrawer,
  handleDrawerOpen,
  onFavoriteClick,
  handleChangeDrawerTab,
}: Props) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const shouldDisplayFavoriteButton = !isFavorite && !isDelete && isHovered

  const actions: ListItem['id'][] = useMemo(() => {
    const result = filesData.find(file => file.id === id)?.action || []
    return result
  }, [filesData, id])

  const filteredAction = getAvailableActions(actions)

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
    toggleDrawer()
  }

  const handleClickComment = (e: MouseEvent<HTMLButtonElement>) => {
    handleDrawerOpen()
    handleChangeDrawerTab(1)
    closeMenu(e)
  }

  const handleClickTag = (e: MouseEvent<HTMLButtonElement>) => {
    handleDrawerOpen()
    handleChangeDrawerTab(2)
    closeMenu(e)
  }

  const handleClickRename = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked Rename')
    closeMenu(e)
  }

  const handleClickDownload = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked Download')
    closeMenu(e)
  }

  const handleClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked Delete')
    closeMenu(e)
  }

  const handleClickRestore = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked Restore')
    console.log(e)
    closeMenu(e)
  }

  const handleClickRemove = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked Remove')
    closeMenu(e)
  }

  const actionMap = {
    comments: handleClickComment,
    tags: handleClickTag,
    rename: handleClickRename,
    download: handleClickDownload,
    delete: handleClickDelete,
    restore: handleClickRestore,
    remove: handleClickRemove,
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
      {filteredAction.length > 0 && (
        <>
          <IconButton size="small" sx={{ mr: 3 }} onClick={openMenu}>
            <MoreHorizIcon sx={{ color: theme.palette.secondary.light }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            actions={filteredAction}
            closeMenu={closeMenu}
            handleClickMore={handleClickMore}
          />
        </>
      )}
    </>
  )
}
export default FileMenu
