import { type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import StyledBadge from './StyledBadge'

type Props = {
  openMenu: (event: MouseEvent<HTMLElement>) => void
}

function AccountButton({ openMenu }: Props) {
  return (
    <IconButton color="inherit" onClick={openMenu}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar
          alt="OP avatar"
          sx={{ width: 28, height: 28, fontSize: '1rem' }}
        >
          OP
        </Avatar>
      </StyledBadge>
    </IconButton>
  )
}

export default AccountButton
