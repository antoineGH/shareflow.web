import { type MouseEvent, useState } from 'react'

import Menu from './Menu'
import BreadCrumpUploadFile from '../breadcrumbAction/BreadCrumbUploadFile'

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
      <BreadCrumpUploadFile
        openMenu={openMenu}
        openModalAddDocs={openModalAddDocs}
      />
      <Menu anchorEl={anchorEl} open={open} closeMenu={closeMenu} />
    </>
  )
}
export default BreadcrumbMenu
