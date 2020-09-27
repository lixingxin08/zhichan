// export const domain= process.env.API_ROOT; //silke矿池接口线上环境
import base from './base_url.js'

export default {

  areasform: base.baseUrl1 + `/config/areas/form`, //  设备授权区域表单接口
  areaspage: base.baseUrl1 + `/config/areas/page`, //设备授权区域分页接口
  areastree: base.baseUrl1 + `/config/areas/tree`, //设备授权区域数接口
  areasremove: base.baseUrl1 + `/config/areas/remove`, //设备授权区域移除接口
  areasdetail: base.baseUrl1 + `/config/areas/detail`, //设备区划详情

  devicemonitorboxform: base.baseUrl1 + `/device/monitor-box/form`, //  监控箱管理表单接口
  devicemonitorboxdetail: base.baseUrl1 + `/device/monitor-box/detail`, //  监控箱详情接口
  devicemonitorboxremove: base.baseUrl1 + `/device/monitor-box/remove`, //  监控箱移除接口
  devicemonitorboxpage: base.baseUrl1 + `/device/monitor-box/page`, //  监控箱page 接口
  devicemonitorboxtree: base.baseUrl1 + `/device/monitor-box/tree`, //监控箱树接口
  devicemonitorboxgetmodel: base.baseUrl2 + `/auth/customer-model/box/combobox`, //监控箱型号列表
  devicemonitorboxproject: base.baseUrl2 + `/customer/project/combobox`, //监控箱归属项目列表
  devicemonitorboxprojectphase: base.baseUrl2 + `/customer/projectPhase/combobox`, //归属项目阶段列表
  devicemonitorboxline: base.baseUrl1 + ` /device/monitor-box/line/listByBoxCode`, //监控箱线路列表 根据deviceCode
  devicemonitorboxlinebyid: base.baseUrl1 + `/device/monitor-box/line/list`, //监控箱线路列表 根据deviceid
  devicemonitorboxlineremove: base.baseUrl1 + `/device/monitor-box/line/remove`, //监控箱线路列表删除接口
  devicemonitorboxlinefrom: base.baseUrl1 + `/device/monitor-box/line/from`, //监控箱线路列表表单接口

  devicelightpoleform: base.baseUrl1 + `/device/lightpole/form`, //路灯杆 表单接口
  devicelightpoledetail: base.baseUrl1 + `/device/lightpole/detail`, //路灯杆 详情接口
  devicelightpoleremove: base.baseUrl1 + `/device/lightpole/remove`, //路灯杆 移除接口
  devicelightpolepage: base.baseUrl1 + `/device/lightpole/page`, //路灯杆 分页接口
  devicelightpoletree: base.baseUrl1 + `/device/lightpole/tree`, //路灯杆 树接口

  devicepolecontrollerform: base.baseUrl1 + `/device/pole-controller/form`, //路灯控制器 表单接口
  devicepolecontrollerdetail: base.baseUrl1 + `/device/pole-controller/detail`, //路灯控制器 详情接口
  devicepolecontrollerremove: base.baseUrl1 + `/device/pole-controller/remove`, //路灯控制器 移除接口
  devicepolecontrollerpage: base.baseUrl1 + `/device/pole-controller/page`, //路灯控制器 分页接口
  devicepolecontrollertree: base.baseUrl1 + `/device/pole-controller/tree`, //路灯控制器 树接口

  devicecameraform: base.baseUrl1 + `/device/camera/form`, //摄像头   表单接口
  devicecameradetail: base.baseUrl1 + `/device/camera/detail`, //摄像头 表单接口
  devicecameraremove: base.baseUrl1 + `/device/camera/remove`, //摄像头 表单接口
  devicecamerapage: base.baseUrl1 + `/device/camera/page`, //摄像头 表单接口

  devicedevicebodyform: base.baseUrl1 + `/device/device-body/form`, //广播 报警 wifi 环境 多媒体发布屏表单接口
  devicedevicebodydetail: base.baseUrl1 + `/device/device-body/detail`, //广播 报警 wifi 环境 多媒体发布屏 表单接口
  devicedevicebodyremove: base.baseUrl1 + `/device/device-body/remove`, //广播 报警 wifi 环境 多媒体发布屏 表单接口
  devicedevicebodypage: base.baseUrl1 + `/device/device-body/page`, //广播 报警 wifi 环境 多媒体发布屏 表单接口

  deviceguaranteeform: base.baseUrl1 + `/device/guarantee/form`, //质保期表单
  deviceguaranteedetail: base.baseUrl1 + `/device/guarantee/detail`, //质保期详情
  deviceguaranteepage: base.baseUrl1 + `/device/guarantee/page`, //质保期详情




}
