import { useEffect, useState } from 'react'
import { removeDuplicates } from './helpers'
import type { TagData } from './types'

type HookReturnValue = {
  areSuggestionsOpen: boolean
  isLoading: boolean
  options: TagData[]
  selectedOptions: TagData | Record<string, never>
  onOpenSuggestions: () => void
  onCloseSuggestions: () => void
  onResetSuggestions: () => void
  onResetselectedOptions: () => void
  onSelectOption: (option: TagData) => void
}

type Props = {
  debounceSearch?: string
}

function useTags({ debounceSearch }: Props): HookReturnValue {
  const [selectedOptions, setselectedOptions] = useState<
    TagData | Record<string, never>
  >({})
  const [options, setOptions] = useState<TagData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)

  const onResetSuggestions = () => setOptions([])

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: TagData) => {
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
          id: '1',
          name: 'tag1',
        },
        {
          id: '2',
          name: 'tag2',
        },
        {
          id: '3',
          name: 'tag3',
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
