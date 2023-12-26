import Deleted from 'components/pages/deleted/deleted'
import Favorites from 'components/pages/favorites/Favorites'
import Files from 'components/pages/files/Files'
import NotFound from 'components/pages/notFound/NotFound'
import Settings from 'components/pages/settings/Settings'
import Tags from 'components/pages/tags/Tags'

type Route = {
  pathname: string
  name: string
  component: React.ComponentType
  meta: {
    title: string
    requiresAuth: boolean
  }
}

const routes: Route[] = [
  {
    pathname: '/auth/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      title: 'Favorites',
      requiresAuth: true,
    },
  },
  {
    pathname: '/auth/tags',
    name: 'Tags',
    component: Tags,
    meta: {
      title: 'Tags',
      requiresAuth: true,
    },
  },
  {
    pathname: '/auth/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Settings',
      requiresAuth: true,
    },
  },
  {
    pathname: '/auth/deleted',
    name: 'Deleted',
    component: Deleted,
    meta: {
      title: 'Deleted',
      requiresAuth: true,
    },
  },
  {
    pathname: '/auth/files',
    name: 'Files',
    component: Files,
    meta: {
      title: 'Files',
      requiresAuth: true,
    },
  },
  {
    pathname: '/auth/files/:path*',
    name: 'File',
    component: Files,
    meta: {
      title: 'File',
      requiresAuth: true,
    },
  },
  {
    pathname: '/404',
    name: 'Not Found',
    component: NotFound,
    meta: {
      title: 'Not found',
      requiresAuth: false,
    },
  },
]

export { routes }
