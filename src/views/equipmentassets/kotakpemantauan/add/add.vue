<template>
  <div class="content2" style="position: relative;">
    <a-steps style='width: 400px;margin: 0 auto;' :current="step" type="navigation" @change="onChangeStep">
      <a-step v-for="item in steps" :key="item.status" :title="item.title" />
    </a-steps>
    <is-first ref='first' v-show="step==0" :deviceId='deviceId' :areaId='areaId' :copy='copy' @callback='submitCallBack'
      @callbackDeviceCode='callbackDeviceCode'></is-first>
    <is-second v-show="step==1" ref='second' :deviceCode='deviceCode' :deviceId='deviceId' :callBackDeviceId='callBackDeviceId'></is-second>
    <div v-if='step!=1' class="flexrow flexjc" style="margin-top: 50px;">

      <a-button type='primary' style='margin-left: 20px;margin-right: 20px;' @click='save'>保存</a-button>
      <a-button type='primary' style='margin-right: 20px;' @click='submitNext'>保存并下一步</a-button>
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  import isFirst from './first/first.vue'
  import isSecond from './second/second.vue'
  export default {
    components: {
      isFirst,
      isSecond
    },
    data() {
      return {
        step: 0, //步骤
        steps: [{
            title: '监控箱信息',
            status: 1
          },
          {
            title: '线路信息',
            status: 2
          },
        ],
        saveAndNext: false,
        deviceId: "",
        deviceCode: "",
        areaId: '',
        copy: false
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.areaId = this.$route.query.areaId
      this.copy = this.$route.query.copy == 'true'
    },
    methods: {
      /* 切换视图*/
      onChangeStep(step) {
        if (step == 1 && !this.$refs.first.getMontiorStatue()) {
          return
        }
        if (step == 1 && !this.deviceCode) {

          return
        } else {
          this.$refs.second.getLineData()
        }
        this.step = step;
      },
      submitCallBack(data) {
        if (data.resultCode == 10000) {
          //this.step = 1
          //this.deviceCode = data.deviceCode
          if (this.saveAndNext) {
            this.saveAndNext = false
            this.step = 1
            this.$refs.second.getLineData()
          } else {
            this.$router.push("/kotakpemantauan")
          }
          this.$message.success(data.resultMsg)
        } else {
          this.$message.error(data.resultMsg)
        }
      },
      /* 返回*/
      backStep() {
        this.onChangeStep(this.step - 1)
      },
      /* 保存*/
      save() {
        if (this.step == 0) {
          this.$refs.first.submit()
        }
      },
      callbackDeviceCode(e) {
        this.deviceCode = e
      },
      /* 下一步*/
      submitNext() {
        this.saveAndNext = true
        if (this.step == 0) {
          this.$refs.first.submit()
        }
      },
      /* 回调设备id*/
      callBackDeviceId(deviceId) {
        this.deviceId = deviceId
      },
      /* 重置*/
      reset() {
        if (this.step == 0) {
          this.$refs.first.reset()
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
