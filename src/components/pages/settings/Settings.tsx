import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings'
import Storage from './storage/Storage'
import AccountInfo from './accountInfo/AccountInfo'
import Password from './password/Password'
import Language from './Language'
import Version from '../version/Version'

function Settings() {
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
              <SettingsIcon sx={{ mr: 1 }} fontSize="inherit" />
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ lineHeight: 'inherit' }}>
                My Settings
              </Typography>
            </Grid>
          </Grid>
        </Breadcrumbs>
      </Grid>
      <Grid item sx={{ width: '100%' }} py={0} px={1}>
        <Storage />
        <AccountInfo />
        <Password />
        <Language />
        <Version />
      </Grid>
    </Grid>
  )
}

export default Settings
