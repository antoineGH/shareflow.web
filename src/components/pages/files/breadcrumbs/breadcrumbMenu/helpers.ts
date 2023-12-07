type Props = {
  id: string
  closeMenu: () => void
  openFolder: () => void
  openModalAddDocs: () => void
}

const breadcrumbAction = ({
  id,
  closeMenu,
  openFolder,
  openModalAddDocs,
}: Props) => {
  if (id === 'folder') {
    return openFolder()
  }
  openModalAddDocs()
  closeMenu()
}

export { breadcrumbAction }
