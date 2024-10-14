import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/groups/:id',
      name: 'groups',
      component: () => import('../views/GroupsView.vue')
    },
    {
      path: '/group/:id',
      name: 'group',
      component: () => import('../views/GroupSchedule.vue')
    }
  ]
})

export default router
