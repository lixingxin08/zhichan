const pagination = {
  "total": 0, //总页数
  "pageSize": 10, //每页中显示10条数据
  "showSizeChanger": true,
  "current": 1, //当前页
  "page": 1, //几页
  "size": "default",
  "pageSizeOptions": ["10", "20", "50", "100"], //每页中显示的数据
  "showTotal": (total) => `共有 ${total} 条数据`, //分页中显示总的数据
}
const statueList = [{
  comboBoxId: '0',
  comboBoxName: '禁用'
}, {
  comboBoxId: '1',
  comboBoxName: '启用'
}]
const useTypeList = [{
  comboBoxId: '0',
  comboBoxName: '虚拟监控箱'
}, {
  comboBoxId: '1',
  comboBoxName: '真实监控箱'
}]
const lineStatueList = [{
            comboBoxId: '1',
            comboBoxName: '备用'
          },
          {
            comboBoxId: '2',
            comboBoxName: '启用'
          }, {
            comboBoxId: '3',
            comboBoxName: '损坏'
          }
        ]
export default {
  pagination, //分页信息
  statueList,//监控箱状态
  useTypeList,//监控箱用途类型
  lineStatueList//线路状态
}
