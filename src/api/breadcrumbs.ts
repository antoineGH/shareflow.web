import { HttpResponseError } from 'helpers/errors'
import { rest } from 'helpers/rest'
import type {
  Breadcrumb,
  BreadcrumbApi,
  GetBreadcrumbsReturnType,
} from 'types/breadcrumbs'

import { GET_BREADCRUMBS } from './urls'
import { convertObjectKeys, formatURL, generateUrlParams } from './utils'

const errGetBreacrumbsMsg =
  'An error occurred while getting breadcrumbs. Please try again'

async function fetchBreadcrumbs(
  userId: number,
  folderIds: number[],
  signal?: AbortSignal,
): Promise<GetBreadcrumbsReturnType> {
  try {
    let queries = generateUrlParams({})

    if (folderIds && folderIds.length > 0) {
      queries += 'folderIds=' + folderIds.join(',')
    }

    const baseUrl = formatURL(`${GET_BREADCRUMBS}`, { userId })
    const url = `${baseUrl}?${queries}`

    const res = await rest.get({ url, signal })
    if (res?.response?.status !== 200) {
      throw new HttpResponseError(
        res?.response?.status ?? null,
        errGetBreacrumbsMsg,
      )
    }

    const { object } = res
    const breadcrumbs = convertObjectKeys<BreadcrumbApi[], Breadcrumb[]>(object)

    return { breadcrumbs }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export { fetchBreadcrumbs }
