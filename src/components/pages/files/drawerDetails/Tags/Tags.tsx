import Box from '@mui/material/Box'
import TagsSeachField from './TagsSearchField'

type Props = {
  userId: number
  fileId: number
}

function Tags({ userId, fileId }: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        pt: 0.5,
        mt: 1,
      }}
    >
      <TagsSeachField userId={userId} fileId={fileId} />
    </Box>
  )
}

export default Tags
