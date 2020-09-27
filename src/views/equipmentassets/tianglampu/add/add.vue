<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <!-- <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆品牌:</div>
        <a-select :value="config.deviceBrandId?config.deviceBrandId:'请选择'" style="width: 667px;" @change="brandSelectChange">
          <a-select-option v-for='(item,index) in brandList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div> -->
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>路灯杆型号:</div>
        <a-select :value="config.deviceModelId?config.deviceModelId:'请选择'" style="width: 667px;" @change="modelSelectChange">
          <a-select-option v-for='(item,index) in modeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
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
        <a-select :value="config.statusCode?config.statusCode:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stageCodeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>用途类型:</div>
        <a-select :value="config.useType?config.useType:'请选择'" style="width: 667px;" @change="useTypeSelectChange">
          <a-select-option v-for='(item,index) in useTypeList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属监控箱:</div>
        <div class="edit_item_input">
          <a-input v-model="config.input" disabled placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='30' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>归属线路:</div>
        <a-select :value="config.lineId?config.lineId:'请选择'" style="width: 667px;" @change="lineSelectChange">
          <a-select-option v-for='(item,index) in lineList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属项目:</div>
        <div class="edit_item_input">
          <a-input v-model="config.projectName " disabled placeholder='50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='50' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">项目阶段:</div>
        <div class="edit_item_input">
          <a-input v-model="config.phaseName" disabled placeholder='50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' :maxLength='50' />
        </div>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">地图位置:</div>
        <div class="edit_item_input">
          <a-input disabled :value="config.longitude?(config.longitude+','+config.latitude):'请选择位置'" placeholder='请选择位置' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">位置地址:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.address" placeholder='50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
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
      <a-button type='primary' style='margin-right: 20px;'>保存并复制</a-button>
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brandList: [], //路灯杆品牌
        modeList: [], //路灯杆型号
        stageCodeList: this.$config.statueList, //路灯杆状态
        useTypeList: this.$config.useTypeList, //用图类型
        lineList: [], //归属线路
        remarkLength: 0,
        config: {
          deviceId: '', //设备id
          deviceBrandId: '', //品牌
          deviceModelId: '', //型号
          statusCode: '', //状态
          useType: '', //用途类型
          lineId: '', //归属项目
          remark: ''
        }
      }
    },
    methods: {
      async submit() {
        // if (!this.config.deviceBrandId) {
        //   this.$message.warning('请选择路灯杆品牌')
        //   return
        // }
        if (!this.config.deviceModelId) {
          this.$message.warning('请选择路灯杆型号')
          return
        }
        if (!this.$utils.vify_cn50(this.config.deviceName)) {
          this.$message.warning('请填写路灯杆名称')
          return
        }
        if (!this.$utils.vify_cn50(this.config.deviceCode)) {
          this.$message.warning('请填写路灯杆编号')
          return
        }
        if (!this.config.statusCode) {
          this.$message.warning('请选择路灯杆状态')
          return
        }
        if (!this.config.useType) {
          this.$message.warning('请选择路灯杆用途类型')
          return
        }
        if (!this.config.lineId) {
          this.$message.warning('请选择路灯杆归属的线路')
          return
        }
        let res = this.$http.post(this.$api.devicelightpoleform, this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.$router.go(-1)
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
            deviceModelId: '', //型号
            statusCode: '', //状态
            useType: '', //用途类型
            lineId: '', //归属项目
            remark: ''
          }
        }
      },
      getDetail() {

      },
      /* 状态 */
      stateSelectChange(e) {
        this.config.statusCode = e
      },
      /* 品牌选择*/
      brandSelectChange(e) {
        this.config.deviceBrandId = e
      },
      /* 型号选择*/
      modelSelectChange(e) {
        this.config.deviceModelId = e
      },
      /* 用途类型*/
      useTypeSelectChange(e) {
        this.config.useType = e
      },
      /* 线路*/
      lineSelectChange(e) {
        this.lineId = e
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
