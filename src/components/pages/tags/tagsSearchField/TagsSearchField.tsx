import { useCallback, useMemo, useRef, useState } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import useTags from './useTags'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import Option from './Option'
import type { TagData } from './types'

function generateInputProps(
  selectedOptions: TagData[],
  onCleanSearch: () => void,
) {
  return {
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    endAdornment: selectedOptions.length ? (
      <InputAdornment position="end">
        <IconButton onClick={onCleanSearch}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ) : null,
  }
}

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
    onRemoveSelectOption,
  } = useTags({ debounceSearch })

  const onCleanSearch = useCallback(() => {
    setSearch('')
    onResetSuggestions()
    onResetselectedOptions()
    if (highlightedOption.current) highlightedOption.current = null
  }, [onResetselectedOptions, onResetSuggestions])

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
    if (selectedOptions.some(selected => selected.id === option.id)) {
      return onRemoveSelectOption(option)
    }
    onSelectOption(option)
    setSearch('')
  }

  const handleRemoveSelectOption = (option: TagData) => {
    onRemoveSelectOption(option)
  }

  const onKeydownEnter = useCallback(
    event => {
      if (event.key === 'Enter' && areSuggestionsOpen) {
        if (highlightedOption.current) {
          onClickOption(highlightedOption.current)
        }
      }
      if (event.key === 'Backspace' && selectedOptions) {
        if (!search.length)
          handleRemoveSelectOption(selectedOptions[selectedOptions.length - 1])
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onCleanSearch, selectedOptions],
  )

  const inputProps = useMemo(
    () => generateInputProps(selectedOptions, onCleanSearch),
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
        search.length >= 3
          ? 'No result, please refine your search.'
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
      multiple
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
          placeholder={selectedOptions?.length ? '' : 'Search tag to filter by'}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {inputProps.startAdornment}
                {selectedOptions.map(option => (
                  <Chip
                    key={option.id}
                    label={option.name}
                    onDelete={() => handleRemoveSelectOption(option)}
                    sx={{ p: 0.5, mr: 0.5 }}
                  />
                ))}
              </>
            ),
            endAdornment: inputProps.endAdornment,
          }}
        />
      )}
      renderOption={(optionAttr, option) => (
        <Option
          key={option.name}
          option={option}
          isSelected={selectedOptions.some(
            selected => selected.id === option.id,
          )}
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
