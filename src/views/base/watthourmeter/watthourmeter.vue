<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left-tree v-if="showTree" :treedata="treedata" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
        :defaultSelectedKeys="defaultSelectedKeys"></is-left-tree>
    </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>区划名称:</div>
          <a-input placeholder="请输入区划名称" v-model="keyword" />

          <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button @click='cleanSearch'>清除</a-button>
        </div>
      </div>
      <a-button  class='base_add88_btn' type='primary' @click='edit({})'>  <a-icon two-tone-color="#ffffff" type="plus" />新增</a-button>
      <a-table :scroll="{  y: 625 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
        <div slot='nodeType' slot-scope="text, record,index">
          {{record.nodeType==0?'授权':'自建'}}
        </div>
        <template slot="operation" slot-scope="text, record">
          <div class="flexrow flexac flexjc">
            <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
            <div style="height: 20px;width: 1px;background-color: #e5e5e5;margin-left: 20px;margin-right: 20px;"></div>
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
              <a href="#" v-if="record.childTotal<=0&&record.deviceTotal<=0" style='color: #FF0000;font-size: 12px;'>删除</a>
              <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </div>

</template>
<!-- 基础配置  区域管理-->
<script>
  import tadata from './table.json'
  export default {

    data() {
      return {
        treedata: [],
        showTree: false, //
        isselectdata: "", //选中的左边树item
        defaultExpandedKeys: [], //默认展开
        defaultSelectedKeys: [], //默认选中
        tableTitle: tadata.tableTitle, //表格title
        tableData: [], //表格数据
        keyword: '', //搜索条件
        pagination: this.$config.pagination,
      }
    },
    created() {
      console.log(this.$api.areastree,898989899);
      this.gettree()
    },
    methods: {
      /* 编辑删除*/
      edit(item) {
        this.$router.push({
          path: '/addwatthourmeter',
          query: {
            areaId: item.areaId
          }
        });
      },
      /* 获取表格数据*/
      async getTableData() {
        if (this.pagination.current == 1)
          this.pagination.total = 0
        this.tableData = []
        let param = {
          keyword: this.keyword,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize,
          parentId: this.isselectdata.id
        }
        let res = await this.$http.post(this.$api.areaspage, param)
        if (res.data.resultCode == 10000) {
          if (res.data.data) {
            this.tableData = res.data.data.list
            if (this.pagination.current == 1)
              this.pagination.total = res.data.data.length
          }
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      async confirmDelete(item) {
        let param = {
          areaId: item.areaId
        }
        let res = await this.$http.post(this.$api.areasremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.gettree()
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      cleanTxt(){},
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      //树接口
      async gettree() {
        let res = await this.$http.post(this.$api.areastree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
          if (localStorage.getItem('watthour')) {
            this.getselectdata(JSON.parse(localStorage.getItem('watthour')));
            this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('watthour')).id);
          } else {
            this.getselectdata(this.treedata[0])
            this.defaultSelectedKeys.push(this.treedata[0].id);
          }
        }
      },

      /* 设置tree 数据*/
      setdata(data) {
        this.defaultExpandedKeys = this.$utils.getTreeExpandedKeys(data)
        this.treedata = this.$utils.toTree(data);
        this.showTree = true
      },
      /* 点击Item事件*/
      getselectdata(val) {
        if (!val)
          return
        localStorage.setItem('watthour', JSON.stringify(val))
        this.isselectdata = val;
        this.getTableData()
      },
      /* 清除搜索条件*/
      cleanSearch() {
        this.keyword = ''
        this.getTableData()
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
