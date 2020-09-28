import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域

//axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'action/' : '/api';
//axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'http://192.168.3.86:8093/assets':'/api';
//axios.defaults.baseURL='http://192.168.3.86:8093/asset'
//axios.defaults.baseURL = '8088/haiot-auth';
axios.defaults.withCredentials = true;
axios.defaults.allowCredentials = true

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.create({
    timeout: 5000
})

axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
       // const token = JSON.parse(localStorage.getItem('usermsg')).token || ""
       // config.headers.common['token'] = token
        return config;
    },
    error => {
        return Promise.error(error);
    }
)
let aa= window.location.href.split('/#')
let bb=aa[0].split('/assets')
// axios.interceptors.response.use(
//     response => {
//             let aa = JSON.parse(localStorage.getItem('usermsg'))
//             aa.token = response.headers.token
//             // localStorage.removeitem('usermsg')
//             localStorage.setItem('usermsg', JSON.stringify(aa))
//         if (response.code == "20100") {
//             message.error("令牌错误，请重新登录")
//             window.location.href= bb[0]
//         }
//         if (response.code == "20101") {
//             message.error("未登录，请先登录")
//             window.location.href= bb[0]
//         }
//         if (response.code == "20102") {
//             message.error("你的账号已在其他地方登录，请重新登录")
//             window.location.href= bb[0]
//         }
//         if (response.code == "20103") {
//             message.error("登录已过期，请重新登录！")
//             window.location.href= bb[0]
//         }
//         if (response.code == "20104") {
//             message.error("登录已失效，请重新登录！")
//             window.location.href= bb[0]
//         }
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 404:
//                     router.replace({
//                         path: 'error404',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//                 case 504:
//                     router.replace({
//                         path: 'error504',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//                 case 500:
//                     router.replace({
//                         path: 'error500',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//                 case 504:
//                     router.replace({
//                         path: 'error504',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//                 case 403:
//                     router.replace({
//                         path: 'error403',
//                         query: {
//                             redirect: router.currentRoute.fullPath
//                         }
//                     })
//             }
//         }
//         return Promise.reject(error.response.data)
//     }
// )

export default axios;
