import { useCallback, useMemo, useRef, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import useTags from './useTags'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import Option from './Option'
import type { TagData } from './types'

function TagsSeachField() {
  const [search, setSearch] = useState('')

  const highlightedOption = useRef<TagData | null>(null)
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
  } = useTags({ debounceSearch })

  function generateInputProps(search: string, onCleanSearch: () => void) {
    return {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
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

  const onClickOption = (option: TagData) => {
    onResetSuggestions()
    onSelectOption(option)
    setSearch('')
  }

  const onKeydownEnter = useCallback(
    event => {
      if (event.key === 'Enter' && areSuggestionsOpen) {
        if (highlightedOption.current) {
          onClickOption(highlightedOption.current)
        }
      }
      if (event.key === 'Backspace' && selectedOptions) {
        onCleanSearch()
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCleanSearch, selectedOptions],
  )

  const getOptionLabel = (option: TagData) => {
    return `${option.name}`
  }

  return (
    <Autocomplete
      size="small"
      data-testid="tag-search"
      open={areSuggestionsOpen}
      loading={isLoading}
      loadingText="Loading"
      noOptionsText={
        search.length >= 3 || !selectedOptions
          ? null
          : 'Please fill in at least 3 characters.'
      }
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
          key={option.name}
          option={option}
          isSelected={selectedOptions.id === option.id}
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
