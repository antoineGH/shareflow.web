const DEFAULT_ERROR_MSG = 'An error has occurred. Please try again'

enum StatusMessages {
  BAD_REQUEST = 'An error has occurred. Please try again',
  ACCESS_DENIED = 'Access denied',
  NOT_FOUND = 'No result found',
  SERVER_ERROR = 'Server Error. We are currently fixing the problem. Please try again',
}

const getErrorStatusMessage = (status: number): string => {
  switch (status) {
    case 400:
      return StatusMessages.BAD_REQUEST
    case 403:
      return StatusMessages.ACCESS_DENIED
    case 404:
      return StatusMessages.NOT_FOUND
    case 500:
    case 503:
    case 504:
      return StatusMessages.SERVER_ERROR
    default:
      return ''
  }
}

class HttpResponseError extends Error {
  constructor(
    public code: number | null,
    message: string,
    public errors?: { parameter?: string; message: string }[],
  ) {
    super(message)
  }
}

const regexServerError = /^5\d{2}$/
const regexClientError = /^4\d{2}$/

function isErrorStatus(status: number): boolean {
  return (
    regexClientError.test(`${status}`) || regexServerError.test(`${status}`)
  )
}

export {
  getErrorStatusMessage,
  HttpResponseError,
  isErrorStatus,
  StatusMessages,
  DEFAULT_ERROR_MSG,
}
