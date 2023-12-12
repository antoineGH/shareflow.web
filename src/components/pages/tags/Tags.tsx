import Grid from '@mui/material/Grid'
import TagsSeachField from './tagsSearchField/TagsSearchField'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import StyleIcon from '@mui/icons-material/Style'

function Tags() {
  return (
    <Grid
      container
      sx={{
        height: 'calc(100% - 42px)',
        mt: '42px',
      }}
    >
      <Grid item py={1} px={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Grid
            container
            sx={{ display: 'flex', flexDirection: 'row' }}
            mt={0.5}
          >
            <Grid item>
              <StyleIcon sx={{ mr: 1 }} fontSize="inherit" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ lineHeight: 'inherit' }}>
                My Tags
              </Typography>
            </Grid>
          </Grid>
        </Breadcrumbs>
      </Grid>
      <Grid item sx={{ width: '100%' }} py={0} px={2}>
        <TagsSeachField />
      </Grid>
    </Grid>
  )
}

export default Tags
