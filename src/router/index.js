import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: ()=> import("@/views/init/initYourLife.vue")
  },{
    path: '/yourLife0',
    component: ()=> import("@/views/yourLife.vue")
  },{
    path: '/yourLife',
    component: ()=> import("@/views/overview/Index.vue")
  },{
    path: '/yourLife/family',
    component: ()=> import("@/views/singleView/family/Index.vue")
  },{
    path: '/yourLife/body',
    component: ()=> import("@/views/singleView/body/Index.vue")
  },{
    path: '/yourLife/intercourse',
    component: ()=> import("@/views/singleView/intercourse/Index.vue")
  },{
    path: '/yourLife/career',
    component: ()=> import("@/views/singleView/career/Index.vue")
  },{
    path: '/newWorld',
    component: ()=> import("@/views2/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
