<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属项目:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.projectName" placeholder='无' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">项目阶段:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.phaseName" placeholder='无' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">设备类型:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.deviceTypeName" placeholder='无' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">设备型号:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.modelName" placeholder='无' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">投运期始:</div>
        <a-date-picker :value='config.putInDate' style='width: 667px;' @change="putInDateChange" />
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">有效期始:</div>
        <a-date-picker :value='config.startDate' style='width: 667px;' @change="startDateChange" />
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">有效期止:</div>
        <a-date-picker :value='config.endDate' style='width: 667px;' @change="endDateChange" />
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
        config: {
          remark: ''
        }
      }
    },
    created() {
      this.reset()
    },
    methods: {
      reset() {
        let item = JSON.parse(localStorage.getItem('masagaransiperalatan'))
        if (!item.remark)
          item.remark = ''
        this.config = item
      },
      async submit() {
        let res = await this.$http.post(this.$api.deviceguaranteeform,this.config)
        if (res.data.resultCode == 10000) {
          this.$message.success(res.data.resultMsg)
          this.$router.push('/masagaransiperalatan')
        }else{
           this.$message.error(res.data.resultMsg)
        }
      },
      putInDateChange(date, dateString) {
        this.config.putInDate = dateString
      },
      startDateChange(date, dateString) {
        this.config.startDate = dateString
      },

      endDateChange(date, dateString) {
        this.config.endDate = dateString
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
