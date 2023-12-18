export type Data = {
  id: number
  name: string
  size: string
  modified: string
}

export type Order = 'asc' | 'desc'

export type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export type EnhancedTableProps = {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  isFavorite?: boolean
  isDelete?: boolean
}

export type FileData = {
  readonly id: number
  readonly name: string
  readonly size: string
  readonly date: string
}

export type FilesData = {
  readonly files: FileData[]
  countFiles: number
  countFolders: number
  totalSize: string
}
