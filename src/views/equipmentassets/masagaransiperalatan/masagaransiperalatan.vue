<template>
  <div class="content2">
    <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
      <div class="flexrow flexac">
        <div class='title_tx'>归属项目:</div>
        <div style="width: 200px;margin-right: 20px;">
          <a-input placeholder="请输入归属项目" v-model="pageparame.projectName" />
        </div>
        <div class='title_tx'>设备类型:</div>
        <div style="width: 200px;margin-right: 20px;">
          <a-input placeholder="请输入设备类型" v-model="pageparame.deviceTypeName" />
        </div>
        <div class='title_tx'>设备型号:</div>
        <div style="width: 200px;margin-right: 20px;">
          <a-input placeholder="请输入设备型号" v-model="pageparame.modelName" />
        </div>

        <div class='title_tx'>有效期:</div>
        <a-range-picker style='width: 250px;' :value='timeValue' @change="onChange">

        </a-range-picker>
        <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
        <a-button @click='cleanSearch'>清除</a-button>
      </div>
    </div>
    <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
      @change="handleTableChange">
      <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
      <div slot="deviceOn" slot-scope="text, record">
       {{record.deviceTotal}}/ {{record.deviceOn}}
      </div>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>

        </div>
      </template>
    </a-table>
  </div>
</template>
<!-- 设备质保期-->
<script>
  import tadata from './table.json'
  import moment from 'moment';
  export default {
    data() {
      return {
        tableTitle: tadata.tableTitle, //表格标题
        tableData: tadata.list, //表格数据
        timeValue: ['', ''],
        pagination: this.$config.pagination,
        pageparame: {
          projectName: '',
          deviceTypeName: '',
          modelName: '',
          startData: '',
          endData: '',
          pageIndex: ''
        }
      }
    },
    created() {
      this.getTableData()
    },
    methods: {
      moment,
      /* 编辑 新增*/
      edit(item) {
        localStorage.setItem('masagaransiperalatan',JSON.stringify(item))
        this.$router.push('/addmasagaransiperalatan')
      },


      /* 获取表格数据*/
      async getTableData() {
        if (this.pagination.current == 1)
          this.pagination.total = 0
        this.tableData = []
        this.pageparame.pageIndex = this.pagination.current
        this.pageparame.pageSize = this.pagination.pageSize
        let res = await this.$http.post(this.$api.deviceguaranteepage, this.pageparame)
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

      /* 分页选择*/
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },


      cleanSearch() {
        this.timeValue = ['', '']
        this.pageparame = {
          projectName: '',
          deviceTypeName: '',
          modelName: '',
          startData: '',
          endData: '',
          pageIndex: ''
        }
        this.getTableData()
      },
      onChange(date, dateString) {
        console.log(date, dateString);
        //console.log(this.dates)
        this.timeValue = dateString
        this.pageparame.startData = this.timeValue[0] ? this.timeValue[0].toString().replace(new RegExp('/', 'gm'), '-') :
          ''
        this.pageparame.endData = this.timeValue[1] ? this.timeValue[1].toString().replace(new RegExp('/', 'gm'), '-') :
          ''
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
