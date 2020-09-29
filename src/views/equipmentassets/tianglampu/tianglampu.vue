<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left-tree v-if="showTree" :treedata="treedata" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
        :defaultSelectedKeys="defaultSelectedKeys"></is-left-tree>
    </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>路灯杆名称/编号:</div>
          <div style="width: 200px;">
            <a-input placeholder="请输入路灯杆名称/编号" v-model="keyword" />
          </div>

          <div class='title_tx' style="margin-left: 20px;">线路名称:</div>
          <a-select :value="lineId?lineId:'全部'" style="width: 200px;" @change="lineIdSelectChange">
            <a-select-option key='' value="">
              全部
            </a-select-option>
            <a-select-option v-for='(item,index) in lineList' :key='index' :value="item.lineId">
              {{item.lineName}}
            </a-select-option>
          </a-select>
          <div class='title_tx' style="margin-left: 20px;">路灯杆状态:</div>
          <a-select :value="enableFlag>=0?enableFlag:'全部'" style="width: 200px;" @change="stateSelectChange">
            <a-select-option key='' :value="-1">
              全部
            </a-select-option>
            <a-select-option v-for='(item,index) in statusCodeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <div class='title_tx' style="margin-left: 20px;">用途类型:</div>
          <a-select :value="useType>=0?useType:'全部'" style="width: 200px;" @change="useTypeSelect">
            <a-select-option key='' value="">
              全部
            </a-select-option>
            <a-select-option v-for='(item,index) in useTypeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button @click='cleanSearch'>清除</a-button>
        </div>

      </div>
      <div class="flexrow" v-if="isselectdata.nodeType=='ECB'">
        <a-button class='base_add88_btn' type='primary' @click='edit({})'>
          <a-icon two-tone-color="#ffffff" type="plus" /> 新增</a-button>
        <a-button class='copy_btn' type='primary' @click='copy'>复制</a-button>
      </div>
      <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">
          <a-radio :checked='selectIndex==index' @click='change(index)'></a-radio>{{(index+1)+((pagination.current-1)*10)}}
        </template>
        <div slot='useType' slot-scope="text, record,index">
          {{record.useType==1?'智慧路灯杆':'普通路灯杆'}}
        </div>
        <div slot='deviceMonitorBoxName' slot-scope="text, record,index">
          {{isselectdata.name}}
        </div>
        <div slot='statusCode' slot-scope="text, record,index">
          {{record.statusCode==0?'备用':(record.statusCode==1?'启用':'已报废')}}
        </div>
        <template slot="operation" slot-scope="text, record">
          <div class="flexrow flexac flexjc">
            <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
            <div class="per-line"></div>
            <a href="#" style='font-size: 12px;' @click="see(record)">预览</a>
            <div class="per-line"></div>
            <a-popconfirm v-if='record.deviceTotal<=0&&record.statusCode!=1' title="确定删除？" ok-text="确定" cancel-text="取消"
              @confirm="confirmDelete(record)">
              <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
            </a-popconfirm>
            <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
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
        selectIndex: -1,
        showTree: false, //展示树
        isselectdata: "", //选中的左边树item
        defaultExpandedKeys: [], //默认展开
        defaultSelectedKeys: [], //默认选中
        tableTitle: tadata.tableTitle, //表格标题
        tableData: [], //表格数据
        enableFlag: -1, //状态选择
        statusCodeList: this.$config.lineStatueList, //下拉选择  监控箱状态
        useType: -1, //用途类型
        useTypeList: this.$config.lampuUseTypeList,
        lineList: [],
        lineId: '',
        keyword: '', //输入框 搜索条件 监控箱名称
        projectName: '', //输入框 搜索条件 归属i项目
        pagination: this.$config.pagination,
      }
    },
    created() {
      this.gettree()
    },
    methods: {
      /* 编辑 新增*/
      edit(item) {
        this.$router.push({
          query: {
            deviceId: item.deviceId,
            monitorId: this.isselectdata.id
          },
          path: '/addtianglampu'
        })
      },
      /* 预览*/
      see(item) {
        this.$router.push({
          query: {
            deviceId: item.deviceId,
            monitorName: this.isselectdata.name
          },
          path: '/seetianglampu'
        })
      },
      /* 获取表格数据*/
      async getTableData() {
        this.tableData = []
        if (this.pagination.current == 1)
          this.pagination.total = 0
        let param = {
          useType: this.useType == -1 ? '' : this.useType,
          statusCode: this.enableFlag == -1 ? '' : this.enableFlag,
          keyword: this.keyword,
          lineId: this.lineId,
          deviceId: this.isselectdata.id,
          pageIndex: this.pagination.current,
          pageSize: this.pagination.pageSize
        }
        let res = await this.$http.post(this.$api.devicelightpolepage, param)
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
      /* 复制*/
      copy() {
        if (this.selectIndex < 0) {
          this.$message.warning('请先选择监控箱')
          return
        }
        let item = this.tableData[this.selectIndex]
        this.$router.push({
          query: {
            copy: true,
            deviceId: item.deviceId,
            monitorId: this.isselectdata.id
          },
          path: '/addtianglampu'
        })
      },
      /* 确认选择*/
      async confirmDelete(item) {
        let param = {
          deviceId: item.deviceId
        }
        let res = await this.$http.post(this.$api.devicelightpoleremove, param)
        if (res.data.resultCode == 10000) {
          this.getTableData()
           this.$utils.cleanTree()
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 当选按钮*/
      change(index) {
        if (index == this.selectIndex) {
          this.selectIndex = -1
        } else {
          this.selectIndex = index
        }
      },
      /* 分页选择*/
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      /* 状态选择*/
      stateSelectChange(e) {
        this.enableFlag = e
      },
      lineIdSelectChange(e) {
        this.lineId = e
      },
      /* 用途选择*/
      useTypeSelect(e) {
        this.useType = e
      },
      //树接口
      async gettree() {
        let res = await this.$http.post(this.$api.devicemonitorboxtree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
        }
      },

      /* 设置tree 数据*/
      setdata(data) {
        this.defaultExpandedKeys = this.$utils.getTreeExpandedKeys(data)
        this.treedata = this.$utils.toTree(data);
        this.showTree = true
        if (localStorage.getItem('tianglampu')) {
          this.getselectdata(JSON.parse(localStorage.getItem('tianglampu')));
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('tianglampu')).id);
        } else {
          this.getselectdata(this.treedata[0])
          this.defaultSelectedKeys.push(this.treedata[0].id);
        }
      },
      /* 点击Item事件*/
      getselectdata(val) {
        if (!val)
          return
        localStorage.setItem('tianglampu', JSON.stringify(val))
        this.isselectdata = val;
        this.getLineListData()
        this.getTableData()
      },
      cleanSearch() {
        this.keyword = ''
        this.projectName = ''
        this.lineId = ''
        this.enableFlag = -1
        this.useType = -1
        this.getTableData()
      },
      async getLineListData() {
        this.lineList = []
        let param = {
          deviceId: this.isselectdata.id
        }
        let res = await this.$http.post(this.$api.devicemonitorboxlinebyid, param)
        if (res.data.resultCode) {
          this.lineList = res.data.data
        }
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
