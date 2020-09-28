<template>
  <div class="administrativedivision flex_fs">
    <div class="isleft">
      <is-left-tree v-if="showTree" :treedata="treedata" :defaultExpandedKeys="defaultExpandedKeys" @selectdata="getselectdata"
        :defaultSelectedKeys="defaultSelectedKeys"></is-left-tree>
    </div>
    <div class="content2">
      <div class='flexrow flexac flexsb' style="margin-bottom: 20px;">
        <div class="flexrow flexac">
          <div class='title_tx'>名称/编号:</div>
          <div style="width: 200px;">
            <a-input placeholder="请输入字典名称" v-model="keyword" />
          </div>
          <div class='title_tx' style="margin-left: 20px;">接入协议类型:</div>
          <a-select :value="streetSelect?streetSelect:'全部'" style="width: 200px;" @change="stateSelectChange">
            <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>
          <div class='title_tx' style="margin-left: 20px;">摄像头状态:</div>
          <a-select :value="statusCode>=0?statusCode:'全部'" style="width: 200px;" @change="statusCodeSelect">
            <a-select-option v-for='(item,index) in stautsCodeList' :key='index' :value="item.comboBoxId">
              {{item.comboBoxName}}
            </a-select-option>
          </a-select>



          <a-button style='margin-left: 20px;margin-right: 20px;' type="primary" @click='getTableData'>查询</a-button>
          <a-button @click='cleanSearch'>清除</a-button>
        </div>

      </div>
      <a-button class='base_add88_btn' type='primary' @click='edit({})'>
        <a-icon two-tone-color="#ffffff" type="plus" />新增</a-button>
      <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="pagination"
        @change="handleTableChange">
        <template slot="index" slot-scope="text, record,index">{{(index+1)+((pagination.current-1)*10)}}</template>
        <div slot='statusCode' slot-scope="text, record">
          {{record.statusCode==1?'启用':'备用'}}
        </div>
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
<!-- 摄像头信息-->
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
        tableData: [{}], //表格数据
        agreementList: [], //下拉选择  路灯杆状态
        agreement: '', //
        stautsCodeList: [],
        statusCode: '', //状态选择
        keyword: '', //输入框 搜索条件 监控箱名称
        keyword2: '', //输入框 搜索条件 归属i项目
        pagination: this.$config.pagination,
      }
    },
    methods: {
      /* 编辑 新增*/
      edit(item) {
        this.$router.push('/addkamera')
      },
      /* 预览*/
      see() {
        this.$router.push('/seekamera')
      },
      /* 获取表格数据*/
      getTableData() {

      },
      /* 确认选择*/
      async confirmDelete(item) {

      },
      /* 分页选择*/
      handleTableChange(pagination) {
        this.pagination = pagination;
        this.getTableData()
      },
      /* 状态选择*/
      statusCodeSelect(e) {
        this.statusCode = e
      },

      cleanSearch() {
        this.keyword = ''
        this.keyword2 = ''
        this.stateSelect = ''
        this.streetSelect = ''
        this.getTableData()
      },
 //树接口
      async gettree() {
        let res = await this.$http.post(this.$api.devicelightpoletree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
        }
      },

      /* 设置tree 数据*/
      setdata(data) {
        this.defaultExpandedKeys = this.$utils.getTreeExpandedKeys(data)
        this.treedata = this.$utils.toTree(data);
        this.showTree = true
        if (localStorage.getItem('kontroler')) {
          this.getselectdata(JSON.parse(localStorage.getItem('kontroler')));
          this.defaultSelectedKeys.push(JSON.parse(localStorage.getItem('kontroler')).id);
        } else {
          this.getselectdata(this.treedata[0])
          this.defaultSelectedKeys.push(this.treedata[0].id);
        }
      },
      /* 点击Item事件*/
      getselectdata(val) {
        if (!val)
          return
        localStorage.setItem('kontroler', JSON.stringify(val))
        this.isselectdata = val;
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
