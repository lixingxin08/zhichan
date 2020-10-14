// export const domain= process.env.API_ROOT; //silke矿池接口线上环境
import base from './base_url.js'

export default {

  dictionarycombobox: base.baseUrl2 + `/config/dictionary/combobox`, //数据字典下拉列表框接口

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
  devicemonitorboxline: base.baseUrl1 + `/device/monitor-box/line/listByBoxCode`, //监控箱线路列表 根据deviceCode
  devicemonitorboxlinebyid: base.baseUrl1 + `/device/monitor-box/line/list`, //监控箱线路列表 根据deviceid
  devicemonitorboxlineremove: base.baseUrl1 + `/device/monitor-box/line/remove`, //监控箱线路列表删除接口
  devicemonitorboxlinefrom: base.baseUrl1 + `/device/monitor-box/line/form`, //监控箱线路列表表单接口

  devicelightpoleform: base.baseUrl1 + `/device/lightpole/form`, //路灯杆 表单接口
  devicelightpoledetail: base.baseUrl1 + `/device/lightpole/detail`, //路灯杆 详情接口
  devicelightpoleremove: base.baseUrl1 + `/device/lightpole/remove`, //路灯杆 移除接口
  devicelightpolepage: base.baseUrl1 + `/device/lightpole/page`, //路灯杆 分页接口
  devicelightpoletree: base.baseUrl1 + `/device/lightpole/tree`, //路灯杆 树接口
  devicelightboxgetmodel: base.baseUrl2 + `/auth/customer-model/pole/combobox`, //路灯杆型号列表

  devicepolecontrollerform: base.baseUrl1 + `/device/pole-controller/form`, //路灯控制器 表单接口
  devicepolecontrollerdetail: base.baseUrl1 + `/device/pole-controller/detail`, //路灯控制器 详情接口
  devicepolecontrollerremove: base.baseUrl1 + `/device/pole-controller/remove`, //路灯控制器 移除接口
  devicepolecontrollerpage: base.baseUrl1 + `/device/pole-controller/page`, //路灯控制器 分页接口
  devicepolecontrollertree: base.baseUrl1 + `/device/pole-controller/tree`, //路灯控制器 树接口

  devicepolecontrollermodel: base.baseUrl2 + `/auth/customer-model/controller/combobox`, //路灯控制器 型号列表

  devicecameraform: base.baseUrl1 + `/device/camera/form`, //摄像头   表单接口
  devicecameradetail: base.baseUrl1 + `/device/camera/detail`, //摄像头 详情接口
  devicecameraremove: base.baseUrl1 + `/device/camera/remove`, //摄像头 删除接口
  devicecamerapage: base.baseUrl1 + `/device/camera/page`, //摄像头 分页接口
  devicepolecontrollercamera: base.baseUrl2 + `/auth/customer-model/camera/combobox`, //摄像头 型号列表

  devicedevicebodypage: base.baseUrl1 + `/device/public-broadcast/page`, //公共广播 分页
  devicedevicebodydetail: base.baseUrl1 + `/device/public-broadcast/detail`, //公共广播 详情
  devicedevicebodyform: base.baseUrl1 + `/device/public-broadcast/form`, //公共广播 表单
  devicedevicebodyremove: base.baseUrl1 + `/device/public-broadcast/remove`, //公共广播 删除
  devicepolecontrollerdevicebody: base.baseUrl2 + `/auth/customer-model/public-broadcast/combobox`, //广播 型号列表

  devicepolicepage: base.baseUrl1 + `/device/turn-police/page`,//警报 分页
  devicepolicedetail: base.baseUrl1 + `/device/turn-police/detail`,//警报 详情
  devicepoliceform: base.baseUrl1 + `/device/turn-police/form`,//警报 表单
  devicepoliceremove: base.baseUrl1 + `/device/turn-police/remove`,//警报 删除
  devicepolicemodellist: base.baseUrl2 + `/auth/customer-model/turn-police/combobox`,//警报 型号列表

  devicewifipage: base.baseUrl1 + `/device/wifi/page`,//WIFI 分页
  devicewifidetail: base.baseUrl1 + `/device/wifi/detail`,//WIFI 详情
  devicewifiform: base.baseUrl1 + `/device/wifi/form`,//WIFI 表单
  devicewifiremove: base.baseUrl1 + `/device/wifi/remove`,//WIFI 删除
  devicewifimodellist: base.baseUrl2 + `/auth/customer-model/wifi/combobox`,//WIFI 型号列表


  deviceenvironmentalpage: base.baseUrl1 + `/device/environmental-elements/page`,//环境传感器 分页
  deviceenvironmentaldetail: base.baseUrl1 + `/device/environmental-elements/detail`,//环境传感器 详情
  deviceenvironmentalform: base.baseUrl1 + `/device/environmental-elements/form`,//环境传感器 表单
  deviceenvironmentalremove: base.baseUrl1 + `/device/environmental-elements/remove`,//环境传感器 删除
  deviceenvironmentalmodellist: base.baseUrl2 + `/auth/customer-model/environmental-elements/combobox`,//环境传感器 型号列表

  devicemultimediapage: base.baseUrl1 + `/device/multimedia-screen/page`,//多媒体发布屏 分页
  devicemultimediadetail: base.baseUrl1 + `/device/multimedia-screen/detail`,//多媒体发布屏 详情
  devicemultimediaform: base.baseUrl1 + `/device/multimedia-screen/form`,//多媒体发布屏 表单
  devicemultimediaremove: base.baseUrl1 + `/device/multimedia-screen/remove`,//多媒体发布屏 删除
  devicemultimediamodellist: base.baseUrl2 + `/auth/customer-model/multimedia-screen/combobox`,//多媒体发布屏 型号列表

  devicelamppage: base.baseUrl1 + `/device/lanterns/page`,//灯具 分页
  devicelampdetail: base.baseUrl1 + `/device/lanterns/detail`,//灯具 详情
  devicelampform: base.baseUrl1 + `/device/lanterns/form`,//灯具 表单
  devicelampremove: base.baseUrl1 + `/device/lanterns/remove`,//灯具 删除
  devicelampmodellist: base.baseUrl2 + `/auth/customer-model/lanterns/combobox`,//灯具 型号列表
  devicelamplist: base.baseUrl1 + `/device/lanterns/combobox`, //路灯控制器 灯具接口


  deviceguaranteeform: base.baseUrl1 + `/device/guarantee/form`, //质保期表单
  deviceguaranteedetail: base.baseUrl1 + `/device/guarantee/detail`, //质保期详情
  deviceguaranteepage: base.baseUrl1 + `/device/guarantee/list`, //质保期分页


  parampage: base.baseUrl2 + `/propertyValue/detail`, //授权设备运行参数==产品规格

  devicepolecontrollerpage: base.baseUrl1 + `/device/pole-controller/page`, //控制器分页
  devicepolecontrollerremove: base.baseUrl1 + `/device/pole-controller/remove`, //控制器删除接口
  devicepolecontrollerform: base.baseUrl1 + `/device/pole-controller/form`, //控制器表单接口
  devicepolecontrollerdetail: base.baseUrl1 + `/device/pole-controller/detail`, //控制器详情接口


}
