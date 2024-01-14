import type { ChangeEvent, MouseEvent } from 'react'

import type { RowFile } from 'types/files'

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

export type AlertMessage = {
  severity: 'info' | 'warning' | 'error'
  message: string
}

type AlertKey =
  | 'warningStorage'
  | 'errorStorage'
  | 'isPageDelete'
  | 'isPageUpload'

export type AlertMessages = Record<AlertKey, AlertMessage>
