import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/views/home/home')
const login = () => import('@/views/login/login')
const asetgeografis = () => import('@/views/geographic/geographic') //地理资产

const watthourmeter = () => import('@/views/base/watthourmeter/watthourmeter') //基础配置 区域管理
const addwatthourmeter = () => import('@/views/base/watthourmeter/add/add') //基础配置 区域管理 新增
const kotakpemantauan = () => import('@/views/equipmentassets/kotakpemantauan/kotakpemantauan') //监控箱信息
const addkotakpemantauan = () => import('@/views/equipmentassets/kotakpemantauan/add/add') //监控箱信息 新增
const tianglampu = () => import('@/views/equipmentassets/tianglampu/tianglampu') //路灯杆信息
const addtianglampu = () => import('@/views/equipmentassets/tianglampu/add/add') //路灯杆信息 新增
const kontroler = () => import('@/views/equipmentassets/kontroler/kontroler') //控制器信息
const addkontroler = () => import('@/views/equipmentassets/kontroler/add/add') //控制器信息 新增
const pengelompokan = () => import('@/views/equipmentassets/pengelompokan/pengelompokan') //分组管理
const kamera = () => import('@/views/equipmentassets/kamera/kamera') //摄像头信息
const addkamera = () => import('@/views/equipmentassets/kamera/add/add') //摄像头信息 新增
const siaranip = () => import('@/views/equipmentassets/siaranip/siaranip') //ip广播信息
const addsiaranip = () => import('@/views/equipmentassets/siaranip/add/add') //ip广播信息 新增
const panggilbantuan = () => import('@/views/equipmentassets/panggilbantuan/panggilbantuan') //求助报警信息
const addpanggilbantuan = () => import('@/views/equipmentassets/panggilbantuan/add/add') //求助报警信息 新增
const layarled = () => import('@/views/equipmentassets/layarled/layarled') //发布屏信息
const addlayarled = () => import('@/views/equipmentassets/layarled/add/add') //发布屏信息
const apinfo = () => import('@/views/equipmentassets/apinfo/apinfo') //AP信息
const addapinfo = () => import('@/views/equipmentassets/apinfo/add/add') //AP信息 新增
const lingkungan = () => import('@/views/equipmentassets/lingkungan/lingkungan') //环境要素信息
const addlingkungan = () => import('@/views/equipmentassets/lingkungan/add/add') //环境要素信息 新增
const masagaransiperalatan = () => import('@/views/equipmentassets/masagaransiperalatan/masagaransiperalatan') //设备质保期止

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
          path: '/addwatthourmeter',
          name: 'watthourmeter',
          meta: {
            title: '区域管理'
          },
          component: addwatthourmeter,
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
          path: '/addkotakpemantauan',
          name: 'kotakpemantauan',
          meta: {
            title: '监控箱信息'
          },
          component: addkotakpemantauan,
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
          path: '/addtianglampu',
          name: 'tianglampu',
          meta: {
            title: '路灯杆信息'
          },
          component: addtianglampu,
        },
        {
          path: '/kontroler',
          name: 'kontroler',
          meta: {
            title: '路灯控制器'
          },
          component: kontroler,
        },
        {
          path: '/addkontroler',
          name: 'kontroler',
          meta: {
            title: '路灯控制器'
          },
          component: addkontroler,
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
          path: '/addkamera',
          name: 'kamera',
          meta: {
            title: '摄像头信息'
          },
          component: addkamera,
        },
        {
          path: '/siaranip',
          name: 'siaranip',
          meta: {
            title: '公共广播'
          },
          component: siaranip,
        },
        {
          path: '/addsiaranip',
          name: 'siaranip',
          meta: {
            title: '公共广播'
          },
          component: addsiaranip,
        },
        {
          path: '/panggilbantuan',
          name: 'panggilbantuan',
          meta: {
            title: '求组报警'
          },
          component: panggilbantuan,
        },
        {
          path: '/addpanggilbantuan',
          name: 'panggilbantuan',
          meta: {
            title: '求组报警'
          },
          component: addpanggilbantuan,
        },
        {
          path: '/layarled',
          name: 'layarled',
          meta: {
            title: '多媒体发布屏'
          },
          component: layarled,
        },
        {
          path: '/addlayarled',
          name: 'layarled',
          meta: {
            title: '多媒体发布屏'
          },
          component: addlayarled,
        },
        {
          path: '/apinfo',
          name: 'apinfo',
          meta: {
            title: '共享WIFI'
          },
          component: apinfo,
        },
        {
          path: '/addapinfo',
          name: 'apinfo',
          meta: {
            title: '共享WIFI'
          },
          component: addapinfo,
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
          path: '/addlingkungan',
          name: 'lingkungan',
          meta: {
            title: '环境要素信息'
          },
          component: addlingkungan,
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
