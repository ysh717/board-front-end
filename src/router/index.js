import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "board" */ '../views/board/List.vue')
  },
  {
    path: '/read',
    component: () => import(/* webpackChunkName: "board" */ '../views/board/Read.vue')
  },
  {
    path: '/writeform',
    component: () => import(/* webpackChunkName: "board" */ '../views/board/WriteForm.vue')
  },
  {
    path: '/updateform',
    component: () => import(/* webpackChunkName: "board" */ '../views/board/UpdateForm.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
