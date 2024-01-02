import { type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import AddIcon from '@mui/icons-material/Add'
import { useTheme } from '@mui/material'

type Props = {
  openMenu: (event: MouseEvent<HTMLElement>) => void
}

function BreadcrumbButton({ openMenu }: Props) {
  const theme = useTheme()
  return (
    <IconButton
      color="inherit"
      onClick={openMenu}
      sx={{
        borderRadius: '35%',
        p: 0,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: '#6c63ff9e',
        },
      }}
    >
      <Box
        sx={{
          borderRadius: '18%',
          height: '1.7rem',
          width: '1.7rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddIcon
          sx={{
            fontSize: '1.2rem',
            color: 'white',
          }}
        />
      </Box>
    </IconButton>
  )
}

export default BreadcrumbButton
