import { useState } from 'react'

type HookReturnValue = {
  isDrawerOpen: boolean
  activeDrawerTab: number
  handleChangeDrawerTab: (tab: number) => void
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
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

  const handleChangeDrawerTab = (tab: number) => {
    setValue(tab)
  }

  return {
    isDrawerOpen: open,
    activeDrawerTab: value,
    handleChangeDrawerTab,
    handleDrawerOpen,
    handleDrawerClose,
  }
}

export default useDrawerDetails
