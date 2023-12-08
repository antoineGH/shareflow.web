import { useEffect, useState } from 'react'

type TagData = {
  id: string
  name: string
}

type HookReturnValue = {
  areSuggestionsOpen: boolean
  isLoading: boolean
  options: TagData[]
  selectedOptions: TagData[]
  onOpenSuggestions: () => void
  onCloseSuggestions: () => void
  onResetSuggestions: () => void
  onResetselectedOptions: () => void
  onSelectOption: (option: TagData) => void
  onRemoveSelectOption: (option: TagData) => void
}

type Props = {
  debounceSearch?: string
}

function useTags({ debounceSearch }: Props): HookReturnValue {
  const [selectedOptions, setselectedOptions] = useState<TagData[]>([])
  const [options, setOptions] = useState<TagData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)

  const onResetSuggestions = () => setOptions([])

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: TagData) => {
    setselectedOptions(prevOptions => [...prevOptions, option])
    onCloseSuggestions()
  }

  const onRemoveSelectOption = (option: TagData) => {
    setselectedOptions(prevOptions =>
      prevOptions.filter(({ id }) => id !== option.id),
    )
  }

  const onResetselectedOptions = () => setselectedOptions([])

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
    // if (response.error) {
    //   setIsLoading(false)
    //   onCloseSuggestions()
    //   return
    // }
    setOptions(prev => [...prev, ...(response.options ?? [])])

    // TODO: Remove setTimeout
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  return {
    areSuggestionsOpen,
    isLoading,
    options,
    selectedOptions,
    onCloseSuggestions,
    onOpenSuggestions,
    onResetselectedOptions,
    onResetSuggestions,
    onSelectOption,
    onRemoveSelectOption,
  }
}

export default useTags
