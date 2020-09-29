<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属项目:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.projectName" placeholder='路灯杆名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">项目阶段:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.phaseName" placeholder='线路名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">设备类型:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.deviceTypeName" placeholder='设备类型' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">设备型号:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.modelName" placeholder='设备型号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">投运期始:</div>
        <a-date-picker style='width: 667px;' @change="startofoperationChange" />
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">有效期始:</div>
        <a-date-picker style='width: 667px;' @change="validityperiodbeginsChange" />
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">有效期止:</div>
        <a-date-picker style='width: 667px;' @change="expirationDateChange" />
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
      <a-button @click='reset'>重置</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId:'',
        config: {
          remark: ''
        }
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
    },
    methods: {
      reset() {},
      submit(){},
      expirationDateChange() {
        console.log(date, dateString);
      },
      validityperiodbeginsChange() {
        console.log(date, dateString);
      },
      startofoperationChange() {
        console.log(date, dateString);
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
