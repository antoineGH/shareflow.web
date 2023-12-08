type ClassNameObj = Record<string, boolean>
type ClassNameToCompute = string | ClassNameObj

/**
 * define a tag classes
 * @param  {x args as string | ClassNameObj} args classes as string or object with a class name as key and its display condition as value
 * @return {string}      string of classnames
 */

export function generateClassNames(...args: ClassNameToCompute[]) {
  if (!Array.isArray(args)) return ''

  return args.reduce((acc: string, current: ClassNameToCompute) => {
    if (!current) return acc

    if (typeof current === 'string') return `${acc} ${current}`

    if (typeof current === 'object' && !Array.isArray(current)) {
      const objClassnames: string[] = []
      Object.entries(current).forEach(([key, value]) => {
        if (value) objClassnames.push(key)
      })

      return `${acc} ${objClassnames.join(' ')}`
    }

    return acc.trim()
  }, '')
}
