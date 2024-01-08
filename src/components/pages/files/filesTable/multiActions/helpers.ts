import listItems, {
  type ListItem,
  type ListItemKey,
} from '../../fileMenu/listItems'

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

export { getAvailableActions }
