import Grid from '@mui/material/Grid'
import TagsSeachField from './tagsSearchField/TagsSearchField'

function Tags() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        height: 'calc(100vh - 42px)',
        width: '100%',
        p: 0,
        m: 0,
        mt: '42px',
      }}
    >
      <Grid item mt={2} sx={{ width: '100%' }}>
        <TagsSeachField />
      </Grid>
    </Grid>
  )
}

export default Tags
