import Stack from '@mui/material/Stack'
import Storage from './storage/Storage'
import AccountInfo from './accountInfo/AccountInfo'
import Password from './password/Password'
import Language from './Language'
import Version from '../version/Version'

function Settings() {
  return (
    <Stack
      direction="column"
      sx={{
        height: 'calc(100vh - 42px)',
        mt: '42px',
      }}
    >
      <Storage />
      <AccountInfo />
      <Password />
      <Language />
      <Version />
    </Stack>
  )
}

export default Settings
