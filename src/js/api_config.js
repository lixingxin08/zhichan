// export const domain= process.env.API_ROOT; //silke矿池接口线上环境
const url1='/api'
const url2="http://192.168.16.114:84/HAIOT"
export default {
    login: `${url1}/login`,
    login2:`${url2}/register`,
    getValidateCode:`${url1}/login/getValidateCode`
}