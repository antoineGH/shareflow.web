import { SnakeCaseToCamelCase } from './utils'

export type TagApi = {
  id: number
  user_id: number
  file_id: number
  tag: string
}

export type Tag = SnakeCaseToCamelCase<TagApi>

export type GetTagsReturnType =
  | {
      tags: TagApi[]
      error?: never
    }
  | {
      tags?: never
      error: Error
    }

export type PostTagsReturnType =
  | {
      tag: TagApi
      error?: never
    }
  | {
      tag?: never
      error: Error
    }

export type DeleteTagReturnType =
  | {
      tagId: TagApi['id']
      error?: never
    }
  | {
      tagId?: never
      error: Error
    }
