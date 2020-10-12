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
  Radio,
  ConfigProvider
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
Vue.use(ConfigProvider)

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
        localStorage.setItem("asset", JSON.stringify(e.data), 10000000000000);
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
      token ="eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJleHBpcmVzIjoxNjAyMjIyNzk0NTkyLCJ0b2tlbklkIjoiMDBlM2IwMWNmYmM4NDhkZWFmNGYwYWQxNjRlMGI0NjQiLCJ1c2VySWQiOiI0ZTgxNWU2NDQxMWM0YWFiYWI2NjhjYmVlODkwNzdlOCJ9.keVTegBYdE5QIQW9MshCjmkeWECbm4ZppDtF66RBhQ0"

    } else {
      if(localStorage.getItem('asset'))
      token = JSON.parse(localStorage.getItem('asset')).token || ""
    }
    config.headers.common['token'] = token
    return config;
  },
  error => {
    return Promise.error(error);
  }
)
let backnum = 0
let thisurl = window.location.href.split('/#')
let bb = thisurl[0].split('/authorization')
axios.interceptors.response.use(
  response => {
    backnum++
    if(localStorage.getItem('asset')){
    let aa = JSON.parse(localStorage.getItem('asset'))
    aa.token = response.headers.token
    localStorage.setItem('asset', JSON.stringify(aa))
    }
    if (response.data.resultMsg == "执行成功，但没有获取到数据") {
      response.data.data=[]
      response.data.data.list=[]

    }
    if (response.data.resultCode == "20100") {
      message.error("令牌错误，请重新登录",5)
      //if (backnum >= 2) {
        window.location.href = bb[0]
     // }
    }
    if (response.data.resultCode == "20101") {
      message.error("未登录，请先登录",5)
     // if (backnum >= 3) {
        window.location.href = bb[0]
     // }
    }
    if (response.data.code == "20102") {
      message.error("你的账号已在其他地方登录，请重新登录",5)
     // if (backnum >= 3) {
        window.location.href = bb[0]
      //}
    }
    if (response.data.resultCode == "20103") {
      message.error("登录已过期，请重新登录！",5)
    //  if (backnum >= 3) {
        window.location.href = bb[0]
     // }
    }
    if (response.data.resultCode == "20104") {
      message.error("登录已失效，请重新登录！",5)
     // if (backnum >= 3) {
        window.location.href = bb[0]
     // }
    }
    if (response.data.resultCode == "20105") {
      message.error("登录已失效，请重新登录！",5)
      //if (backnum >= 3) {
        window.location.href = bb[0]
     // }
    }

    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response.status, 'errorerrorerrorerror');
      // if (error.response.status==404) {
      //   router.replace({
      //     path: '/error404',
      //   })
      // }
      // if (error.response.status==403) {
      //   router.replace({
      //     path: '/error403',
      //   })
      // }
      // if (error.response.status==404) {
      //   router.replace({
      //     path: '/error404',
      //   })
      // }
      // if (error.response.status==500) {
      //   router.replace({
      //     path: '/error500',
      //   })
      // }
      // if (error.response.status==504) {
      //   router.replace({
      //     path: '/error504',
      //   })
      // }
    }
    return Promise.reject(error.response.data)
  }
)
import isLeftTree from './components/tree/tree.vue'
Vue.component("isLeftTree", isLeftTree);
import isExpandTree from './components/tree/expandtree.vue'
Vue.component("isExpandTree", isExpandTree);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
