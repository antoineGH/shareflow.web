import { useEffect, useState } from 'react'
import { removeDuplicates } from './helpers'
import type { Tag } from 'types/tags'
import { useDispatch, useSelector } from 'store/hooks'
import {
  selectSearchedTagsSelector,
  selectedTagsSelector,
  tagsStateSelector,
} from 'store/tags/selector'
import { createTag, searchTags } from 'store/tags/actions'
import {
  resetSearchTags,
  resetSelectedTags,
  unselectTag,
} from 'store/tags/slice'

type HookReturnValue = {
  areSuggestionsOpen: boolean
  isLoading: boolean
  options: Tag[]
  selectedOptions: Tag
  onOpenSuggestions: () => void
  onCloseSuggestions: () => void
  onResetSuggestions: () => void
  onResetselectedOptions: () => void
  onSelectOption: (option: Tag) => void
  onRemoveSelectOption: (option: Tag) => void
}

type Props = {
  userId: number
  fileId: number
  debounceSearch?: string
}

function useTags({ userId, fileId, debounceSearch }: Props): HookReturnValue {
  const [areSuggestionsOpen, setAreSuggestionsOpen] = useState(false)
  const dispatch = useDispatch()
  const tags = useSelector(selectSearchedTagsSelector)
  const { isLoadingSearch } = useSelector(tagsStateSelector)
  const selectedTags = useSelector(selectedTagsSelector)

  const onOpenSuggestions = () => setAreSuggestionsOpen(true)

  const onCloseSuggestions = () => setAreSuggestionsOpen(false)

  const onSelectOption = (option: Tag) => {
    dispatch(
      createTag({
        userId,
        fileId,
        newTag: option.tag,
        cb: () => {
          onResetSuggestions()
          onResetselectedOptions()
        },
      }),
    )
    onCloseSuggestions()
  }

  const onRemoveSelectOption = (option: Tag) => {
    dispatch(unselectTag(option))
  }

  const onResetSuggestions = () => dispatch(resetSearchTags())

  const onResetselectedOptions = () => dispatch(resetSelectedTags())

  useEffect(() => {
    if (!debounceSearch || !userId || (tags && debounceSearch.length < 3))
      return
    dispatch(searchTags({ userId, search: debounceSearch }))
  }, [debounceSearch, dispatch])

  return {
    areSuggestionsOpen,
    isLoading: isLoadingSearch,
    options: removeDuplicates(tags),
    selectedOptions: selectedTags[0],
    onCloseSuggestions,
    onOpenSuggestions,
    onResetselectedOptions,
    onResetSuggestions,
    onSelectOption,
    onRemoveSelectOption,
  }
}

export default useTags
