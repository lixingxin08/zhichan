<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属路灯杆:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="lightConfig.name" placeholder='路灯杆名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属线路:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="lineConfig.name" placeholder='线路名称' />
        </div>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>WIFI型号:</div>
        <a-select :value="config.modelId?config.modelId:'请选择'" style="width: 667px;" @change="modelChange">
          <a-select-option v-for='(item,index) in modelList' :key='index' :value="item.modelId">
            {{item.modelName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>WIFI名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceName" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>WIFI编号:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceCode" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>WIFI状态:</div>
        <a-select :value="config.statusCode>=0?config.statusCode:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in statusCodeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='250' :rows="5" placeholder="250字以内，格式不限制"  v-model="config.remark" />
          <div class="edit_number_ko_first">{{config.remark.length}}/250</div>
        </div>
      </div>
    </div>
    <div class="flexrow flexjc" style="margin-top: 50px;">
      <a-button type='primary' style='margin-left: 20px;margin-right: 20px;' @click='submit'>保存</a-button>
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId: '',
        modelList: [], //型号
        lineConfig: {}, //线路
        lightConfig: {}, //灯杆
        statusCodeList: this.$config.lineStatueList, //状态
        config: {
          modelId: '',
          statusCode: -1,
          remark: ''
        }
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      if (this.deviceId) {
        this.getDetail()
      }
      this.getModelList()
      this.lightConfig = this.$utils.getLightSelectKey()
      this.lineConfig = this.$utils.getLineSelectKey()
    },
    methods: {

      reset() {
        if (this.deviceId) {
          this.getDetail()
        } else {
          this.config = {
            modelId: '',
            statusCode: -1,
            remark: ''
          }
        }
      },
      async submit() {
        if (!this.config.modelId) {
          this.$message.warning('请选择WIFI型号')
          return
        }
        
        if (!this.config.deviceName) {
          this.$message.warning('请填写WIFI名称')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceName)) {
          this.$message.warning('WIFI名称请输入30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号')
          return
        }
        if (!this.config.deviceCode) {
          this.$message.warning('请填写WIFI编号')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceCode)) {
          this.$message.warning('WIFI编号请输入30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号')
          return
        }
        if (this.config.statusCode < 0) {
          this.$message.warning('请选择WIFI状态')
          return
        }
        this.config.poleId = this.lightConfig.id
        let res = await this.$http.post(this.$api.devicewifiform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
           this.$router.push('/apinfo')
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 获取设备详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicewifidetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
        }
      },
      /* 获取型号列表*/
      async getModelList() {
        this.modelList = []
        let res = await this.$http.post(this.$api.devicewifimodellist, {})
        if (res.data.resultCode == 10000) {
          this.modelList = res.data.data
        }
      },
      /* 型号*/
      modelChange(e) {
        this.config.modelId = e
      },
      /* 状态*/
      stateSelectChange(e) {
        this.config.statusCode = e
      },
    }
  }
</script>

<style>
  .edit_item_title_ko_first {
    width: 130px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_ko_first {
    margin: 0 auto;
    margin-top: 24px;
  }

  .edit_number_ko_first {
    position: absolute;
    right: 10px;
    bottom: 3px;
    font-size: 14px;
    color: #999999;
  }

  .edit_item_input {
    width: 667px;
  }
</style>
