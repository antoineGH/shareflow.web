import { Box, styled } from '@mui/material'

export const DropzoneContainer = styled(Box)<{ disabled?: boolean }>(
  ({ theme: t, disabled }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    width: '100%',
    backgroundColor: disabled
      ? t.palette.grey['200']
      : t.palette.background.paper,
    borderColor: disabled ? t.palette.grey[700] : t.palette.primary.main,
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderRadius: '7px',
    boxSizing: 'border-box',
    cursor: disabled ? 'default' : 'pointer',
    gap: '8px',
    opacity: 0.8,
    transition: 'opacity 300ms',
    textAlign: 'center',
    outline: 'none',

    '&:hover': !disabled && {
      opacity: 1,
      backgroundColor: t.palette.primary[50],
    },
  }),
)
