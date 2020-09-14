<template>
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
    <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small"
      :pagination="pagination" @change="handleTableChange">
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
</template>
<!-- 基础配置  区域管理-->
<script>
  import tadata from './table.json'
  export default {
    data() {
      return {
        tableTitle: tadata.tableTitle,
        tableData: [{}],
        keyword: '',
        pagination: {
          total: 0, //总条数
          size: "default", //分页展示样式
          current: 1, //当前选择页
          pageSize: 20, // 默认每页显示数量
          showSizeChanger: true, // 显示可改变每页数量
          pageSizeOptions: ['10', '20', '30', '40'], // 每页数量选项
          showQuickJumper: true,
        }
      }
    },
    methods: {
      edit(item) {
        this.$router.push('/addwatthourmeter')
      },
      getTableData() {

      },
      confirmDelete(item) {},
      handleTableChange(pagination){
        this.pagination = pagination;
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
