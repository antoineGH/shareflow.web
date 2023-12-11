import { useState } from 'react'

type HookReturnValue = {
  isDrawerOpen: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
}

function useDrawerDetails(): HookReturnValue {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return {
    isDrawerOpen: open,
    handleDrawerOpen,
    handleDrawerClose,
  }
}

export default useDrawerDetails
