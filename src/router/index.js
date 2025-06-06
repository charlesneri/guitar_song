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
import MarsView from '@/views/layout/MarsView.vue'
import Alejandro from '@/views/Withchords/Alejandro.vue'
import SwiftView from '@/views/layout/SwiftView.vue'
import SheeranView from '@/views/layout/SheeranView.vue'
import GomezView from '@/views/layout/GomezView.vue'
import GrandeView from '@/views/layout/GrandeView.vue'

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
      path: '/swiftview',
      name: 'SwiftView',
      component: SwiftView,
    },
    {
      path: '/sheeranview',
      name: 'SheeranView',
      component: SheeranView,
    },
    {
      path: '/gomezview',
      name: 'GomezView',
      component: GomezView,
    },
    {
      path: '/grandeview',
      name: 'GrandeView',
      component: GrandeView,
    },
    {
      path: '/marsview',
      name: 'MarsView',
      component: MarsView,
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
      component: Setlists,
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
     {
      path: '/alejandro',
      name: 'Marsview/24kmagic',
      component: Alejandro,

    },
  ],
})

export default router
