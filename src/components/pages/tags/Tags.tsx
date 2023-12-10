import Grid from '@mui/material/Grid'
import TagsSeachField from './tagsSearchField/TagsSearchField'

function Tags() {
  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '34px',
      }}
    >
      <Grid item mt={2} sx={{ width: '100%' }} py={0} px={1}>
        <TagsSeachField />
      </Grid>
    </Grid>
  )
}

export default Tags
