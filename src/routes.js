import Loading from 'components/Loading';
import Loadable from 'react-loadable';
import Layout from 'pages/layout';

const routes = [
  {
    path: '/alone',
    component: Loadable({
      loader: () => import('pages/alone'),
      loading: Loading,
    }),
  },
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/home',
        exact: true,
        component: Loadable({
          loader: () => import('pages/home'),
          loading: Loading,
        }),
      },
      {
        path: '/home/detail',
        component: Loadable({
          loader: () => import('pages/home/detail'),
          loading: Loading,
        }),
      },
    ],
  },
  {
    path: '/main',
    component: Layout,
    routes: [
      {
        path: '/main',
        component: Loadable({
          loader: () => import('pages/main'),
          loading: Loading,
        }),
      },
    ],
  },
  {
    path: '/about',
    component: Layout,
    routes: [
      {
        path: '/about',
        component: Loadable({
          loader: () => import('pages/about'),
          loading: Loading,
        }),
      },
    ],
  },
];

export default routes;
