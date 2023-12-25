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

export type GetCommentReturnType =
  | {
      comments: CommentApi[]
      error?: never
    }
  | {
      comments?: never
      error: Error
    }

export type PostCommentReturnType =
  | {
      comment: CommentApi
      error?: never
    }
  | {
      comment?: never
      error: Error
    }

export type DeleteCommentReturnType =
  | {
      commentId: CommentApi['id']
      error?: never
    }
  | {
      commentId?: never
      error: Error
    }
