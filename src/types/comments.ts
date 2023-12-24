import { SnakeCaseToCamelCase } from './utils'

export type CommentApi = {
  id: number
  user: {
    id: number
    name: string
  }
  file_id: number
  comment: string
  created_at: string
  updated_at: string
}

export type Comment = SnakeCaseToCamelCase<CommentApi>
