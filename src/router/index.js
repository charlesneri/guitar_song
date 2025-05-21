import Chords from '@/views/layout/Chords.vue'
import Faq from '@/views/layout/Faq.vue'
import Favorites from '@/views/layout/Favorites.vue'
import Folders from '@/views/layout/Folders.vue'
import History from '@/views/layout/History.vue'
import MainView from '@/views/layout/MainView.vue'
import Mysongs from '@/views/layout/Mysongs.vue'
import Setlists from '@/views/layout/Setlists.vue'
import Settings from '@/views/layout/Settings.vue'
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
      {
     path: '/favorites',
     name: 'favorites',
    component: Favorites,
    },
       {
     path: '/mysongs',
     name: 'mysongs',
    component: Mysongs,
    },
       {
     path: '/setlists',
     name: 'setlists',
    component:Setlists ,
    },
       {
     path: '/history',
     name: 'history',
    component: History,
    },
       {
     path: '/folders',
     name: 'folders',
    component: Folders,
    },
       {
     path: '/chords',
     name: 'chords',
    component: Chords,
    },
       {
     path: '/settings',
     name: 'settings',
    component: Settings,
    },
       {
     path: '/faq',
     name: 'faq',
    component: Faq,
    },
   
  ],
})

export default router
