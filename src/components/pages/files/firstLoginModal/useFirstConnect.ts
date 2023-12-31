import { useLocalStorage } from 'hooks/useLocalStorage'

type HookReturnValue = {
  open: boolean
  handleClose: () => void
}

function useFirstConnect(): HookReturnValue {
  const [firstConnect, setIsFirstConnect] = useLocalStorage<boolean>(
    'firstConnect',
    true,
  )

  const handleClose = () => {
    setIsFirstConnect(false)
  }

  return {
    open: firstConnect,
    handleClose,
  }
}

export default useFirstConnect
