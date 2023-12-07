import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'

function useBreadcrumbs() {
  const location = useLocation()
  const navigate = useNavigate()
  //   TODO: Testing breadcrumbs only, remove when routes and subroutes has been added
  //   const pathnames = location.pathname.split('/').filter(pathname => pathname)
  const pathnames = ['files', 'folder1', 'folder2', 'folder3']

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
    console.log(index, value)
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
        <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item>
            <FolderIcon sx={{ mr: 1 }} fontSize="inherit" />
          </Grid>
          <Grid item>
            <Typography variant="body2" sx={{ lineHeight: 'inherit' }}>
              All Files
            </Typography>
          </Grid>
        </Grid>
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
        <Typography variant="body2">{value}</Typography>
      </Link>
    )
  })

  return breadcrumbs
}

export { useBreadcrumbs }
