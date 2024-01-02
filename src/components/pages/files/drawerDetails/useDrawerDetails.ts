import { useState } from 'react'

type HookReturnValue = {
  isDrawerOpen: boolean
  drawerFileId: number
  activeDrawerTab: number
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: (fileId: number) => void
  handleDrawerClose: () => void
  toggleDrawer: (fileId: number) => void
}

function useDrawerDetails(): HookReturnValue {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)
  const [fileId, setFileId] = useState<number>(0)

  const handleDrawerOpen = (fileId: number) => {
    setFileId(fileId)
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const toggleDrawer = (fileId: number) => {
    setFileId(fileId)
    setOpen(!open)
  }

  const handleChangeDrawerTab = (tab: number) => {
    setValue(tab)
  }

  return {
    isDrawerOpen: open,
    drawerFileId: fileId,
    activeDrawerTab: value,
    handleChangeDrawerTab,
    handleDrawerOpen,
    handleDrawerClose,
    toggleDrawer,
  }
}

export default useDrawerDetails
