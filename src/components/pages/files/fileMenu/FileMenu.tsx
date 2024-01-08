import { type MouseEvent, useMemo, useState } from 'react'

import GradeIcon from '@mui/icons-material/Grade'
import InfoIcon from '@mui/icons-material/Info'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import { partialRemoveFile, removeFile } from 'store/files/actions'
import { useDispatch, useSelector } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import { selectUserSelector } from 'store/user/selector'
import { File } from 'types/files'

import { getAvailableActions } from './helpers'
import type { ListItem, ListItemKey } from './listItems'
import Menu from './Menu'

type Props = {
  id: number
  files: File[]
  isPageFavorite?: boolean
  isPageTag?: boolean
  isPageDelete?: boolean
  isHovered?: boolean
  toggleDrawer: (fileId: number) => void
  handleDrawerOpen: (fileId: number) => void
  onFavoriteClick: (id: number, fileFavState: boolean) => void
  handleChangeDrawerTab: (tab: number) => void
}

function FileMenu({
  id,
  files,
  isPageFavorite,
  isPageTag,
  isPageDelete,
  isHovered,
  toggleDrawer,
  handleDrawerOpen,
  onFavoriteClick,
  handleChangeDrawerTab,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const dispatch = useDispatch()
  const user = useSelector(selectUserSelector)
  const shouldDisplayFavoriteButton =
    !isPageFavorite && !isPageTag && !isPageDelete && isHovered

  const actions: ListItem['id'][] = useMemo(() => {
    const result = files.find(file => file.id === id)?.actions || []
    return result
  }, [files, id])

  const isFavorite = files.find(file => file.id === id)?.isFavorite || false
  const isDelete = files.find(file => file.id === id)?.isDeleted || false
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
    onFavoriteClick(id, isFavorite)
  }

  const handleClickDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleChangeDrawerTab(0)
    toggleDrawer(id)
  }

  const handleClickComment = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    handleDrawerOpen(id)
    handleChangeDrawerTab(1)
    closeMenu(e)
  }

  const handleClickTag = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    handleDrawerOpen(id)
    handleChangeDrawerTab(2)
    closeMenu(e)
  }

  const handleClickRename = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    console.log('Clicked Rename')
    closeMenu(e)
  }

  const handleClickDownload = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    console.log('Clicked Download')
    closeMenu(e)
  }

  const handleClickDelete = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    if (typeof id === 'number') {
      dispatch(
        partialRemoveFile({
          userId: user!.id,
          fileId: id,
          updates: { isDeleted: !isDelete },
          cb: () => {
            dispatch(
              openSnackbar({
                isOpen: true,
                severity: 'success',
                message: isDelete ? 'File restored' : 'File deleted',
              }),
            )
          },
        }),
      )
      closeMenu(e)
    }
    // TODO: handle multi delete here

    closeMenu(e)
  }

  const handleClickRestore = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    if (typeof id === 'number') {
      dispatch(
        partialRemoveFile({
          userId: user!.id,
          fileId: id,
          updates: { isDeleted: !isDelete },
          cb: () => {
            dispatch(
              openSnackbar({
                isOpen: true,
                severity: 'success',
                message: isDelete ? 'File restored' : 'File deleted',
              }),
              closeMenu(e),
            )
          },
        }),
      )
    }
    // TODO: handle multi restore here
    closeMenu(e)
  }

  const handleClickRemove = (
    e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLLIElement>,
  ) => {
    if (typeof id === 'number') {
      dispatch(
        removeFile({
          userId: user!.id,
          fileToDeleteId: id,
          cb: () => {
            dispatch(
              openSnackbar({
                isOpen: true,
                severity: 'success',
                message: 'File permanantly deleted',
              }),
              closeMenu(e),
            )
          },
        }),
      )
    }
    // TODO: handle multi remove here
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

  const handleClickMore = (
    e: MouseEvent<HTMLLIElement>,
    clickedAction: ListItemKey,
  ) => {
    e.stopPropagation()
    actionMap[clickedAction]?.(e)
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
      {isPageTag ? null : (
        <>
          <IconButton size="small" onClick={e => handleClickDetails(e)}>
            <InfoIcon sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
          {filteredAction.length > 0 && (
            <>
              <IconButton size="small" sx={{ mr: 3 }} onClick={openMenu}>
                <MoreHorizIcon
                  sx={{ color: theme.palette.primary.contrastText }}
                />
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
      )}
    </>
  )
}
export default FileMenu
