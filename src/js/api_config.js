// export const domain= process.env.API_ROOT; //silke矿池接口线上环境


export default {

  areasform: `/config/areas/form`, //  设备授权区域表单接口
  areaspage: `/config/areas/page`, //设备授权区域分页接口
  areastree: `/config/areas/tree`, //设备授权区域数接口
  areasremove: `/config/areas/remove`, //设备授权区域移除接口

  devicemonitorboxform: `/device/monitor-box/form`, //  监控箱管理表单接口
  devicemonitorboxdetail: `/device/monitor-box/detail`, //  监控箱详情接口
  devicemonitorboxremove: `/device/monitor-box/remove`, //  监控箱移除接口
  devicemonitorboxpage: `/device/monitor-box/page`, //  监控箱page 接口
}
