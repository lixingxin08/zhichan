import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域

//axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'action/' : '/api';
//axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'http://192.168.3.86:8093/assets':'/api';
axios.defaults.baseURL=''
//axios.defaults.baseURL = '8088/haiot-auth';
axios.defaults.withCredentials = true;
axios.defaults.allowCredentials = true

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';


export default axios;
