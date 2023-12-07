import { type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'

type Props = {
  openMenu: (event: MouseEvent<HTMLElement>) => void
}

function BreadcrumbButton({ openMenu }: Props) {
  return (
    <IconButton
      color="inherit"
      onClick={openMenu}
      sx={{
        borderRadius: 0,
        p: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Box
        sx={{
          borderRadius: '5%',
          height: '2rem',
          width: '2rem',
          border: '1px solid grey',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddIcon
          sx={{
            fontSize: '1rem',
            color: 'black',
          }}
        />
      </Box>
    </IconButton>
  )
}

export default BreadcrumbButton
