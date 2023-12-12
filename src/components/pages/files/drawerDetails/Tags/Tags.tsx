import Box from '@mui/material/Box'
import TagsSeachField from './TagsSearchField'

function Tags() {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        pt: 0.5,
        mt: 1,
      }}
    >
      <TagsSeachField />
    </Box>
  )
}

export default Tags
