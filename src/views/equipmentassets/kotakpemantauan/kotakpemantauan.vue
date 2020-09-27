<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left-tree v-if="showTree" :treedata="treedata" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
        :defaultSelectedKeys="defaultSelectedKeys"></is-left-tree>
    </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>监控箱名称/编号:</div>
          <div style="width: 200px;">
            <a-input placeholder="请输入监控箱名称/编号" v-model="keyword" />
          </div>

          <div class='title_tx' style="margin-left: 20px;">归属项目:</div>
          <div style="width: 200px;">
            <a-input placeholder="请输入归属项目" v-model="projectName" />
          </div>
          <div class='title_tx' style="margin-left: 20px;">监控下状态:</div>
          <a-select :value="statusCode?statusCode:'全部'" style="width: 200px;" @change="stateSelectChange">
            <a-select-option key='' value="">
              全部
            </a-select-option>
            <a-select-option v-for='(item,index) in statusCodeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <div class='title_tx' style="margin-left: 20px;">用途类型:</div>
          <a-select :value="serviceType?serviceType:'全部'" style="width: 200px;" @change="serviceTypeSelect">
            <a-select-option key='' value="">
              全部
            </a-select-option>
            <a-select-option v-for='(item,index) in serviceTypeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button @click='cleanSearch'>清除</a-button>
        </div>

      </div>
      <a-button class='base_add88_btn' type='primary' @click='edit({})'>   <a-icon two-tone-color="#ffffff" type="plus" /> 新增</a-button>
      <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
        <template slot="operation" slot-scope="text, record">
          <div class="flexrow flexac flexjc">
            <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
            <div class="per-line"></div>
            <a href="#" style='font-size: 12px;' @click="see(record)">预览</a>
            <div class="per-line"></div>
            <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
              <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<!-- 路灯杆信息-->
<script>
  import tadata from './table.json'
  export default {
    data() {
      return {
        showTree: false, //展示树
        isselectdata: "", //选中的左边树item
        defaultExpandedKeys: [], //默认展开
        defaultSelectedKeys: [], //默认选中
        tableTitle: tadata.tableTitle, //表格标题
        tableData: [], //表格数据
        statusCode: '', //状态选择
        statusCodeList: this.$config.statueList, //下拉选择  监控箱状态
        serviceType: '', //用途类型
        serviceTypeList: this.$config.useTypeList,
        keyword: '', //输入框 搜索条件 监控箱名称
        projectName: '', //输入框 搜索条件 归属i项目
        pagination: this.$config.pagination
      }
    },
    created() {
      this.gettree()
    },
    methods: {
      /* 编辑 新增*/
      edit(item) {
        this.$router.push('/addkotakpemantauan')
      },
      /* 预览*/
      see() {
        this.$router.push('/seekotakpemantauan')
      },
      /* 获取表格数据*/
      async getTableData() {
        if (this.pagination.current == 1)
          this.pagination.total = 0
        this.tableData = []
        let param = {
          keyword: this.keyword,
          projectName: this.projectName,
          statusCode: this.statusCode,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize,
          parentId: this.isselectdata.id
        }
        let res = await this.$http.post(this.$api.devicemonitorboxpage, param)
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
        let res = await this.$http.post(this.$api.devicemonitorboxremove, param)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.getTableData()
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
      /* 监控箱选择*/
      serviceTypeSelect(e) {
        this.serviceType = e
      },
      //树接口
      async gettree() {
        let res = await this.$http.post(this.$api.areastree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
        }
      },

      /* 设置tree 数据*/
      setdata(data) {
        this.defaultExpandedKeys = this.$utils.getTreeExpandedKeys(data)
        this.treedata = this.$utils.toTree(data);
        this.showTree = true
        if (localStorage.getItem('kotakpe')) {
          this.getselectdata(JSON.parse(localStorage.getItem('kotakpe')));
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('kotakpe')).id);
        } else {
          this.getselectdata(this.treedata[0])
          this.defaultSelectedKeys.push(this.treedata[0].id);
        }
      },
      /* 点击Item事件*/
      getselectdata(val) {
        if (!val)
          return
        localStorage.setItem('kotakpe', JSON.stringify(val))
        this.isselectdata = val;
        this.getTableData()
      },

      cleanSearch() {
        this.keyword = ''
        this.projectName = ''
        this.statusCode = ''
        this.serviceType = ''
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
