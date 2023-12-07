import { useState } from 'react'

type HookReturnValue = {
  isHidden: boolean
  openFolder: () => void
  closeFolder: () => void
}

function useFolderMenu(): HookReturnValue {
  const [isHidden, setIsHidden] = useState(true)

  function openFolder() {
    setIsHidden(false)
  }

  function closeFolder() {
    setIsHidden(true)
  }

  return {
    isHidden,
    openFolder,
    closeFolder,
  }
}

export { useFolderMenu }
