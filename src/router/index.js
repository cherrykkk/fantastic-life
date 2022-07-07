import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: ()=> import('@/layout/Menu.vue')
  },{
    path: '/god-view',
    component: ()=> import('@/views/GodView.vue')
  },{
    path: '/personal-view',
    component: ()=> import("@/views/PersonalView.vue")
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
    component: ()=> import('@/views/LivelihoodView.vue')
  },{
    path: '/memory-view',
    component: ()=> import('@/views/MemoryView.vue')
  },{
    path: '/menu',
    component: ()=> import('@/layout/Menu.vue')
  },{
    path: '/errorpage',
    component: ()=> import('@/views/player-view/ErrorPage.vue')
  },{
    path: '/relationship',
    component: ()=> import('@/views/RelationshipView.vue')
  },{
    path: '/SettingInGame',
    component: ()=> import('@/views/SettingInGame.vue')
  },{
    path: '/area-view',
    component: ()=> import('@/views/AreaView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
