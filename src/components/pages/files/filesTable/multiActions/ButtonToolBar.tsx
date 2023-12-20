import { useTheme } from '@mui/material'
import StyledButton from './StyledButton'

type Props = {
  label: string
  icon: JSX.Element
  handleClickMulti: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ButtonToolBar({ label, icon, handleClickMulti }: Props) {
  const theme = useTheme()

  return (
    <StyledButton
      variant="text"
      startIcon={icon}
      theme={theme}
      onClick={e => handleClickMulti(e)}
    >
      {label}
    </StyledButton>
  )
}

export default ButtonToolBar
