// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './css/base.css'
import './css/style.css'
import Vue from 'vue'
import App from './App'
import './config/rem.js'
import router from './router'
Vue.config.productionTip = true
import axios from './js/axios_config.js';
import api from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
import 'ant-design-vue/dist/antd.css';

import moment from 'moment';
import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { Layout, Button, Icon, Select, Dropdown, Menu, Input, Tree, TreeSelect, Breadcrumb, Table , DatePicker ,Switch,Popconfirm,Modal,message ,Radio,Upload,Steps,Tabs,InputNumber} from 'ant-design-vue';

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
Vue.use(Modal);
Vue.prototype.$message = message
Vue.use(Radio);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Tabs);
Vue.use(InputNumber);
import md5 from 'js-md5';
Vue.prototype.$md5 = md5
// const isDebug_mode = process.env.NODE_ENV !== 'production'
// Vue.config.debug = isDebug_mode
// Vue.config.devtools = isDebug_mode
// Vue.config.productionTip = isDebug_mode

message.config({
  top: `100px`,
  duration: 2200,
  maxCount: 3,
});

// 拦截器
let instance = axios.create();
// instance.defaults.headers.common['Authorization'] = "Bearer " + getCookie("userToken");//携带cookie
//instance.defaults.withCredentials = true;//让ajax携带cookie
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
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
    console.log(response,222222222222);
    return response;
  },
  error => {
    if (error.response) {
      console.log(error,66666666666);
      switch (error.response.status) {
        case 404:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error404',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          case 504:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面

          router.replace({
            path: 'error500',
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










//校验中英文文字符
Vue.prototype.vify_cn = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{0,50}$/gi;
  if (myreg.test(phone) !== true) {

    return false;
  } else {

    return true;
  }
  return true;
};
//校验中英文文字符
Vue.prototype.vify_cn16 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5a-zA-Z\d_]{2,16}$/gi;
  if (myreg.test(phone) !== true) {

    return false;
  } else {

    return true;
  }
  return true;
};
//校验中文字符
Vue.prototype.vify_cn2 = function (phone) {
  let myreg = /^[\u4e00-\u9fa5]+$/gi;
  if (myreg.test(phone) !== true) {
    console.log(211);
    return false;
  } else {
    console.log(3111);
    return true;
  }
  return true;
};
//校验50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号
Vue.prototype.vify_cn3 = function (phone) {
  let myreg =/^[\u4e00-\u9fa5a-z0-9A-Z\（\）\(\)\d_]{0,50}$/gi;
  if (myreg.test(phone) !== true) {
    console.log(211);
    return false;
  } else {
    console.log(3111);
    return true;
  }
  return true;
};


//验证邮箱格式
Vue.prototype.verEmail = function (str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true;
  }
};
//验证手机号码
Vue.prototype.verPhone = function (str) {
  var re =/^1[3456789]\d{9}$/
  if (re.test(str) !== true) {
    return false;
  } else {
    return true;
  }
};







/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
