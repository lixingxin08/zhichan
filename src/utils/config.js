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
  comboBoxId: 0,
  comboBoxName: '禁用'
}, {
  comboBoxId: 1,
  comboBoxName: '启用'
}]
export default {
  pagination, //分页信息
  statueList
}
