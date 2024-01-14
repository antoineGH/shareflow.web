import type { MouseEvent } from 'react'

import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, Button } from '@mui/material'

type Props = {
  openModalAddDocs(): void
  openMenu: (event: MouseEvent<HTMLElement>) => void
}

function BreadCrumpUploadFile({ openModalAddDocs, openMenu }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={1.5}>
      <Button
        data-testid="upload-file-button"
        onClick={openModalAddDocs}
        sx={{
          textTransform: 'capitalize',
          color: 'white',
          '&:hover': {
            backgroundColor: '#6c63ffdb',
          },
        }}
        startIcon={<FileUploadIcon />}
        variant="contained"
        size="small"
      >
        Upload file
      </Button>

      <Button
        data-testid="create-folder-button"
        onClick={openMenu}
        sx={{
          textTransform: 'capitalize',
        }}
        startIcon={<CreateNewFolderIcon />}
        variant="outlined"
        size="small"
      >
        Create folder
      </Button>
    </Box>
  )
}

export default BreadCrumpUploadFile
