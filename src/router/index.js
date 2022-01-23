import { createRouter, createWebHashHistory } from 'vue-router'

const currentView = "god-view"

const routes = [
  {
    path: '/',
    component: ()=> currentView=='god-view'? import('@/views-next/god-view/index.vue') : import("@/views-next/player-view/index.vue")
  },{
    path: '/god-view',
    component: ()=> import('@/views-next/god-view/index.vue'),
    children:[{
      path:'characters',
      name: 'characters',
      component: ()=> import('@/views-next/god-view/SeeCharacters.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
