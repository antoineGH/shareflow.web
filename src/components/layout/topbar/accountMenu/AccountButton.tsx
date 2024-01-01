import { type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import StyledBadge from './StyledBadge'
import { useSelector } from 'store/hooks'
import { selectUserSelector } from 'store/user/selector'

type Props = {
  openMenu: (event: MouseEvent<HTMLElement>) => void
}

function AccountButton({ openMenu }: Props) {
  const user = useSelector(selectUserSelector)
  const avatarUrl = user ? user.avatarUrl : undefined

  return (
    <IconButton color="inherit" onClick={openMenu}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar
          alt="AR avatar"
          src={avatarUrl}
          sx={{
            width: 28,
            height: 28,
            fontSize: '1rem',
            backgroundColor: 'lightgrey',
          }}
        >
          AR
        </Avatar>
      </StyledBadge>
    </IconButton>
  )
}

export default AccountButton
