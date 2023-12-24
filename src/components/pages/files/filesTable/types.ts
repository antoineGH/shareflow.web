import type { MouseEvent, ChangeEvent } from 'react'
import type { FileApi } from 'types/files'

export type Data = Omit<FileApi, 'path' | 'action'>

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
  isFavorite?: boolean
  isDelete?: boolean
}
