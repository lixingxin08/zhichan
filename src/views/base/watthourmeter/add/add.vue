<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">上级区域</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" />
        </div>

      </div>

      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">区划等级</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt"><span style="color: #FF0000;">*</span>区划名称</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt"><span style="color: #FF0000;">*</span>上级区域</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" />
        </div>
      </div>
      <div class="flexrow flexac edit_item_watt">
        <div class="edit_item_title_watt">字典描述:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='256' :rows="5" placeholder="字典描述" @change="onChangeConfig" v-model="remark" />
          <div class="edit_number_watt">{{remarkLength}}/256</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        remarkLength: 0,
        config: {}
      }
    },
    methods: {
      onChangeConfig(e) { //修改字典描述
        this.remarkLength = this.config.remark.length
      },
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
