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
  {
    path: '/auth/login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Login.vue')
  },
  {
    path: '/auth/join',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Join.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
