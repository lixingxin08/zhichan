import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')
const login = () => import('@/views/login/login')
const asetgeografis = () => import('@/views/geographic/geographic') //地理资产

const watthourmeter = () => import('@/views/base/watthourmeter/watthourmeter') //基础配置 区域管理
const kotakpemantauan = () => import('@/views/equipmentassets/kotakpemantauan/kotakpemantauan') //监控箱信息
const tianglampu = () => import('@/views/equipmentassets/tianglampu/tianglampu') //路灯杆信息
const kontroler = () => import('@/views/equipmentassets/kontroler/kontroler') //控制器信息
const pengelompokan = () => import('@/views/equipmentassets/pengelompokan/pengelompokan') //分组管理
const kamera = () => import('@/views/equipmentassets/kamera/kamera') //摄像头信息
const siaranip = () => import('@/views/equipmentassets/siaranip/siaranip') //ip广播信息
const panggilbantuan = () => import('@/views/equipmentassets/panggilbantuan/panggilbantuan') //求助报警信息
const layarled = () => import('@/views/equipmentassets/layarled/layarled') //LED发布屏信息
const apinfo = () => import('@/views/equipmentassets/apinfo/apinfo') //AP信息
const lingkungan = () => import('@/views/equipmentassets/lingkungan/lingkungan') //环境要素信息
const masagaransiperalatan = () => import('@/views/equipmentassets/masagaransiperalatan/masagaransiperalatan')//设备质保期止

const error_404 = () => import('@/components/error_page/404.vue')
const error_403 = () => import('@/components/error_page/403.vue')
const error_500 = () => import('@/components/error_page/500.vue')
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: login,
    },

    {
      path: '/',
      name: 'asetgeografis',
      redirect: '/asetgeografis',
      meta: {
        title: '首页'
      },
      component: home,
      children: [{
          path: '/asetgeografis',
          name: 'asetgeografis',
          meta: {
            title: '地理资产'
          },
          component: asetgeografis
        },
        {
          path: '/watthourmeter',
          name: 'watthourmeter',
          meta: {
            title: '区域管理'
          },
          component: watthourmeter,
        },

        {
          path: '/kotakpemantauan',
          name: 'kotakpemantauan',
          meta: {
            title: '监控箱信息'
          },
          component: kotakpemantauan,
        },

        {
          path: '/tianglampu',
          name: 'tianglampu',
          meta: {
            title: '路灯杆信息'
          },
          component: tianglampu,
        },
        {
          path: '/kontroler',
          name: 'kontroler',
          meta: {
            title: '控制器信息'
          },
          component: kontroler,
        },
        {
          path: '/pengelompokan',
          name: 'pengelompokan',
          meta: {
            title: '分组管理'
          },
          component: pengelompokan,
        },
        {
          path: '/kamera',
          name: 'kamera',
          meta: {
            title: '摄像头信息'
          },
          component: kamera,
        },
        {
          path: '/siaranip',
          name: 'siaranip',
          meta: {
            title: 'IP广播信息'
          },
          component: siaranip,
        },
        {
          path: '/panggilbantuan',
          name: 'panggilbantuan',
          meta: {
            title: '求组报警信息'
          },
          component: panggilbantuan,
        },
        {
          path: '/layarled',
          name: 'layarled',
          meta: {
            title: 'LED发布屏信息'
          },
          component: layarled,
        },
        {
          path: '/apinfo',
          name: 'apinfo',
          meta: {
            title: 'AP信息'
          },
          component: apinfo,
        },
        {
          path: '/lingkungan',
          name: 'lingkungan',
          meta: {
            title: '环境要素信息'
          },
          component: lingkungan,
        },
        {
          path: '/masagaransiperalatan',
          name: 'masagaransiperalatan',
          meta: {
            title: '设备质保期止'
          },
          component: masagaransiperalatan,
        },
      ]
    },

    {
      path: '',
      redirect: '/home'
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
