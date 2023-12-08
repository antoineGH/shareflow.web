import { ListItem, ListItemText } from '@mui/material'
import type { HTMLAttributes } from 'react'
import Title from './Title'
import { generateClassNames } from './helpers'

type TagData = {
  id: string
  name: string
}

type Props = {
  option: TagData
  isSelected: boolean
  optionAttr: HTMLAttributes<HTMLLIElement>
  onClickOption: (option: TagData) => void
}

function Option({ option, isSelected, optionAttr, onClickOption }: Props) {
  const { name } = option

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
        primary={<Title name={name} />}
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
