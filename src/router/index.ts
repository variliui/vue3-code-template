import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/homePage',
      meta: {
        isShow: false
      }
    },
    {
      path: '/homePage',
      component: () => import('~/views/HomePage/HomePage.vue'),
      name: '首页',
      meta: {
        icon: 'ant-design:home-outlined',
        alwaysShow: true,
        title: '首页',
        isShow: true
      }
    }
  ]
})

export default router
