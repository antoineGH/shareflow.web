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
    const url = formatURL(`${GET_STORAGE}`, { userId })

    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetStorageMsg,
      )
    }
    const { object } = res

    const storage = convertObjectKeys<
      SettingsApi['storage'],
      Settings['storage']
    >(object.storage)

    return { storage }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getStorage }
