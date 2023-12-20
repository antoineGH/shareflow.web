import { useTheme } from '@mui/material'
import StyledButton from './StyledButton'

type Props = {
  label: string
  icon: JSX.Element
}

function Button({ label, icon }: Props) {
  const theme = useTheme()

  return (
    <StyledButton variant="text" startIcon={icon} theme={theme}>
      {label}
    </StyledButton>
  )
}

export default Button
