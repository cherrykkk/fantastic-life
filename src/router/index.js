import { createRouter, createWebHashHistory } from 'vue-router'

const currentView = "player-view"

const routes = [
  // {
  //   path: '/',
  //   component: ()=> currentView=='god-view'? import('@/views/god-view/index.vue') : import("@/views/player-view/index.vue")
  // },
  {
    path: '/',
    component: ()=> import('@/layout/Menu.vue')
  },{
    path: '/god-view',
    component: ()=> import('@/views/god-view/index.vue'),
    children: [
      {
        path: 'characters',
        name: 'characters',
        component: ()=> import('@/views/god-view/SeeCharacters.vue')
      },{
        path: 'families',
        name: 'families',
        component: ()=> import('@/views/god-view/seeFamily.vue')
      }
    ]
  },{
    path: '/player-view',
    component: ()=> import("@/views/player-view/index.vue")
  },{
    path: '/game',
    component: ()=> import('@/views/player-view/game/GatherHerbs.vue')
  },{
    path: '/game2',
    component: ()=> import('@/views/player-view/game/FlySword.vue')
  },{
    path: '/gameHunt',
    component: ()=> import('@/views/player-view/game/GameHunt.vue')
  },{
    path: '/gameFarm',
    component: ()=> import('@/views/player-view/game/GameFarm.vue')
  },{
    path: '/livelihood',
    component: ()=> import('@/views/player-view/Livelihood.vue')
  },{
    path: '/memory',
    component: ()=> import('@/views/player-view/Memory.vue')
  },{
    path: '/menu',
    component: ()=> import('@/layout/Menu.vue')
  },{
    path: '/errorpage',
    component: ()=> import('@/views/player-view/ErrorPage.vue')
  },{
    path: '/relationship',
    component: ()=> import('@/views/player-view/Relationship.vue')
  },{
    path: '/SettingInGame',
    component: ()=> import('@/layout/SettingInGame.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
