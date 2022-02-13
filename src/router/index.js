import { createRouter, createWebHashHistory } from 'vue-router'

const currentView = "player-view"

const routes = [
  {
    path: '/',
    component: ()=> currentView=='god-view'? import('@/views/god-view/index.vue') : import("@/views/player-view/index.vue")
  },{
    path: '/god-view',
    component: ()=> import('@/views/god-view/index.vue'),
    children:[
      {
        path: 'characters',
        name: 'characters',
        component: ()=> import('@/views/god-view/SeeCharacters.vue')
      },{
        path: 'families',
        name: 'families',
        component: ()=> import('@/views/god-view/seeFamily.vue')
      },{
        path: 'archives',
        name: 'archives',
        component: ()=> import('@/views/god-view/seeArchive.vue')
      }
    ]
  },{
    path: '/game',
    component: ()=> import('@/views/player-view/game/GatherHerbs.vue')
  },{
    path: '/livelihood',
    component: ()=> import('@/views/player-view/Livelihood.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
