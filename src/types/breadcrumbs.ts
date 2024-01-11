import { SnakeCaseToCamelCase } from './utils'

export type BreadcrumbApi = {
  id: number
  name: string
  path?: string
  is_folder?: boolean
}

export type Breadcrumb = SnakeCaseToCamelCase<BreadcrumbApi>

export type GetBreadcrumbsReturnType =
  | {
      breadcrumbs: Breadcrumb[]
      error?: never
    }
  | {
      breadcrumbs?: never
      error: Error
    }
