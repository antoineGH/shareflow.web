import { useState, type MouseEvent } from 'react'
import AccountButton from './AccountButton'
import Menu from './Menu'

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AccountButton openMenu={openMenu} />
      <Menu anchorEl={anchorEl} open={open} closeMenu={closeMenu} />
    </>
  )
}
export default AccountMenu
