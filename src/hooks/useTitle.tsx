import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from 'components/routes/routes'

function useTitle() {
  const location = useLocation()
  const appName = 'shareFlow'

  const getPageTitle = (pathname: string) => {
    const currentRoute = routes.find(route => route.pathname === pathname)
    return currentRoute?.meta.title
  }

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname)
    document.title = pageTitle ? `${pageTitle} - ${appName}` : appName
  }, [location])
}

export default useTitle
