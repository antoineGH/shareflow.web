import type {
  GetStorageReturnType,
  Settings,
  SettingsApi,
} from 'types/settings'
import { convertObjectKeys, formatURL } from './utils'
import { GET_STORAGE } from './urls'
import { HttpResponseError } from 'helpers/errors'
import { rest } from 'helpers/rest'

const errGetStorageMsg =
  'An error occurred while getting storage. Please try again'

async function getStorage(userId: number, signal?: AbortSignal) {
  Promise<GetStorageReturnType>
  try {
    // TODO: replace with proper URL and update status code
    // const url = formatURL(`${GET_STORAGE}`, { userId })
    const url = 'http://localhost:5000/settings'

    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetStorageMsg,
      )
    }

    const { object } = res

    const storage = object?.map(storage =>
      convertObjectKeys<SettingsApi['storage'], Settings['storage']>(storage),
    )

    return { storage }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getStorage }
