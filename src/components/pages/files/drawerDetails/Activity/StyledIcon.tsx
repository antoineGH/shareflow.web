import { styled, SvgIcon } from '@mui/material'

export const StyledIcon = styled(SvgIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.4rem',
}))
