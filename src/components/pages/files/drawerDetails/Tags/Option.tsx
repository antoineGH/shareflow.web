import { ListItem, ListItemText } from '@mui/material'
import type { HTMLAttributes } from 'react'
import Title from './Title'
import { generateClassNames } from './helpers'
import type { Tag } from 'types/tags'

type Props = {
  option: Tag
  isSelected: boolean
  optionAttr: HTMLAttributes<HTMLLIElement>
  onClickOption: (option: Tag) => void
}

function Option({ option, isSelected, optionAttr, onClickOption }: Props) {
  const className = generateClassNames(optionAttr.className || '', {
    'selected-option': isSelected,
  })

  return (
    <ListItem
      color="secondary"
      data-testid={`supplier-${name}`}
      {...optionAttr}
      className={className}
      disablePadding
      disableGutters
      sx={{
        '&.MuiAutocomplete-option[aria-selected="true"].selected-option':
          tm => ({
            background: tm.palette.secondary[50],
          }),
      }}
      aria-selected={isSelected}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        onClickOption(option)
      }}
    >
      <ListItemText
        primary={<Title option={option} />}
        primaryTypographyProps={{
          component: 'div',
          variant: 'body2',
          sx: tm => ({
            fontWeight: tm.typography.fontWeightMedium,
            lineHeight: `${tm.typography.subtitle2.fontSize}px`,
          }),
        }}
      />
    </ListItem>
  )
}

export default Option
