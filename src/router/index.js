import MainView from '@/views/layout/MainView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import GagaView from '@/views/layout/GagaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/gagaview',
      name: 'GagaView',
      component: GagaView,
    },
  ],
})

export default router
