import { useEffect } from 'react'

import { Skeleton, useTheme } from '@mui/material'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'

import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import { getBreadcrumbs } from 'store/breadcrumbs/actions'
import {
  breadcrumbsStateSelector,
  selectbreadcrumbsSelector,
} from 'store/breadcrumbs/selector'
import { useDispatch, useSelector } from 'store/hooks'

import BreadcrumbMenu from '../breadcrumbMenu/breadcrumbMenu'

type Props = {
  userId: number
  openModalAddDocs(): void
}

function useBreadcrumbs({ userId, openModalAddDocs }: Props) {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const excludedPathName = ['auth', 'files', '']
  let accumulatedPath = ''

  const { isLoadingFetch: isLoadingFetchBreadcrumb } = useSelector(
    breadcrumbsStateSelector,
  )

  const pathnames = location.pathname
    .split('/')
    .filter(pathname => !excludedPathName.includes(pathname))

  const folderIds = pathnames.map(pathname => Number(pathname))

  useEffect(() => {
    if (!userId || !folderIds.length) return
    dispatch(getBreadcrumbs({ userId, folderIds }))
  }, [])

  const pathnamesWithFiles = useSelector(selectbreadcrumbsSelector)

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
    path: string,
  ) => {
    event.preventDefault()

    navigate(`/auth/files${path}`)
  }

  if (isLoadingFetchBreadcrumb)
    return <Skeleton variant="text" width={300} height="32px" />
  if (!userId || !pathnamesWithFiles.length) return null

  const breadcrumbs = [
    <Link
      component={RouterLink}
      to="/auth/files"
      underline="none"
      color="inherit"
      key="home"
      onClick={() => navigate('/auth/files')}
    >
      <BreadcrumbEntry pageName="Files" />
    </Link>,
    ...pathnamesWithFiles.map((pathname, index) => {
      if (!pathname) return null
      accumulatedPath += `/${pathname.id}`
      const to = accumulatedPath

      return (
        <Link
          component={RouterLink}
          to={to}
          underline="none"
          color="inherit"
          key={pathname.id}
          onClick={e => handleClick(e, index + 1, to)}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: theme.palette.secondary.contrastText,
            }}
          >
            {pathname.name}
          </Typography>
        </Link>
      )
    }),
  ]

  breadcrumbs.push(
    <BreadcrumbMenu key="0" openModalAddDocs={openModalAddDocs} />,
  )

  return breadcrumbs
}

export { useBreadcrumbs }
