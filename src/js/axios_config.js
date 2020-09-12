import axios from 'axios'
// import { domain } from './api_config'
// axios.defaults.baseURL = '';
//解决跨域
axios.defaults.withCredentials = true;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('istoken')
export default axios;