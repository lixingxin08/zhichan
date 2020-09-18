<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left-tree :treedata="treedata" :replaceFields="replaceFields" :defaultExpandedKeys="defaultExpandedKeys"
        @selectdata="getselectdata"></is-left-tree>
    </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>区划名称:</div>
          <a-input placeholder="请输入字典名称" v-model="keyword" />

          <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button @click='cleanTxt'>清除</a-button>
        </div>
      </div>
      <a-button style='width: 66px;margin-bottom: 20px;' type='primary' @click='edit({})'>增加</a-button>
      <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
        <template slot="operation" slot-scope="text, record">
          <div class="flexrow flexac flexjc">
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
              <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
            </a-popconfirm>
            <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 20px;margin-right: 20px;"></div>
            <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          </div>
        </template>
      </a-table>
    </div>
  </div>

</template>
<!-- 基础配置  区域管理-->
<script>
  import tadata from './table.json'
  import isLeftTree from '../../../components/tree/tree.vue'
  export default {
    components: {
      isLeftTree
    },
    data() {
      return {
        treedata: [{
          'children': [{
            'id': "dddddd",
            'name': 'dddddd'
          }],
          'id': "dddddd",
          'name': 'dddddd'
        }, {
          'children': [],
          'id': "dddddd",
          'name': 'dddddd'
        }],
        isselectdata: "",
        replaceFields: {
          title: "name",
          key: "id",
        },
        defaultExpandedKeys: [],
        data: "",
        tableTitle: tadata.tableTitle,
        tableData: [{}],
        keyword: '',
        pagination: {
          total: 0, //总页数
          pageSize: 10, //每页中显示10条数据
          showSizeChanger: true,
          current: 1, //当前页
          page: 1, //几页
          size: "default",
          pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
          showTotal: (total) => `共有 ${total} 条数据`, //分页中显示总的数据
        },
      }
    },
    methods: {
      edit(item) {
        this.$router.push('/addwatthourmeter')
      },
      getTableData() {

      },
      confirmDelete(item) {

      },
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      //数据字典树接口
      async getdictionarytree() {
        let prame = {};
        let res = await this.$http.post(this.$api.dictionarytree, prame);
        if (res.data.resultCode == 10000) {
          this.data = res.data.data;
        }
        this.setdata();
        this.getselectdata(this.treedata[0])
      },

      /* 获取数据转换成tree数据结构 */
      toTree(data) {
        let result = [];
        if (!Array.isArray(data)) {
          return result;
        }
        data.forEach((item) => {
          delete item.children;
        });
        let map = {};
        data.forEach((item) => {
          map[item.id] = item;
        });
        data.forEach((item) => {
          let parent = map[item.pid];
          if (parent) {
            (parent.children || (parent.children = [])).push(item);
          } else {
            result.push(item);
          }
        });
        return result;
      },
      /* 设置tree 数据*/
      setdata() {
        for (let i = 0; i < this.data.length; i++) { //检测哪个item需要默认打开
          if (this.data[i].open == true) {
            this.defaultExpandedKeys.push(this.data[i].id);
          }
        }
        this.treedata = this.toTree(this.data);
      },
      /* 点击Item事件*/
      getselectdata(val) {
        this.isselectdata = val;

      },
    }
  }
</script>

<style>
  .title_tx {
    flex-shrink: 0;
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    margin-right: 20px;
    color: #333333;
  }
</style>
