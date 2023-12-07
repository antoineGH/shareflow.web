import Settings from '@mui/icons-material/Settings'
import Deleted from 'components/pages/deleted/deleted'
import Favorites from 'components/pages/favorites/Favorites'
import Files from 'components/pages/files/Files'
import NotFound from 'components/pages/notFound/NotFound'
import Tags from 'components/pages/tags/Tags'

type Route = {
  path: string
  name: string
  component: JSX.Element
  meta: {
    title: string
    requiresAuth: boolean
  }
}

const routes: Route[] = [
  {
    path: '/',
    name: 'Files',
    component: <Files />,
    meta: {
      title: 'Files',
      requiresAuth: true,
    },
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: <Favorites />,
    meta: {
      title: 'Favorites',
      requiresAuth: true,
    },
  },
  {
    path: '/tags',
    name: 'Tags',
    component: <Tags />,
    meta: {
      title: 'Tags',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: <Settings />,
    meta: {
      title: 'Settings',
      requiresAuth: true,
    },
  },
  {
    path: '/deleted',
    name: 'Deleted',
    component: <Deleted />,
    meta: {
      title: 'Deleted',
      requiresAuth: true,
    },
  },
  {
    path: '/404',
    name: 'Not Found',
    component: <NotFound />,
    meta: {
      title: '404',
      requiresAuth: true,
    },
  },
]

export { routes }
