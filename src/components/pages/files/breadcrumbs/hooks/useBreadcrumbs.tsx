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
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const pathnames = location.pathname.split('/').filter(pathname => pathname)

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
  ) => {
    event.preventDefault()

    if (index === 0) return navigate('/')
    navigate((event.currentTarget as HTMLAnchorElement).pathname)
  }

  const breadcrumbs = [
    <Link
      component={RouterLink}
      to="/"
      underline="none"
      color="inherit"
      key="home"
      onClick={e => handleClick(e, 0)}
    >
      <BreadcrumbEntry pageName="Files" />
    </Link>,
    ...pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`

      return (
        <Link
          component={RouterLink}
          to={to}
          underline="none"
          color="inherit"
          key={index + 1}
          onClick={e => handleClick(e, index + 1)}
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
    }),
  ]

  breadcrumbs.push(
    <BreadcrumbMenu key="0" openModalAddDocs={openModalAddDocs} />,
  )

  return breadcrumbs
}

export { useBreadcrumbs }
