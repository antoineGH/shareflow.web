type Props = {
  id: string
  closeMenu: () => void
  openFolder: () => void
}

const breadcrumbAction = ({ id, closeMenu, openFolder }: Props) => {
  if (id === 'folder') {
    return openFolder()
  }
  console.log('file')
  closeMenu()
}

export { breadcrumbAction }
