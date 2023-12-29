import { SnakeCaseToCamelCase } from './utils'

export type CommentApi = {
  id: number
  user_id: number
  file_id: number
  comment: string
  created_at: string
  updated_at: string
}

export type Comment = SnakeCaseToCamelCase<CommentApi>

export type GetCommentReturnType =
  | {
      comments: Comment[]
      error?: never
    }
  | {
      comments?: never
      error: Error
    }

export type PostCommentReturnType =
  | {
      comment: Comment
      error?: never
    }
  | {
      comment?: never
      error: Error
    }

export type DeleteCommentReturnType =
  | {
      commentId: Comment['id']
      error?: never
    }
  | {
      commentId?: never
      error: Error
    }
