import type { ChangeEvent, MouseEvent } from 'react'

import type { File, RowFile } from 'types/files'

export type Data = Omit<File, 'path' | 'action' | 'isFavorite'>

export type Order = 'asc' | 'desc'

export type HeadCell = {
  disablePadding: boolean
  id: keyof RowFile
  label: string
  numeric: boolean
}

export type EnhancedTableProps = {
  numSelected: number
  onRequestSort: (event: MouseEvent<unknown>, property: keyof RowFile) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  isPageFavorite?: boolean
  isPageTag?: boolean
  isPageDelete?: boolean
}
