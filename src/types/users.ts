import { SnakeCaseToCamelCase } from './utils'

export type UserApi = {
  id: number
  full_name: string
  email: string
  avatar_url: string
  created_at: string
}

export type User = SnakeCaseToCamelCase<UserApi>
