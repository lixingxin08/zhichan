<template>
  <div class="flexcolumn " style='width: 60vw;margin: 0 auto;'>
    <a-button type='primary' style='width: 108px;margin-top: 20px;margin-bottom: 20px;' @click="edit({enableFlag:-1,remark:''})">+ 新增线路</a-button>
    <a-table :scroll="{  y: 700 }" :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="false">
      <template slot="index" slot-scope="text, record,index">{{(index+1)}}</template>
      <div slot='enableFlag' slot-scope="text, record,index">
        {{record.enableFlag==1?'启用':'备用'}}
      </div>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          <div class="per-line"></div>
          <a-popconfirm v-if='record.poleTotal<=0' title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
          <a v-else href="#" style='color: #CCCCCC;font-size: 12px;'>删除</a>
        </div>
      </template>
    </a-table>

    <is-edit ref='edit' v-show="isShowEdit" @callback='editCallBack'></is-edit>
  </div>
</template>

<script>
  import tbData from '../../table.json'
  import isEdit from './edit/edit.vue'
  export default {
    props: {
      deviceId: String,
      deviceCode: String
    },
    components: {
      isEdit
    },
    data() {
      return {
        isShowEdit: false, //是否展示修改 新增页面
        tableTitle: tbData.tableLineTitle,
        tableData: []
      }
    },
    methods: {
      /* 新增修改*/
      edit(item) {

        this.$refs.edit.setParam(item)
        this.isShowEdit = true
      },
      /* 新增修改 回调*/
      async editCallBack(param) {
        if (param) {
          if (!this.deviceId) {
            param.deviceId = this.deviceId
          }else{
            param.deviceId=this.tableData[0].deviceId
          }
          let res = await this.$http.post(this.$api.devicemonitorboxlinefrom, param)
          if (res.data.resultCode == 10000) {
            this.getLineData()
             this.$utils.cleanTree()
          } else {
            this.$message.error(res.data.resultMsg)
          }
        }
        this.isShowEdit = false
      },
      /* 确认删除*/
      async confirmDelete(item) {
        let param = {
          lineId: item.lineId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxlineremove, param)
        if (res.data.resultCode == 10000) {
          this.getLineData()
           this.$utils.cleanTree()
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 获取线路列表*/
      async getLineData() {
        let param = {
          deviceCode: this.deviceCode
        }
        this.tableData = []
        let res = await this.$http.post(this.$api.devicemonitorboxline, param)
        if (res.data.resultCode == 10000) {
          this.tableData = res.data.data
        }
      }
    }
  }
</script>

<style>
  .add_kotak_btn {
    width: 128px;
  }
</style>
