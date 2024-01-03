import { useCallback, useMemo, useRef, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import useTags from './useTags'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import Option from './Option'
import type { Tag } from 'types/tags'
import { dispatch } from 'store/store'
import { createTag } from 'store/tags/actions'

type Props = {
  userId: number
  fileId: number
}

function TagsSeachField({ userId, fileId }: Props) {
  const [search, setSearch] = useState('')
  const highlightedOption = useRef<Tag | null>(null)
  const debounceSearch = useDebounce(search, 500)

  const {
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
  } = useTags({ debounceSearch, userId, fileId })

  function generateInputProps(search: string, onCleanSearch: () => void) {
    return {
      endAdornment: search ? (
        <InputAdornment position="end">
          <IconButton onClick={onCleanSearch}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ) : null,
    }
  }

  const onCleanSearch = useCallback(() => {
    setSearch('')
    onResetSuggestions()
    onResetselectedOptions()
    if (highlightedOption.current) highlightedOption.current = null
  }, [onResetselectedOptions, onResetSuggestions])

  const inputProps = useMemo(
    () => generateInputProps(search, onCleanSearch),
    [onCleanSearch, search],
  )

  const onHighlightChange = (_, option) => {
    highlightedOption.current = option
  }

  const onChangeSearch = useCallback(({ target }) => {
    setSearch(target.value)
    if (highlightedOption.current) {
      highlightedOption.current = null
    }
  }, [])

  const onClickOption = (option: Tag) => {
    onResetSuggestions()
    onSelectOption(option)
    setSearch('')
    onRemoveSelectOption(option)
  }

  const onKeydownEnter = useCallback(
    event => {
      if (event.key === 'Enter' && areSuggestionsOpen) {
        let tag = event.target.value
        if (typeof tag === 'object') {
          tag = tag.tag
        }
        dispatch(
          createTag({
            userId,
            fileId,
            newTag: tag,
            cb: () => {
              setSearch('')
            },
          }),
        )
      }
      if (event.key === 'Backspace' && selectedOptions) {
        onCleanSearch()
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCleanSearch, selectedOptions],
  )

  const getOptionLabel = (option: Tag) => {
    return `${option.tag}`
  }

  return (
    <Autocomplete
      size="small"
      data-testid="tag-search"
      open={areSuggestionsOpen}
      loading={isLoading}
      loadingText="Loading"
      options={options}
      onOpen={onOpenSuggestions}
      onClose={onCloseSuggestions}
      sx={{
        maxWidth: '1440px',
        mt: '1px',
        '&.MuiAutocomplete-root.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root':
          {
            paddingRight: '8px',
          },
      }}
      onHighlightChange={onHighlightChange}
      inputValue={search}
      getOptionLabel={option => getOptionLabel(option)}
      filterOptions={opts => opts}
      value={selectedOptions}
      renderInput={params => (
        <TextField
          {...params}
          onChange={onChangeSearch}
          onKeyDown={onKeydownEnter}
          sx={{
            pr: '6px',
          }}
          variant="outlined"
          size="small"
          placeholder={selectedOptions ? '' : 'Add a new tag '}
          InputProps={{ ...params.InputProps, ...inputProps }}
        />
      )}
      renderOption={(optionAttr, option) => (
        <Option
          key={option.tag}
          option={option}
          isSelected={false}
          optionAttr={optionAttr}
          onClickOption={onClickOption}
        />
      )}
      componentsProps={{
        popper: {
          sx: {
            '.MuiAutocomplete-listbox': {
              padding: 0,
              maxHeight: '300px',
            },
          },
        },
      }}
    />
  )
}

export default TagsSeachField
