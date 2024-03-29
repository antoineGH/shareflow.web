import Stack from '@mui/material/Stack'

import AddCommentForm from './AddCommentForm'
import Avatar from './Avatar'

type Props = {
  fileId: number
}

function Header({ fileId }: Props) {
  return (
    <Stack direction="column" alignItems="center" px={2} pt={1} mb={0}>
      <Avatar />
      <AddCommentForm fileId={fileId} />
    </Stack>
  )
}

export default Header
