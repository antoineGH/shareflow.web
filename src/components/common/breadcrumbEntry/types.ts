export type PageName =
  | 'Files'
  | 'Favorites'
  | 'Tags'
  | 'Settings'
  | 'Deleted'
  | 'Not Found'

type BreadcrumbLabels =
  | 'All Files'
  | 'My Favorites'
  | 'My Tags'
  | 'My Settings'
  | 'My Deleted files'

export type BreadcrumbPageName = Exclude<PageName, 'Not Found'>

export type BreadcrumbsLabelIcon = {
  [key in BreadcrumbPageName]: {
    label: BreadcrumbLabels
    icon: JSX.Element
  }
}
