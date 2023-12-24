import type { Tag } from 'types/tags'

type ClassNameObj = Record<string, boolean>
type ClassNameToCompute = string | ClassNameObj

function generateClassNames(...args: ClassNameToCompute[]) {
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

function removeDuplicates(array: Tag[]): Tag[] {
  return array.filter(
    (value, index, self) => self.findIndex(v => v.id === value.id) === index,
  )
}

export { generateClassNames, removeDuplicates }
