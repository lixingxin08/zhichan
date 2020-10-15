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
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制器型号:</div>
        <a-select :value="config.modelId?config.modelId:'请选择'" style="width: 667px;" @change="modelSelectChange">
          <a-select-option v-for='(item,index) in modelList' :key='index' :value="item.modelId">
            {{item.modelName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制器名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceName" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制器编号:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceCode" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制灯具:</div>
        <a-select :value="config.lampId?config.lampId:'请选择'" style="width: 667px;" @change="lanternsSelectChange">
          <a-select-option v-for='(item,index) in lanternsList' :key='index' :value="item.deviceId">
            {{item.deviceName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制器状态:</div>
        <a-select :value="config.statusCode>=0?config.statusCode:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stateSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">通讯模组号(IMEI):</div>
        <a-input class="edit_item_input" v-model="config.imei" :maxLength='15' placeholder='15位，数字' @change='imeiChange' />
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">物联数据卡(ICCID):</div>

        <a-input class="edit_item_input" v-model="config.iccid" :maxLength='20' placeholder='20位，数字' @change='iccidChange' />

      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='250' :rows="5" placeholder="250字以内，格式不限制" v-model="config.remark" />
          <div class="edit_number_ko_first">{{config.remark.length}}/250</div>
        </div>
      </div>
    </div>
    <div class="flexrow flexjc" style="margin-top: 50px;">
      <a-button type='primary' style='margin-left: 20px;margin-right: 20px;' @click='submit'>保存</a-button>
      <!--  <a-button type='primary' style='margin-right: 20px;' >保存并复制</a-button> -->
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lineConfig: {}, //线路
        lightConfig: {}, //灯杆
        deviceId: '', //设备id
        modelList: [], //型号List
        lanternsList: [], //灯具list
        stateSelectList: this.$config.lineStatueList, //状态List
        config: { //设备详情
          modelId: '',
          remark: '',
          lampId: '',
          statusCode: -1
        }
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.lightConfig = this.$utils.getLightSelectKey()
      this.lineConfig = this.$utils.getLineSelectKey()
      this.getModelList()

      if (this.deviceId) {
        this.getDetail()
      } else {
        this.getLanternsList()
      }

    },
    methods: {
      /* 提交*/
      async submit() {
        if (!this.config.modelId) {
          this.$message.warning('请选择控制器型号')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceName)) {
          this.$message.warning('控制器名称请输入30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号')
          return
        }
        if (!this.config.deviceName) {
          this.$message.warning('请填写控制器名称')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceCode)) {
          this.$message.warning('控制器编号请输入30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号')
          return
        }
        if (!this.config.deviceCode) {
          this.$message.warning('请填写控制器编号')
          return
        }
        if (!this.config.lampId) {
          this.$message.warning('请选择控制的灯具')
          return
        }
        if (this.config.statusCode < 0) {
          this.$message.warning('请选择控制器状态')
          return
        }
        this.config.poleId = this.lightConfig.id
        if (this.config.imei)
          this.config.imei = parseInt(this.config.imei)
        if (this.config.iccid)
          this.config.iccid = parseInt(this.config.iccid)
        let res = await this.$http.post(this.$api.devicepolecontrollerform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.$router.push('/kontroler')
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      /* 获取设备详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicepolecontrollerdetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.getLanternsList()
        }
      },
      /* 获取路灯杆详情*/
      async getLightpoleDetail() {
        let param = {
          deviceId: this.lightpoleId
        }
        let res = await this.$http.post(this.$api.devicelightpoledetail, param)
        if (res.data.resultCode == 10000) {
          this.lightpoleConfig = res.data.data
        }
      },
      /* 获取型号列表*/
      async getModelList() {
        this.modelList = []
        let res = await this.$http.post(this.$api.devicepolecontrollermodel, {})
        if (res.data.resultCode == 10000) {
          this.modelList = res.data.data
        }
      },
      async getLanternsList() {
        this.lanternsList = []
        let param = {
          lightpoleId: this.lightConfig.id,
        }
        if (this.config.lampId)
          param.deviceId = this.config.deviceId
        let res = await this.$http.post(this.$api.devicelamplist, param)
        if (res.data.resultCode == 10000) {
          this.lanternsList = res.data.data
        }
      },
      /* 重置*/
      reset() {
        if (this.deviceId) {
          this.getDetail()
        } else {
          this.config = { //设备详情
            modelId: '',
            remark: '',
            lampId: '',
            statusCode: -1
          }
        }
      },
      /* 型号*/
      modelSelectChange(e) {
        this.config.modelId = e
      },
      imeiChange(e) {
        this.config.imei = this.config.imei.replace(/[^0-9]/ig, "")
      },
      iccidChange(e) {
        this.config.iccid = this.config.iccid.replace(/[^0-9]/ig, "")
      },
      /* 状态选择*/
      stateSelectChange(e) {
        this.config.statusCode = e
      },
      /* 控制灯具选择*/
      lanternsSelectChange(e) {
        this.config.lampId = e
      }
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
