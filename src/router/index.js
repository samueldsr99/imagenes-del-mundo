import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home'
import GetStarted from '@/views/GetStarted.vue'
import NotFound from '@/views/404.vue'

const routes = [
  {
    path: '/',
    name: 'GetStarted',
    component: GetStarted
  },
  {
    path: '/contest',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
