<template>
  <div class="content2">
    <is-map :visible="visible" @positon='positon' @isvisible='isvisible' @address='address'></is-map>
    <div style="margin: 0 auto;">

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆型号:</div>
        <a-select :value="config.modelId?config.modelId:'请选择'" style="width: 667px;" @change="modelSelectChange">
          <a-select-option v-for='(item,index) in modeList' :key='index' :value="item.modelId">
            {{item.modelName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceName" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆编号:</div>
        <div class="edit_item_input">
          <a-input v-model="config.deviceCode" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆状态:</div>
        <a-select :disabled='config.deviceTotal>0' :value="config.statusCode>=0?config.statusCode:'请选择'" style="width: 667px;" @change="stateSelectChange">
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
        <div class="edit_item_title_ko_first">归属监控箱:</div>
        <div class="edit_item_input">
          <a-input v-model="monitorConfig.deviceName" disabled placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='30' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>归属线路:</div>
        <a-select v-if='lineList.length>0' :value="config.lineId?config.lineId:'请选择'" style="width: 667px;" @change="lineSelectChange">
          <a-select-option v-for='(item,index) in lineList' :key='index' :value="item.lineId">
            {{item.lineName}}
          </a-select-option>
        </a-select>
        <div v-else class="edit_item_input">
          <a-input disabled placeholder='无启用的线路' :maxLength='30' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属项目:</div>
        <div class="edit_item_input">
          <a-input v-model="monitorConfig.projectName " disabled placeholder='无'
            :maxLength='50' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">项目阶段:</div>
        <div class="edit_item_input">
          <a-input v-model="monitorConfig.phaseName" disabled placeholder='无' :maxLength='50' />
        </div>
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
          <a-textarea :maxLength='250' :rows="5" placeholder="250以内，格式不限制" v-model="config.remark" />
          <div class="edit_number_ko_first">{{config.remark.length}}/250</div>
        </div>
      </div>
    </div>
    <div class="flexrow flexjc" style="margin-top: 50px;">
      <a-button type='primary' style='margin-left: 20px;margin-right: 20px;' @click='submit'>保存</a-button>
     <!-- <a-button type='primary' style='margin-right: 20px;'>保存并复制</a-button> -->
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  import isMap from '../../../../components/position/position.vue'
  export default {
    components: {
      isMap
    },
    data() {
      return {
        visible: false, //展示地图
        copy: false,
        deviceId: '', //路灯杆id
        monitorId: '', //监控箱id
        monitorConfig: {}, //监控箱详情
        brandList: [], //路灯杆品牌
        modeList: [], //路灯杆型号
        stageCodeList: this.$config.lineStatueList, //路灯杆状态
        useTypeList: this.$config.lampuUseTypeList, //用图类型
        lineList: [], //归属线路
        config: {
          deviceTotal:0,
          deviceId: '', //设备id
          modelId: '', //型号
          statusCode: -1, //状态
          useType: -1, //用途类型
          lineId: '', //归属线路
          remark: ''
        }
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.monitorId = this.$route.query.monitorId
      this.copy = this.$route.query.copy == 'true'

      if (this.monitorId) {
        this.getMonitorDetail()
        this.getLineList()
      }
      if (this.deviceId) {
        this.getDetail()
      }
      this.getModelList()
    },
    methods: {
      async submit() {

        if (!this.config.modelId) {
          this.$message.warning('请选择路灯杆型号')
          return
        }
        if(!this.config.deviceName){
           this.$message.warning('请输入路灯杆名称')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceName)) {
          this.$message.warning('请检查路灯杆名称格式')
          return
        }
        if (!this.$utils.vify_cn30(this.config.deviceCode)) {
          this.$message.warning('请检查路灯杆编号格式')
          return
        }
        if(!this.config.deviceCode){
           this.$message.warning('请输入路灯杆编号')
          return
        }
        if (this.config.statusCode<0) {
          this.$message.warning('请选择路灯杆状态')
          return
        }
        if (this.config.useType<0) {
          this.$message.warning('请选择路灯杆用途类型')
          return
        }
        if (!this.config.lineId) {
          this.$message.warning('请选择路灯杆归属的线路')
          return
        }
        this.config.projectId = this.monitorConfig.projectId
        this.config.phaseId = this.monitorConfig.phaseId
        this.config.areaId = this.monitorConfig.areaId
        let res = await this.$http.post(this.$api.devicelightpoleform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.$router.push('/tianglampu')
          this.$config.treeData=[]
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      reset() {
        if (this.config.deviceId) {
          this.getDetail()
        } else {
          this.config = {
            deviceId: '',
            deviceBrandId: '', //品牌
            modelId: '', //型号
            statusCode: -1, //状态
            useType: -1, //用途类型
            lineId: '', //归属项目
            remark: ''
          }
        }
      },
      /* 获取路灯杆详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicelightpoledetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          if (this.copy) {
            this.config.deviceId = ''
            this.config.latitude = ''
            this.config.longitude = ''
            this.config.address = ''
            this.config.deviceCode = ''
          }
        }
      },
      async getModelList(){
        this.modeList = []
        let res = await this.$http.post(this.$api.devicelightboxgetmodel, {})
        if (res.data.resultCode == 10000) {
          this.modeList = res.data.data
        }
      },
      /* 获取监控箱详情*/
      async getMonitorDetail() {
        let param = {
          deviceId: this.monitorId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxdetail, param)
        if (res.data.resultCode == 10000) {
          this.monitorConfig = res.data.data
        }
      },
      /* 获取线路列表*/
      async getLineList() {
        this.lineList = []
        let param = {
          deviceId: this.monitorId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxlinebyid, param)
        if (res.data.resultCode) {
          this.lineList = res.data.data
        }
      },
      /* 状态 */
      stateSelectChange(e) {
        this.config.statusCode = e
      },

      /* 型号选择*/
      modelSelectChange(e) {
        this.config.modelId = e
      },
      /* 用途类型*/
      useTypeSelectChange(e) {
        this.config.useType = e
      },
      /* 线路*/
      lineSelectChange(e) {
        this.config.lineId = e
      },
      /* 展示地图*/
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
