import { ListItemKey } from '../fileMenu/listItems'
import type { FileData, Order } from './types'

function createData(id: number, name: string, size: string, modified: string) {
  return {
    id,
    name,
    size,
    modified,
  }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getPath(id: number, files: FileData[]) {
  return files.find(file => file.id === id)?.path
}

function getSelectedActions(
  selectedFilesId: number[],
  files: FileData[],
): ListItemKey[] {
  const selectedFiles = files.filter(file => selectedFilesId.includes(file.id))
  const actionsArrays = selectedFiles.map(file => file.action)
  if (!actionsArrays.length) return []
  const selectedAvailableActions = actionsArrays.reduce((common, actions) => {
    return common.filter(action => actions.includes(action))
  })

  return selectedAvailableActions
}

export {
  createData,
  descendingComparator,
  getComparator,
  stableSort,
  getPath,
  getSelectedActions,
}
