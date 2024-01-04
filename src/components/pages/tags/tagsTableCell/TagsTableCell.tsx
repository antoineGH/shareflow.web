import Stack from '@mui/material/Stack'
import StyledChip from 'components/pages/files/drawerDetails/StyledChip'
import { useSelector } from 'store/hooks'
import { selectedTagsSelector } from 'store/tags/selector'

function TagsTableCell() {
  const selectedTags = useSelector(selectedTagsSelector)

  if (!selectedTags) return null

  return (
    <Stack direction="row" spacing={0.5} sx={{ width: '100%' }}>
      {selectedTags.map(tag => (
        <StyledChip key={tag.id} size="small" label={tag.tag.toLowerCase()} />
      ))}
    </Stack>
  )
}

export default TagsTableCell
