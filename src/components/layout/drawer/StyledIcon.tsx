import { styled } from '@mui/material/styles'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

interface StyledIconButtonProps extends SvgIconProps {
  activeState: 'active' | 'inactive'
  activeColor?: string
}

const StyledIcon = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ activeState, activeColor, ...other }: StyledIconButtonProps) => (
    <SvgIcon {...other} />
  ),
)(({ activeState, activeColor }) => ({
  fontSize: '1.1rem',
  color: activeState === 'active' ? activeColor : '#6c63ff91',
}))

export default StyledIcon
