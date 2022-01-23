import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: ()=> import("@/views-next/index.vue")
  },{
    path: '/characters',
    component: ()=> import('@/views-next/god-view/SeeCharacters.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
