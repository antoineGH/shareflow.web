import { useEffect, useState } from 'react'

import { fetchFiles } from 'store/files/actions'
import { resetFileSlice } from 'store/files/slice'
import { useDispatch, useSelector } from 'store/hooks'
import { searchTags } from 'store/tags/actions'
import {
  selectedTagsSelector,
  selectSearchedTagsSelector,
  tagsStateSelector,
} from 'store/tags/selector'
import {
  resetSearchTags,
  resetSelectedTags,
  resetTags,
  selectTag,
  unselectTag,
} from 'store/tags/slice'
import type { Tag } from 'types/tags'

import { removeDuplicates } from './helpers'

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
  const { isLoadingSearch } = useSelector(tagsStateSelector)
  const selectedTags = useSelector(selectedTagsSelector)

  const onResetSuggestions = () => dispatch(resetTags)

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: Tag) => {
    dispatch(selectTag(option))
    dispatch(resetSearchTags())
    onCloseSuggestions()
  }

  const onRemoveSelectOption = (option: Tag) => {
    dispatch(unselectTag(option))
    if (selectedTags.length === 0) {
      dispatch(resetFileSlice())
      return
    }
    dispatch(fetchFiles({ userId, filter: 'all_files', tags: selectedTags }))
  }

  const onResetselectedOptions = () => {
    dispatch(resetSelectedTags())
  }

  useEffect(() => {
    if (!debounceSearch || !userId || (tags && debounceSearch.length < 3))
      return
    dispatch(searchTags({ userId, search: debounceSearch }))
  }, [debounceSearch])

  return {
    areSuggestionsOpen,
    isLoading: isLoadingSearch,
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
