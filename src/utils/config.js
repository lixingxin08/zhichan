const pagination = {
  "total": 0, //总页数
  "pageSize": 20, //每页中显示20条数据
  "showSizeChanger": true,
  "current": 1, //当前页
  "page": 1, //几页
  "size": "default",
  "pageSizeOptions": [ "20", "50", "100"], //每页中显示的数据
  "showTotal": (total) => `共有 ${total} 条数据`, //分页中显示总的数据
}
const statueList = [{
  comboBoxId: '0',
  comboBoxName: '禁用'
}, {
  comboBoxId: '1',
  comboBoxName: '启用'
}]
const lanternsList = [{
  comboBoxId: 0,
  comboBoxName: 'LED灯'
}, {
  comboBoxId: 1,
  comboBoxName: '高压钠灯'
}]
const useTypeList = [{
  comboBoxId: 0,
  comboBoxName: '虚拟监控箱'
}, {
  comboBoxId: 1,
  comboBoxName: '真实监控箱'
}]
const lampuUseTypeList = [{
  comboBoxId: 0,
  comboBoxName: '普通路灯杆'
}, {
  comboBoxId: 1,
  comboBoxName: '智慧路灯杆'
}]
const lineStatueList = [{
    comboBoxId: 0,
    comboBoxName: '备用'
  },
  {
    comboBoxId: 1,
    comboBoxName: '启用'
  }, {
    comboBoxId: 2,
    comboBoxName: '已报废'
  }
]
const treeData=[]
export default {
  pagination, //分页信息
  statueList, //监控箱状态
  useTypeList, //监控箱用途类型
  lineStatueList ,//线路状态
  lampuUseTypeList,//路灯杆用途类型
  lanternsList,
  treeData
}
