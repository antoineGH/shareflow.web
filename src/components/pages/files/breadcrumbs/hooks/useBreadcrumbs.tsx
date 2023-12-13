import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import BreadcrumbMenu from '../breadcrumbMenu/breadcrumbMenu'
import BreadcrumbEntry from 'components/common/breadcrumbEntry/BreadcrumbEntry'
import { useTheme } from '@mui/material'

type Props = {
  openModalAddDocs(): void
}

function useBreadcrumbs({ openModalAddDocs }: Props) {
  //   TODO: Testing breadcrumbs only, remove when routes and subroutes has been added
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  //   const pathnames = location.pathname.split('/').filter(pathname => pathname)
  const pathnames = ['files', 'Antoine', 'Personal', 'Test']

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
  ) => {
    event.preventDefault()

    if (index === 0) return navigate('/')
    navigate((event.currentTarget as HTMLAnchorElement).pathname)
  }

  const breadcrumbs = pathnames.map((value, index) => {
    const first = index === 0
    const to = `/${pathnames.slice(0, index + 1).join('/')}`

    return first ? (
      <Link
        component={RouterLink}
        to={to}
        underline="none"
        color="inherit"
        key={index}
        onClick={e => handleClick(e, index)}
      >
        <BreadcrumbEntry pageName="Files" />
      </Link>
    ) : (
      <Link
        component={RouterLink}
        to={to}
        underline="none"
        color="inherit"
        key={index}
        onClick={e => handleClick(e, index)}
      >
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            color: theme.palette.secondary.contrastText,
          }}
        >
          {value}
        </Typography>
      </Link>
    )
  })

  breadcrumbs.push(
    <BreadcrumbMenu key="0" openModalAddDocs={openModalAddDocs} />,
  )

  return breadcrumbs
}

export { useBreadcrumbs }
