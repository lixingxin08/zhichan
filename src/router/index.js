import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')
const map = () => import('@/views/map/map')


const error_404 = () => import('@/components/error_page/404.vue')
const error_403 = () => import('@/components/error_page/403.vue')
const error_500 = () => import('@/components/error_page/500.vue')
Vue.use(Router)
export default new Router({
  routes: [{
      path: '',
      redirect: '/home/map'
    },

    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: home,
      children:[
        {
        path: '/home/map',
        name: 'map',
        meta: {
          title: '地图资产'
        },
        component: map,
      }]
    },
    {
      path: '/error404',
      name: 'error_404',
      component: error_404
    },
    {
      path: '/error403',
      name: 'error_403',
      component: error_403
    },
    {
      path: '/error500',
      name: 'error_500',
      component: error_500
    },
  ]
})
