import { createRouter, createWebHashHistory } from 'vue-router'
import Iris from '../views/Iris.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/iris'
  },
  {
    path: '/iris',
    name: 'Iris',
    component: Iris,
    props: route => ({ speciesFilter: route.query.species })
  },
  {
    path: '/cars',
    name: 'Cars',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cars.vue'),
    props: route => ({ makeFilter: route.query.make })
  },
  {
    path: '/:pathMatch(.*)*', // https://next.router.vuejs.org/guide/migration/#moved-the-base-option
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
