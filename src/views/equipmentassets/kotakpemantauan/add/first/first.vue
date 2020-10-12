<template>
  <div class="content2">
    <is-map :visible="visible" @positon='positon' @isvisible='isvisible' @address='address'></is-map>
    <div style="margin: 0 auto;">
      <!--  <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>监控箱品牌:</div>
        <a-select :value="config.deviceBrandId?config.deviceBrandId:'请选择'" style="width: 667px;" @change="brandSelectChange">
          <a-select-option v-for='(item,index) in brandList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div> -->
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>监控箱型号:</div>
        <a-select :value="config.modelId?config.modelId:'请选择'" style="width: 667px;" @change="modelSelectChange">
          <a-select-option v-for='(item,index) in modeList' :key='index' :value="item.modelId">
            {{item.modelName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>监控箱名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceName" placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='30' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>监控箱编号:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceCode" placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='30' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>监控箱状态:</div>
        <a-select :disabled='config.lineTotal>0' :value="config.statusCode>=0?config.statusCode:'请选择'" style="width: 667px;"
          @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stageCodeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>用途类型:</div>
        <a-select :value="config.useType>=0?config.useType:'请选择'" style="width: 667px;" @change="useTypeSelectChange">
          <a-select-option v-for='(item,index) in useTypeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">通讯模组号IMEI:</div>

        <a-input-number style='width: 667px;' v-model="config.imei" placeholder='15位，数字' :max='999999999999999' />

      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">物联数据卡(ICCID):</div>

        <a-input-number style='width: 667px;' v-model="config.iccid" placeholder='20位，数字' :max='9999999999999999999' />

      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>归属项目:</div>
        <a-select :value="config.projectId?config.projectId:'请选择'" style="width: 667px;" @change="projectSelectChange">
          <a-select-option v-for='(item,index) in projectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">项目阶段:</div>
        <a-select :value="config.phaseId?config.phaseId:'请选择'" style="width: 667px;" @change="phaseSelectChange">
          <a-select-option v-for='(item,index) in phaseList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">地图位置:</div>
        <div class="edit_item_input">
          <a-input disabled :value="config.longitude?(config.longitude+','+config.latitude):'请选择位置'" placeholder='请选择位置' />
        </div>

        <a-button class="map-btn" type='primary' @click="showMap()">地图定位</a-button>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">位置地址:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.address" placeholder='请选择位置' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='256' :rows="5" placeholder="请输入备注信息" v-model="config.remark" />
          <div class="edit_number_ko_first">{{config.remark.length}}/256</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import isMap from '../../../../../components/position/position.vue'
  export default {
    components: {
      isMap
    },
    props: {
      deviceId: String,
      areaId: String,
      copy: Boolean
    },
    data() {
      return {
        isCopy: false,
        visible: false,
        brandList: [], //监控箱品牌
        modeList: [], //监控箱型号
        stageCodeList: this.$config.lineStatueList, //监控箱状态
        useTypeList: this.$config.useTypeList, //用途类型
        projectList: [], //归属项目
        phaseList: [], //阶段项目
        config: {
          deviceBrandId: '', //监控箱品牌
          modelId: '', //监控箱型号
          statusCode: -1, //监控箱状态
          useType: -1, //用途类型
          projectId: '', //归属项目
          phaseId: '', //项目阶段
          remark: '' //备注
        }
      }
    },
    created() {
      this.getModeList()
      this.getDetail()
    },
    methods: {
      /* 提交*/
      async submit() {
        // if (!this.config.deviceBrandId) {
        //   this.$message.warning('请选择监控箱品牌')
        //   return
        // }
        if (!this.getMontiorStatue()) {
          return
        }
        this.config.areaId = this.areaId
        let res = await this.$http.post(this.$api.devicemonitorboxform, this.config)

        this.$emit('callbackDeviceCode', this.config.deviceCode)
        this.$emit('callback', res.data)
      },

      getMontiorStatue() {
        if (!this.config.modelId) {
          this.$message.warning('请选择监控箱型号')
          return false
        }

        if (!this.$utils.vify_cn50(this.config.deviceName)) {
          this.$message.warning('请监控箱名称格式不对')
          return false
        }

        if (!this.$utils.vify_cn50(this.config.deviceCode)) {
          this.$message.warning('请填写监控箱编号')
          return false
        }
        if (!this.config.deviceCode) {
          this.$message.warning('请输入监控箱编号')
          return false
        }
        if (!this.config.deviceName) {
          this.$message.warning('请输入监控箱名称')
          return false
        }
        if (this.config.statusCode < 0) {
          this.$message.warning('请选择监控箱状态')
          return false
        }
        if (this.config.useType < 0) {
          this.$message.warning('请选择监控箱用途类型')
          return false
        }
        if (!this.config.projectId) {
          this.$message.warning('请选择归属项目')
          return false
        }
        return true
      },
      submitAndCopy() {
        this.isCopy = true
        this.submit()
      },
      reset() {
        if (this.deviceId) {
          this.getDetail()
        } else {
          this.config = {
            deviceBrandId: '', //监控箱品牌
            modelId: '', //监控箱型号
            statusCode: '', //监控箱状态
            useType: '', //用途类型
            projectId: '', //归属项目
            phaseId: '', //项目阶段
            remark: ''
          }
        }
      },
      async getDetail() {
        if (!this.deviceId)
          return
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxdetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          if (this.copy) { //如果是复制 清空选项
            this.config.deviceCode = '' //编号
            this.config.imei = '' //通讯模组
            this.config.iccid = '' //物联卡数据
            this.config.deviceId = '' //设备id
            this.config.latitude = ''
            this.config.longitude = ''
            this.config.address = ''
            this.config.lineTotal = 0
          }
          this.getProjectPhase()
          this.$emit('callbackDeviceCode', this.config.deviceCode)
        }
      },
      async getModeList() {
        this.modeList = []
        let res = await this.$http.post(this.$api.devicemonitorboxgetmodel, {})
        if (res.data.resultCode == 10000) {
          this.modeList = res.data.data
        }
        let res2 = await this.$http.post(this.$api.devicemonitorboxproject, {})
        if (res2.data.resultCode == 10000) {
          this.projectList = res2.data.data
        }
      },
      /* 监控箱状态 */
      stateSelectChange(e) {
        this.config.statusCode = e
      },
      updateDeviceId(deviceId) {
        this.config.deviceId = deviceId
      },
      showMap() {
        this.visible = true
      },
      /* 选中监控箱经纬度*/
      positon(e) {
        this.config.longitude = e.split(',')[0]
        this.config.latitude = e.split(',')[1]
      },
      isvisible(b) {
        this.visible = !b
      },
      /* 选中监控箱详细地址*/
      address(e) {
        this.config.address = e
      },
      /* 监控箱型号选择*/
      modelSelectChange(e) {
        this.config.modelId = e
      },
      /* 监控箱用途类型*/
      useTypeSelectChange(e) {
        this.config.useType = e
      },
      /* 监控箱归属项目*/
      projectSelectChange(e) {
        this.config.projectId = e
        this.config.phaseId = ''
        this.getProjectPhase()
      },
      /* 获取项目阶段列表*/
      async getProjectPhase() {

        this.phaseList = []
        let param = {
          projectId: this.config.projectId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxprojectphase, param)
        if (res.data.resultCode == 10000) {
          this.phaseList = res.data.data
        }
      },
      /* 项目阶段*/
      phaseSelectChange(e) {
        this.config.phaseId = e
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

  .map-btn {
    margin-left: 20px;
  }

  .edit_item_input {
    width: 667px;
  }
</style>
