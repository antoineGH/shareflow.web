import type {
  GetUserReturnType,
  PutUserReturnType,
  User,
  UserApi,
} from 'types/users'
import { convertObjectKeys, formatURL } from './utils'
import { GET_USER, PUT_USER } from './urls'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'

const errGetUserMsg = 'An error occurred while getting user. Please try again'

async function getUser(userId: number, signal?: AbortSignal) {
  Promise<GetUserReturnType>
  try {
    // TODO: replace with proper URL and status code
    // const url = formatURL(`${GET_USER}`, { userId })
    const url = 'http://localhost:5000/users/1'

    const res = await rest.get({ url, signal })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(res?.response?.status ?? null, errGetUserMsg)
    }

    const { object } = res
    const user = convertObjectKeys<UserApi, User>(object)
    return { user }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPutUserMsg = 'An error occurred while updating user. Please try again'

async function putUser(userId: number, newUser: Omit<User, 'id'>) {
  Promise<PutUserReturnType>
  try {
    // TODO: replace with proper URL and status code
    // const url = formatURL(`${PUT_USER}`, { userId })
    const url = 'http://localhost:5000/users'

    const body = JSON.stringify(newUser)
    const res = await rest.put({ url, body })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(res?.response?.status ?? null, errPutUserMsg)
    }

    const { object } = res
    const user = convertObjectKeys<UserApi, User>(object)
    return { user }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { getUser, putUser }
