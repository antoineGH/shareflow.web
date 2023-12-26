import type { MouseEvent, ChangeEvent } from 'react'
import type { File } from 'types/files'

export type Data = Omit<File, 'path' | 'action' | 'isFavorite'>

export type Order = 'asc' | 'desc'

export type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export type EnhancedTableProps = {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  isPageFavorite?: boolean
  isPageDelete?: boolean
}
