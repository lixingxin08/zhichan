<template>
  <div class="administrativedivision flex_fs">
   <div class="isleft">
     <is-expand-tree ref='tree' v-if="showTree" :treedata="treedata" :onLoadData='onLoadData' @parentdata='parentdata'
       @selectdata="getselectdata" :defaultSelectedKeys="defaultSelectedKeys"></is-expand-tree>
   </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>名称/编号:</div>
          <div style="width: 200px;">
            <a-input placeholder="请输入名称/编号" v-model="keyword" />
          </div>

          <div class='title_tx' style="margin-left: 20px;">发布屏状态:</div>
          <a-select :value="statusCode>=0?statusCode:'全部'" style="width: 200px;" @change="stateSelectChange">
          <a-select-option key='' value="">
            全部
          </a-select-option>
            <a-select-option v-for='(item,index) in statusCodeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>

          <a-button  :disabled="isselectdata.nodeType!='GLP'" style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button :disabled="isselectdata.nodeType != 'GLP'" @click='cleanSearch'>清除</a-button>
        </div>

      </div>
      <a-button :disabled="isselectdata.nodeType!='GLP'" class='base_add88_btn' type='primary' @click='edit({})'>
        <a-icon two-tone-color="#ffffff" type="plus" />新增</a-button>
      <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
        <div slot='statusCode' slot-scope="text, record">
          {{record.statusCode==0?'备用':(record.statusCode==1?'启用':'已报废')}}
        </div>
        <div slot='lightPoleName'>
          {{isselectdata.name}}
        </div>
        <template slot="operation" slot-scope="text, record">
          <div class="flexrow flexac flexjc">
            <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
            <div class="per-line"></div>
            <a href="#" style='font-size: 12px;' @click="see(record)">预览</a>
            <div class="per-line"></div>
              <a v-if='record.statusCode!=1' href="#" style='color: #FF0000;font-size: 12px;'  @click="deleteItem(record)">删除</a>

            <a href="#" v-else style='color: #CCCCCC;font-size: 12px;'>删除</a>
          </div>
        </template>
      </a-table>
    </div>
    <a-popconfirm-delete ref='delete' @confirm="confirmDelete">
    </a-popconfirm-delete>
  </div>
</template>
<!-- WIFI-->
<script>
  import tadata from './table.json'
  import {
    lightstree
  } from '../../../utils/mixins.js'
  export default {
    mixins: [lightstree],
    data() {
      return {
        tableTitle: tadata.tableTitle, //表格标题
        tableData: [], //表格数据
        statusCodeList: this.$config.lineStatueList, // 状态
        statusCode: '', //状态选择
        keyword: '', //输入框 搜索条件 名称
        pagination: this.$config.pagination,
      }
    },
    created() {
      this.gettree()
    },
    methods: {
      /* 删除提示*/
      deleteItem(item) {
        this.$refs.delete.show(item)
      },
      /* 编辑 新增*/
      edit(item) {
        this.$router.push({
          query: {
            deviceId: item.deviceId,
          },
          path: '/addlayarled'
        })
      },
      /* 预览*/
      see(item) {
        this.$router.push({
          query: {
            deviceId: item.deviceId,
          },
          path: '/seelayarled'
        })
      },
      /* 获取表格数据*/
      async getTableData() {
        if (!this.isselectdata) return
        if (this.pagination.current == 1)
          this.pagination.total = 0
        this.tableData = []
        let param = {
          protocolType: this.protocolType,
          statusCode: this.statusCode == -1 ? "" : this.statusCode,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize,
          keyword: this.keyword,
          lightpoleId: this.isselectdata.id
        }
        let res = await this.$http.post(this.$api.devicemultimediapage, param)
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
      /* 确认选择*/
      async confirmDelete(item) {
        let param = {
          deviceId: item.deviceId
        }
        let res = await this.$http.post(this.$api.devicemultimediaremove, param)
        if (res.data.resultCode == 10000) {
          this.getTableData()
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 分页选择*/
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      /* 状态选择*/
      stateSelectChange(e) {
        this.statusCode = e
      },

      cleanSearch() {
        this.keyword = ''
        this.statusCode = -1
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
