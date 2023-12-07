import Deleted from 'components/pages/deleted/deleted'
import Favorites from 'components/pages/favorites/Favorites'
import Files from 'components/pages/files/Files'
import NotFound from 'components/pages/notFound/NotFound'
import Settings from 'components/pages/settings/Settings'
import Tags from 'components/pages/tags/Tags'

type Route = {
  pathname: string
  name: string
  component: JSX.Element
  meta: {
    title: string
    requiresAuth: boolean
  }
}

const routes: Route[] = [
  {
    pathname: '/',
    name: 'Files',
    component: <Files />,
    meta: {
      title: 'files',
      requiresAuth: true,
    },
  },
  {
    pathname: '/favorites',
    name: 'Favorites',
    component: <Favorites />,
    meta: {
      title: 'favorites',
      requiresAuth: true,
    },
  },
  {
    pathname: '/tags',
    name: 'Tags',
    component: <Tags />,
    meta: {
      title: 'tags',
      requiresAuth: true,
    },
  },
  {
    pathname: '/settings',
    name: 'Settings',
    component: <Settings />,
    meta: {
      title: 'settings',
      requiresAuth: true,
    },
  },
  {
    pathname: '/deleted',
    name: 'Deleted',
    component: <Deleted />,
    meta: {
      title: 'deleted',
      requiresAuth: true,
    },
  },
  {
    pathname: '/404',
    name: 'Not Found',
    component: <NotFound />,
    meta: {
      title: 'not found',
      requiresAuth: true,
    },
  },
]

export { routes }
