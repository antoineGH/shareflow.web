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

async function getActivities(userId: number) {
  Promise<GetActivitiesReturnType>
  try {
    // TODO: replace with proper URL and update status code
    const url = 'http://localhost:5000/activities'
    // const url = formatURL(`${GET_ACTIVITIES}`, { userId })
    const res = await rest.get({ url })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetActivitiesMsg,
      )
    }

    const { object } = res

    const activities = object?.map(activity =>
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
  newActivity: Omit<Activity, 'id'>,
) {
  Promise<PostActivitiesReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${POST_ACTIVITY}`, { userId })
    const url = 'http://localhost:5000/activities'

    const body = JSON.stringify(newActivity)

    const res = await rest.post({ url, body })

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
