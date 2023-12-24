import { SnakeCaseToCamelCase } from './utils'

export type TagApi = {
  id: number
  user_id: number
  file_id: number
  tag: string
}

export type Tag = SnakeCaseToCamelCase<TagApi>
