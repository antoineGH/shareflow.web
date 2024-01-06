import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'store/hooks'
import { openSnackbar } from 'store/snackbar/slice'
import type { JwtPayload } from 'types/auth'
import type { User } from 'types/users'

type HookReturnValue = {
  userId: number | null
  error: Error | null
}

function decodeToken(token: string): JwtPayload {
  const decodedToken = jwtDecode<JwtPayload>(token)
  return decodedToken
}

function useFetchUserFromToken(user: User | null): HookReturnValue {
  const dispatch = useDispatch()

  if (user && typeof user.id === 'number') {
    return { userId: user.id, error: null }
  }

  try {
    const token = localStorage.getItem('token')

    if (!token) throw new Error('No token found')

    const { userId } = decodeToken(token)

    return { userId, error: null }
  } catch (error) {
    console.error(error)
    dispatch(
      openSnackbar({ isOpen: true, message: error.message, severity: 'error' }),
    )
    return { userId: null, error }
  }
}

export default useFetchUserFromToken
