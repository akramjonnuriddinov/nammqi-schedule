import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/DepartmentsView.vue')
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
