import { useEffect, useState } from 'react'
import { removeDuplicates } from './helpers'
import type { Tag } from 'types/tags'
import { useDispatch, useSelector } from 'store/hooks'
import {
  selectSearchedTagsSelector,
  selectedTagsSelector,
  tagsStateSelector,
} from 'store/tags/selector'
import { searchTags } from 'store/tags/actions'
import {
  resetSelectedTags,
  resetTags,
  selectTag,
  unselectTag,
} from 'store/tags/slice'

type HookReturnValue = {
  areSuggestionsOpen: boolean
  isLoading: boolean
  options: Tag[]
  selectedOptions: Tag[]
  onOpenSuggestions: () => void
  onCloseSuggestions: () => void
  onResetSuggestions: () => void
  onResetselectedOptions: () => void
  onSelectOption: (option: Tag) => void
  onRemoveSelectOption: (option: Tag) => void
}

type Props = {
  userId: number
  debounceSearch?: string
}

function useTags({ userId, debounceSearch }: Props): HookReturnValue {
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)
  const dispatch = useDispatch()
  const tags = useSelector(selectSearchedTagsSelector)
  const { isLoadingFetch } = useSelector(tagsStateSelector)
  const selectedTags = useSelector(selectedTagsSelector)

  const onResetSuggestions = () => dispatch(resetTags)

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: Tag) => {
    dispatch(selectTag(option))
    onCloseSuggestions()
  }

  const onRemoveSelectOption = (option: Tag) => {
    dispatch(unselectTag(option))
  }

  const onResetselectedOptions = () => {
    dispatch(resetSelectedTags())
  }

  useEffect(() => {
    if (!debounceSearch || !userId || (tags && debounceSearch.length < 3))
      return
    dispatch(searchTags({ userId, search: debounceSearch }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, dispatch])

  return {
    areSuggestionsOpen,
    isLoading: isLoadingFetch,
    options: removeDuplicates(tags),
    selectedOptions: selectedTags,
    onCloseSuggestions,
    onOpenSuggestions,
    onResetselectedOptions,
    onResetSuggestions,
    onSelectOption,
    onRemoveSelectOption,
  }
}

export default useTags
