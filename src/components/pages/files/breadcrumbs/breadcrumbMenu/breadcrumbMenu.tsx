import { type MouseEvent, useState } from 'react'

import BreadcrumbButton from './breadcrumbButton'
import Menu from './Menu'

type Props = {
  openModalAddDocs(): void
}

function BreadcrumbMenu({ openModalAddDocs }: Props) {
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        closeMenu={closeMenu}
        openModalAddDocs={openModalAddDocs}
      />
    </>
  )
}
export default BreadcrumbMenu
