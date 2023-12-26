import { useEffect, useState } from 'react'
import { removeDuplicates } from './helpers'
import type { Tag } from 'types/tags'

type HookReturnValue = {
  areSuggestionsOpen: boolean
  isLoading: boolean
  options: Tag[]
  selectedOptions: Tag | Record<string, never>
  onOpenSuggestions: () => void
  onCloseSuggestions: () => void
  onResetSuggestions: () => void
  onResetselectedOptions: () => void
  onSelectOption: (option: Tag) => void
}

type Props = {
  debounceSearch?: string
}

function useTags({ debounceSearch }: Props): HookReturnValue {
  const [selectedOptions, setselectedOptions] = useState<
    Tag | Record<string, never>
  >({})
  const [options, setOptions] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)

  const onResetSuggestions = () => setOptions([])

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: Tag) => {
    setselectedOptions(option)
    onCloseSuggestions()
  }

  const onResetselectedOptions = () => setselectedOptions({})

  const fetchData = async () => {
    if (!debounceSearch || (options && debounceSearch.length < 3)) return

    setIsLoading(true)
    // TODO: Replace with API call
    // const response = await getTags(debounceSearch)
    const response = {
      options: [
        {
          id: 1,
          userId: 101,
          fileId: 201,
          tag: 'tag1',
        },
        {
          id: 2,
          userId: 102,
          fileId: 202,
          tag: 'tag2',
        },
        {
          id: 3,
          userId: 103,
          fileId: 203,
          tag: 'tag3',
        },
      ],
    }
    setOptions(prev => [...prev, ...(response.options ?? [])])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  return {
    areSuggestionsOpen,
    isLoading,
    options: removeDuplicates(options),
    selectedOptions,
    onCloseSuggestions,
    onOpenSuggestions,
    onResetselectedOptions,
    onResetSuggestions,
    onSelectOption,
  }
}

export default useTags
