import { SnakeCaseToCamelCase } from './utils'

export type ActivityApi = {
  id: number
  user_id: number
  file_id: number
  activity: string
  created_at: string
  updated_at: string
}

export type Activity = SnakeCaseToCamelCase<ActivityApi>

export type GetActivitiesReturnType =
  | {
      activities: ActivityApi[]
      error?: never
    }
  | {
      activities?: never
      error: Error
    }

export type PostActivitiesReturnType =
  | {
      activity: ActivityApi
      error?: never
    }
  | {
      activity?: never
      error: Error
    }
