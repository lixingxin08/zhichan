<template>
  <div class="content2">
    <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>名称/编号:</div>
        <div style="width: 200px;">
          <a-input placeholder="请输入名称/编号" v-model="keyword" />
        </div>


        <div class='title_tx' style="margin-left: 20px;">WIFI状态:</div>
        <a-select :value="stateSelect?stateSelect:'全部'" style="width: 200px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>

        <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
        <a-button @click='cleanSearch'>清除</a-button>
      </div>

    </div>
    <a-button style='width: 66px;margin-bottom: 20px;' type='primary' @click='edit({})'>新增</a-button>
    <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
      @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          <div class="per-line"></div>
          <a href="#" style='font-size: 12px;' @click="see(record)">预览</a>
          <div class="per-line"></div>
          <a-popconfirm title="确定删除?" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </div>
</template>
<!-- WIFI-->
<script>
  import tadata from './table.json'
  export default {
    data() {
      return {
        tableTitle: tadata.tableTitle, //表格标题
        tableData: [{}], //表格数据
        selectList: [{
          comboBoxId: '',
          comboBoxName: '全部'
        }], //下拉选择  路灯杆状态

        stateSelect: '', //状态选择
        keyword: '', //输入框 搜索条件 名称
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
      /* 编辑 新增*/
      edit(item) {
        this.$router.push('/addlayarled')
      },
      /* 预览*/
      see() {
        this.$router.push('/seelayarled')
      },
      /* 获取表格数据*/
      getTableData() {

      },
      /* 确认选择*/
      confirmDelete(item) {

      },
      /* 分页选择*/
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      /* 状态选择*/
      stateSelectChange(e) {
        this.stateSelect = e
      },

      cleanSearch() {
        this.keyword = ''
        this.stateSelect = ''
        this.getTableData()
      }

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
