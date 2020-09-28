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
  Descriptions
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
Vue.prototype.$message = message
Vue.use(Descriptions)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5
// const isDebug_mode = process.env.NODE_ENV !== 'production'
// Vue.config.debug = isDebug_mode
// Vue.config.devtools = isDebug_mode
// Vue.config.productionTip = isDebug_mode



// 拦截器
let instance = axios.create({
  timeout: 10000
});
// instance.defaults.headers.common['Authorization'] = "Bearer " + getCookie("userToken");//携带cookie
//instance.defaults.withCredentials = true;//让ajax携带cookie
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(
  config => {
    // if (sessionStorage.getItem('token')) { // 若存在token，则每个Http Header都加上token
    //   config.headers.Authorization = `token ${sessionStorage.getItem('token')}`
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error404',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        case 500:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error500',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        case 403:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error403',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
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
