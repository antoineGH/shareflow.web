import { useCallback, useMemo, useRef, useState } from 'react'

import CancelIcon from '@mui/icons-material/Cancel'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { useTheme } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { useDebounce } from 'hooks/useDebounce'
import type { Tag } from 'types/tags'

import Option from './Option'
import useTags from './useTags'

function generateInputProps(selectedOptions: Tag[], onCleanSearch: () => void) {
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

type Props = {
  userId: number
}

function TagsSeachField({ userId }: Props) {
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
  } = useTags({ userId, debounceSearch })
  const theme = useTheme()

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

  const onClickOption = (option: Tag) => {
    onResetSuggestions()
    if (selectedOptions.some(selected => selected.id === option.id)) {
      return onRemoveSelectOption(option)
    }
    onSelectOption(option)
    setSearch('')
  }

  const handleRemoveSelectOption = (option: Tag) => {
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
    [onCleanSearch, selectedOptions],
  )

  const inputProps = useMemo(
    () => generateInputProps(selectedOptions, onCleanSearch),
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
      noOptionsText={
        search.length >= 3
          ? 'No result, please refine your search.'
          : 'Please fill in at least 3 characters.'
      }
      options={options}
      onOpen={onOpenSuggestions}
      onClose={onCloseSuggestions}
      sx={{
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
          placeholder={selectedOptions?.length ? '' : 'Search tag to filter by'}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {inputProps.startAdornment}
                {selectedOptions.map(option => (
                  <Chip
                    key={option.id}
                    label={option.tag.toLowerCase()}
                    onDelete={() => handleRemoveSelectOption(option)}
                    deleteIcon={
                      <CancelIcon
                        style={{
                          color: theme.palette.primary.main,
                        }}
                      />
                    }
                    sx={{
                      height: '26px',
                      p: 0,
                      mr: 0.5,
                      borderRadius: '5px',
                      backgroundColor: theme.palette.primary.contrastText,
                      color: 'white',
                    }}
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
