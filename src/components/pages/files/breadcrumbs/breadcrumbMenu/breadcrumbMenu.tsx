import { useState, type MouseEvent } from 'react'
import BreadcrumbButton from './breadcrumbButton'
import Menu from './Menu'

function BreadcrumbMenu() {
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
      <BreadcrumbButton openMenu={openMenu} />
      <Menu anchorEl={anchorEl} open={open} closeMenu={closeMenu} />
    </>
  )
}
export default BreadcrumbMenu
