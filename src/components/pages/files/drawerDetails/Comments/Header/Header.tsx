import Stack from '@mui/material/Stack'
import Avatar from './Avatar'
import AddCommentForm from './AddCommentForm'

function Header() {
  return (
    <Stack direction="column" alignItems="center" gap={1} px={2} pt={1} mb={0}>
      <Avatar />
      <AddCommentForm />
    </Stack>
  )
}

export default Header
