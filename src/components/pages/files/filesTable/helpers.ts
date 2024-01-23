import type { FileT } from 'types/files'

import type { Order } from './types'
import { ListItemKey } from '../fileMenu/listItems'

function createData(id: number, name: string, size: number, updatedAt: string) {
  return {
    id,
    name,
    size,
    updatedAt,
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

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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

function getExistingPath(pathname: string) {
  const toExclude = ['auth', 'files', '']
  return pathname.split('/').filter(path => !toExclude.includes(path))
}

function getPath(id: number, pathname: string, files: FileT[]) {
  const existingPath = getExistingPath(pathname)
  const currentPath = files.find(file => file.id === id)?.id
  return [...existingPath, currentPath].join('/')
}

function getSelectedMultiActions(
  selectedFilesId: number[],
  files: FileT[],
): ListItemKey[] {
  const selectedFiles = files.filter(file => selectedFilesId.includes(file.id))
  const actionsArrays = selectedFiles.map(file => file.actions)
  if (!actionsArrays.length) return []
  const selectedAvailableActions = actionsArrays.reduce((common, actions) => {
    return common.filter(action => actions.includes(action))
  })

  return selectedAvailableActions
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

  if (diffHours < 1) return 'Last hour'
  if (diffHours < 24) return 'Today'

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Yesterday'

  const formattedDate = `${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')}/${String(
    date.getFullYear(),
  ).slice(-2)}`
  return formattedDate
}

export {
  createData,
  getComparator,
  stableSort,
  getPath,
  getSelectedMultiActions,
}
