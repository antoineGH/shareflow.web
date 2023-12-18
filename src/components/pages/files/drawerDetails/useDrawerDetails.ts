import { useState } from 'react'

type HookReturnValue = {
  isDrawerOpen: boolean
  activeDrawerTab: number
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
  toggleDrawer: () => void
}

function useDrawerDetails(): HookReturnValue {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleChangeDrawerTab = (tab: number) => {
    setValue(tab)
  }

  return {
    isDrawerOpen: open,
    activeDrawerTab: value,
    handleChangeDrawerTab,
    handleDrawerOpen,
    handleDrawerClose,
    toggleDrawer,
  }
}

export default useDrawerDetails
