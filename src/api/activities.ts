import { GET_ACTIVITIES, POST_ACTIVITY } from './urls'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'
import { convertObjectKeys, formatURL } from './utils'
import type {
  Activity,
  ActivityApi,
  GetActivitiesReturnType,
  PostActivitiesReturnType,
} from 'types/activities'

const errGetActivitiesMsg =
  'An error occurred while getting activities. Please try again'

async function getActivities(
  userId: number,
  fileId: number,
  signal?: AbortSignal,
) {
  Promise<GetActivitiesReturnType>
  try {
    const url = formatURL(`${GET_ACTIVITIES}`, { userId, fileId })
    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetActivitiesMsg,
      )
    }

    const { object } = res

    const activities: Activity[] = object?.map(activity =>
      convertObjectKeys<ActivityApi, Activity>(activity),
    )

    return { activities }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPostActivitiesMsg =
  'An error occurred while creating activity. Please try again'

async function postActivities(
  userId: number,
  fileId: number,
  newActivity: Omit<
    Activity,
    'id' | 'createdAt' | 'updatedAt' | 'userId' | 'fileId'
  >,
  signal?: AbortSignal,
) {
  Promise<PostActivitiesReturnType>
  try {
    const url = formatURL(`${POST_ACTIVITY}`, { userId, fileId })

    const body = JSON.stringify(newActivity)

    const res = await rest.post({ url, body, signal })

    if (res?.response?.status !== 201) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errPostActivitiesMsg,
      )
    }

    const { object } = res
    const activity = convertObjectKeys<ActivityApi, Activity>(object)
    return { activity }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getActivities, postActivities }
