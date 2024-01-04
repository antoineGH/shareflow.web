import type {
  GetUserReturnType,
  PutUserReturnType,
  User,
  UserApi,
} from 'types/users'
import { convertObjectKeys, formatURL } from './utils'
import { GET_USER, PATCH_USER, POST_AUTH, PUT_USER } from './urls'
import { rest } from 'helpers/rest'
import { HttpResponseError } from 'helpers/errors'

const errGetUserMsg = 'An error occurred while getting user. Please try again'

async function getUser(userId: number, signal?: AbortSignal) {
  Promise<GetUserReturnType>
  try {
    const url = formatURL(`${GET_USER}`, { userId })

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

async function putUser(
  userId: number,
  newUser: Omit<User, 'id' | 'createdAt'>,
  signal?: AbortSignal,
) {
  Promise<PutUserReturnType>
  try {
    const url = formatURL(`${PUT_USER}`, { userId })
    const newUserApi: Omit<UserApi, 'id' | 'created_at'> = {
      full_name: newUser.fullName,
      email: newUser.email,
    }

    const body = JSON.stringify(newUserApi)
    const res = await rest.put({ url, body, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(res?.response?.status ?? null, errPutUserMsg)
    }

    return { userId }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errPatchUserMsg =
  'An error occurred while updating user. Please try again'

async function patchUser(
  userId: number,
  password: string,
  signal?: AbortSignal,
) {
  Promise<PutUserReturnType>
  try {
    const url = formatURL(`${PATCH_USER}`, { userId })

    const body = JSON.stringify({ password: password })
    const res = await rest.patch({ url, body, signal })

    if (res?.response?.status !== 204) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errPatchUserMsg,
      )
    }

    return { userId }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

const errLoginMsg = 'An error occurred while logging in. Please try again'

async function postLogin(email: string, password: string): Promise<boolean> {
  const url = POST_AUTH
  const body = JSON.stringify({ email, password })

  try {
    const res = await rest.post({ url, body })

    if (res?.response?.status !== 200) {
      throw new HttpResponseError(res?.response?.status ?? null, errLoginMsg)
    }

    const token = res.object

    if (!token) throw new Error('No token received')

    localStorage.setItem('token', token)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export { getUser, putUser, patchUser, postLogin }
