import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: ()=> import("@/views/initYourLife.vue")
  },{
    path: '/yourLife',
    component: ()=> import("@/views/yourLife.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
