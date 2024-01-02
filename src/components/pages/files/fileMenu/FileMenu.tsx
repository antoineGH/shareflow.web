import { useState, type MouseEvent, useMemo } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import GradeIcon from '@mui/icons-material/Grade'
import Menu from './Menu'
import { useTheme } from '@mui/material'
import { getAvailableActions } from './helpers'
import type { ListItem } from './listItems'
import { File } from 'types/files'

type Props = {
  id: number
  files: File[]
  isPageFavorite?: boolean
  isPageDelete?: boolean
  isHovered?: boolean
  toggleDrawer: (fileId: number) => void
  handleDrawerOpen: (fileId: number) => void
  onFavoriteClick: (id: number) => void
  handleChangeDrawerTab: (tab: number) => void
}

function FileMenu({
  id,
  files,
  isPageFavorite,
  isPageDelete,
  isHovered,
  toggleDrawer,
  handleDrawerOpen,
  onFavoriteClick,
  handleChangeDrawerTab,
}: Props) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const shouldDisplayFavoriteButton =
    !isPageFavorite && !isPageDelete && isHovered

  const actions: ListItem['id'][] = useMemo(() => {
    const result = files.find(file => file.id === id)?.action || []
    return result
  }, [files, id])

  const isFavorite = files.find(file => file.id === id)?.isFavorite || false
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
    toggleDrawer(id)
  }

  const handleClickComment = (e: MouseEvent<HTMLButtonElement>) => {
    handleDrawerOpen(id)
    handleChangeDrawerTab(1)
    closeMenu(e)
  }

  const handleClickTag = (e: MouseEvent<HTMLButtonElement>) => {
    handleDrawerOpen(id)
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
          <GradeIcon
            sx={{
              color: isFavorite ? 'gold' : theme.palette.secondary.light,
            }}
          />
        </IconButton>
      )}
      <IconButton size="small" onClick={e => handleClickDetails(e)}>
        <InfoIcon sx={{ color: theme.palette.primary.contrastText }} />
      </IconButton>
      {filteredAction.length > 0 && (
        <>
          <IconButton size="small" sx={{ mr: 3 }} onClick={openMenu}>
            <MoreHorizIcon sx={{ color: theme.palette.primary.contrastText }} />
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
