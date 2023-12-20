import listItems, {
  type ListItemKey,
  type ListItem,
} from '../../fileMenu/listItems'

const handleClickMultiDownload = (selected: number[]) => {
  console.log('Selected Ids: ', selected)
  console.log('Clicked Download Multi')
}

const handleClickMultiDelete = (selected: number[]) => {
  console.log('Selected Ids: ', selected)
  console.log('Clicked Delete Multi')
}

const handleClickMultiRestore = (selected: number[]) => {
  console.log('Selected Ids: ', selected)
  console.log('Clicked Restore Multi')
}

const handleClickMultiRemove = (selected: number[]) => {
  console.log('Selected Ids: ', selected)
  console.log('Clicked Remove Multi')
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
  handleClickMultiDownload,
  handleClickMultiDelete,
  handleClickMultiRestore,
  handleClickMultiRemove,
}
