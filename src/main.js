// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/base.css'
import './css/style.css'
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = true
import axios from './js/axios_config.js';
import api from './js/api_config.js';
import utils from './utils/utils.js';
import config from './utils/config.js'
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.$config=config
 import isLeftTree from './components/tree/tree.vue'
Vue.component("isLeftTree", isLeftTree);
import 'ant-design-vue/dist/antd.css';
import {
  Layout,
  Button,
  Icon,
  Select,
  Dropdown,
  Menu,
  Input,
  Tree,
  TreeSelect,
  Breadcrumb,
  Table,
  DatePicker,
  Switch,
  Popconfirm,
  Checkbox,
  Form,
  Steps,
  InputNumber,
  Upload,
  message,
  Descriptions,
  Radio
} from 'ant-design-vue';
Vue.use(Dropdown);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Tree);
Vue.use(TreeSelect);
Vue.use(Breadcrumb);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Checkbox);
Vue.use(Form);
Vue.use(Steps);
Vue.use(InputNumber);
Vue.use(Upload);
Vue.use(Radio);
Vue.prototype.$message = message
Vue.use(Descriptions)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5
// const isDebug_mode = process.env.NODE_ENV !== 'production'
// Vue.config.debug = isDebug_mode
// Vue.config.devtools = isDebug_mode
// Vue.config.productionTip = isDebug_mode

window.addEventListener(
  "message",
  function (e) {
    if (e.data.type !== "webpackOk") {
      if (e.data.accountId == "" || e.data.accountId == undefined) {
      } else {
        localStorage.setItem("usermsg", JSON.stringify(e.data), 10000000000000);
      }
    }
  },
  false
);

// http response 拦截器
axios.create({
  timeout: 5000
})

axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    let token = ""
    if (window.location.host.indexOf("localhost") >= 0) {
      token ="eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzIjoxNjAxMjk0MTc1MjEzLCJ0b2tlbklkIjoiMTI4ZTczZDU1ZmY3NDBjYzhiN2I4MWQxMDExYjI0NjYiLCJ1c2VySWQiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMjIifQ.GDQUeFbQ7-M0KiJTzsoOYdNSdMGWFfXXoaJA9_Wpmd0"
    
    } else {
      token = JSON.parse(localStorage.getItem('usermsg')).token || ""
    }
    config.headers.common['token'] = token
    return config;
  },
  error => {
    return Promise.error(error);
  }
)
let backnum = 0
axios.interceptors.response.use(
  response => {
    backnum++
    let aa = JSON.parse(localStorage.getItem('usermsg'))
    aa.token = response.headers.token
    let thisurl = window.location.href.split('/#')
    let bb = thisurl[0].split('/authorization')
    localStorage.setItem('usermsg', JSON.stringify(aa))
    if (response.data.resultMsg == "执行成功，但没有获取到数据") {
      response.data.data=[]
      response.data.data.list=[]

    }
    if (response.data.resultCode == "20100") {
      message.error("令牌错误，请重新登录",5)
      if (backnum >= 2) {
        window.location.href = bb[0]
      }
    }
    if (response.data.resultCode == "20101") {
      message.error("未登录，请先登录",5)
      if (backnum >= 3) {
        window.location.href = bb[0]
      }
    }
    if (response.data.code == "20102") {
      message.error("你的账号已在其他地方登录，请重新登录",5)
      if (backnum >= 3) {
        window.location.href = bb[0]
      }
    }
    if (response.data.resultCode == "20103") {
      message.error("登录已过期，请重新登录！",5)
      if (backnum >= 3) {
        window.location.href = bb[0]
      }
    }
    if (response.data.resultCode == "20104") {
      message.error("登录已失效，请重新登录！",5)
      if (backnum >= 3) {
        window.location.href = bb[0]
      }
    }
    if (response.data.resultCode == "20105") {
      message.error("登录已失效，请重新登录！",5)
      if (backnum >= 3) {
        window.location.href = bb[0]
      }
    }

    return response;
  },
  error => {
    if (error.response) {
      console.log(error, 'errorerrorerrorerror');
      console.log(error.response, 'errorerrorerrorerror');
      switch (error.response.status) {
        case 404:
          router.replace({
            path: '/error404',
          })
        case 504:
          router.replace({
            path: '/error504',
          })
        case 500:
          router.replace({
            path: '/error500',
          })
        case 504:
          router.replace({
            path: '/error504',
          })
        case 403:
          router.replace({
            path: '/error403',
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
