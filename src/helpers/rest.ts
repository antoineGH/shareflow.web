/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponseError, isErrorStatus } from './errors'

type RESTParams = {
  url: string
  body?: any
  customHeaders?: {
    [key: string]: string
  }
  signal?: AbortSignal
}

const blobHeaderAuthorized = [
  'text/csv; charset=UTF-8',
  'application/pdf',
  'application/xlsx',
  'application/xml',
]

const handle =
  method =>
  async ({
    url,
    body = null,
    customHeaders,
    signal = undefined,
  }: RESTParams) => {
    const methodUpperCased = method.toUpperCase()
    let responseStatus: number | null = null

    try {
      const headers = customHeaders || {
        'Content-Type': 'application/json',
      }
      const response = await fetch(url, {
        body,
        credentials: 'include',
        method: methodUpperCased,
        headers,
        signal,
      })
      responseStatus = response?.status
      let object: any = null
      let blob: Blob | null = null

      if (
        response &&
        (response?.statusText === 'No Content' || response.status === 204)
      ) {
        return { response, object, blob }
      }

      const contentType = headers['Content-Type']
      if (blobHeaderAuthorized.some(h => h === contentType)) {
        blob = await response.blob()
      }

      if (contentType === 'application/json') object = await response.json()

      const isStatusError =
        (response.status && isErrorStatus(response.status)) ?? false

      if (object?.errors && isStatusError) {
        const errorMsg =
          object.errors[0]?.message || 'An error has occurred. Please try again'

        throw new HttpResponseError(response.status, errorMsg, object?.errors)
      }

      return { response, object, blob }
    } catch (e) {
      throw new HttpResponseError(responseStatus, e.message)
    }
  }

export const rest = {
  get: handle('get'),
  patch: handle('patch'),
  post: handle('post'),
  put: handle('put'),
  delete: handle('delete'),
}
