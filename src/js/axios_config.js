import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?'/zuul/authorization':'/api';
// axios.defaults.baseURL = '8088/haiot-auth';
axios.defaults.withCredentials = true;
axios.defaults.allowCredentials=true

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
try {
    axios.defaults.headers.common['sessionId'] = JSON.parse(localStorage.getItem('usermsg')).iscookie
} catch (error) {
    
}
export default axios;
