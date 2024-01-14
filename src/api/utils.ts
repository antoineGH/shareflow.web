import camelCase from 'lodash/camelCase'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'
import snakeCase from 'lodash/snakeCase'
import qs from 'query-string'

function generateUrlParams<T extends object>(params: T): string {
  const formattedParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== 0 && !value && typeof value !== 'boolean') return acc

    return { ...acc, [snakeCase(key)]: value }
  }, {})

  return qs.stringify(formattedParams, { arrayFormat: 'bracket' })
}

function formatPath(
  baseURL: string,
  argsToReplace?: Record<string, string | number>,
): string {
  let path = baseURL

  if (argsToReplace && !isEmpty(argsToReplace)) {
    Object.entries(argsToReplace).forEach(([key, value]) => {
      const formattedKey = `{${key}}`
      path = path.replace(formattedKey, value.toString())
    })
  }

  return path
}

function formatURL(
  baseURL: string,
  argsToReplace?: Record<string, string | number>,
): string {
  const path = formatPath(baseURL, argsToReplace)
  return path
}

type ConversionFormat = 'snakeCase' | 'camelCase'
type Formatter = Record<ConversionFormat, (s: string) => string>

const formatter: Formatter = {
  camelCase,
  snakeCase,
}

function convertObjectKeys<T extends object, U extends object>(
  obj: T,
  format: ConversionFormat = 'camelCase',
): U {
  const result = {} as U

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = formatter[format]?.(key)
    if (!newKey) throw new Error(`Unsupported format: ${format}`)

    let newValue = value
    if (isPlainObject(value)) newValue = convertObjectKeys(value, format)
    if (value && Array.isArray(value)) {
      newValue = value.map(v =>
        isPlainObject(v) ? convertObjectKeys(v, format) : v,
      )
    }

    result[newKey] = newValue
  })

  return result
}

export { formatURL, generateUrlParams, convertObjectKeys }
