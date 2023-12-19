import type { ListItem, ListItemKey } from './listItems'
import listItems from './listItems'
import type ActionTypes from './types'

const handleClickFavorite = ({
  e,
  id,
  onFavoriteClick,
}: ActionTypes.HandleClickFavorite) => {
  e.stopPropagation()
  onFavoriteClick(id)
}

const handleClickDetails = ({
  e,
  handleChangeDrawerTab,
  toggleDrawer,
}: ActionTypes.HandleClickDetails) => {
  e.stopPropagation()
  handleChangeDrawerTab(0)
  toggleDrawer()
}

const handleClickComment = ({
  e,
  handleChangeDrawerTab,
  handleDrawerOpen,
  closeMenu,
}: ActionTypes.HandleClickComment) => {
  handleDrawerOpen()
  handleChangeDrawerTab(1)
  closeMenu(e)
}

const handleClickTag = ({
  e,
  handleChangeDrawerTab,
  handleDrawerOpen,
  closeMenu,
}: ActionTypes.HandleClickTag) => {
  handleDrawerOpen()
  handleChangeDrawerTab(2)
  closeMenu(e)
}

const handleClickRename = ({ e, closeMenu }: ActionTypes.HandleClickRename) => {
  console.log('Clicked Rename')
  closeMenu(e)
}

const handleClickDownload = ({
  e,
  closeMenu,
}: ActionTypes.HandleClickDownload) => {
  console.log('Clicked Download')
  closeMenu(e)
}

const handleClickDelete = ({ e, closeMenu }: ActionTypes.HandleClickDelete) => {
  console.log('Clicked Delete')
  closeMenu(e)
}

const handleClickRestore = ({
  e,
  closeMenu,
}: ActionTypes.HandleClickRestore) => {
  console.log('Clicked Restore')
  console.log(e)
  closeMenu(e)
}

const handleClickRemove = ({ e, closeMenu }: ActionTypes.HandleClickRemove) => {
  console.log('Clicked Remove')
  closeMenu(e)
}

function setActiveActions(actions: ListItemKey[]) {
  const availableActions = listItems.map(action => {
    if (actions.includes(action.id)) {
      return { ...action, active: true }
    }
    return action
  })
  return availableActions
}

function getAvailableActions(actions: ListItemKey[]): ListItem[] {
  const availableActions = setActiveActions(actions)
  return availableActions.filter(({ active }) => active)
}

export {
  getAvailableActions,
  handleClickFavorite,
  handleClickDetails,
  handleClickComment,
  handleClickTag,
  handleClickRename,
  handleClickDownload,
  handleClickDelete,
  handleClickRestore,
  handleClickRemove,
}
