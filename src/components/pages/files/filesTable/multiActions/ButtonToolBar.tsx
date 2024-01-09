import { useTheme } from '@mui/material'

import { filesStateSelector } from 'store/files/selector'
import { useSelector } from 'store/hooks'

import StyledButton from './StyledButton'

type Props = {
  label: string
  icon: JSX.Element
  handleClickMulti: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ButtonToolBar({ label, icon, handleClickMulti }: Props) {
  const { isLoadingPatch } = useSelector(filesStateSelector)
  const theme = useTheme()

  return (
    <StyledButton
      variant="text"
      startIcon={icon}
      theme={theme}
      loading={isLoadingPatch}
      onClick={e => handleClickMulti(e)}
    >
      {label}
    </StyledButton>
  )
}

export default ButtonToolBar
