let thisurl = window.location.href.split('/#')
console.log(thisurl, 'thisurlthisurlthisurl');
let bb = thisurl[0].split('/asset')
export default {
  baseUrl1: bb[0].indexOf('localhost') >= 0 ? 'http://192.168.3.86:8093/asset' : bb[0] + '/asset/action', //资产基础url
  baseUrl2: bb[0].indexOf('localhost') >= 0 ? 'http://192.168.3.86:8092/authorization' : bb[0] +
    '/authorization/action' //授权基础url
}
