<template>
  <div class="content2">
        <is-map :visible="visible" @positon='positon' @isvisible='isvisible' @address='address'></is-map>
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">上级区域</div>
        <div class="edit_item_input">
          <a-input disabled v-model="parentArea.name" />
        </div>

      </div>

      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">区划等级</div>
        <div class="edit_item_input">
          <a-input disabled :value="config.grade?config.grade:(parentArea.levelType+1)" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt"><span style="color: #FF0000;">*</span>区划名称</div>
        <div class="edit_item_input">
          <a-input v-model="config.areaName" :maxLength='16' placeholder='2-16个中文汉字组成' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt"><span style="color: #FF0000;">*</span>地图位置</div>
        <div class="edit_item_input">
          <a-input disabled :value="config.longitude?(config.longitude+','+config.latitude):'请选择位置'" placeholder='请选择位置' />
        </div>
                <a-button class="map-btn" type='primary' @click="showMap()">地图定位</a-button>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">备注:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='250' :rows="5" placeholder="250字以内，格式不限制" v-model="config.remark" />
          <div class="edit_number_watt">{{config.remark.length}}/250</div>
        </div>
      </div>
      <div class="flexrow " style="margin-top: 30px;justify-item: flex-start;margin-left: 80px;">
        <a-button type="primary" @click='submit'>保存</a-button>
        <a-button  style="margin-left: 20px;" @click='reset'>重置</a-button>
      </div>
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
        areaId: '',
        visible:false,
        parentArea: {},
        config: {
          remark: ''
        }
      }
    },
    created() {
      this.areaId = this.$route.query.areaId
      this.parentArea = JSON.parse(localStorage.getItem('watthour'))
      if (this.areaId) {
        this.getDetail()
      }
    },
    methods: {
      async submit() {
        if (!this.$utils.isChinese16(this.config.areaName)) {
          this.$message.warning('区划名称格式错误')
          return
        }
        if (!this.config.longitude) {
          this.$message.warning('请选择位置')
          return
        }
        this.config.parentId = this.parentArea.id
        this.config.levelType = this.config.grade ? this.config.grade : (this.parentArea.levelType + 1)
        let res = await this.$http.post(this.$api.areasform, this.config)
        if (res.data.resultCode == 10000) {
          this.$router.go(-1)
          this.$message.success(res.data.resultMsg)
        } else {
          this.$message.error(res.data.resultMsg)
        }
      },
      async getDetail() {
        let param = {
          areaId: this.areaId,
        }
        let res = await this.$http.post(this.$api.areasdetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
        } else {
          this.$message.error(res.data.resultMsg)
          this.$router.go(-1)
        }
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
        //this.config.address = e
      },
      reset() {
        if (this.areaId) {
          this.getDetail()
        } else {
          this.config = {
            remark: ''
          }
        }
      }
    }
  }
</script>

<style>
  .edit_item_title_watt {
    width: 70px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    margin-right: 10px;
    text-align: right;
    color: #000000;
    flex-shrink: 0;
  }

  .edit_item_watt {
    margin: 0 auto;
    margin-top: 24px;
  }

  .edit_number_watt {
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
