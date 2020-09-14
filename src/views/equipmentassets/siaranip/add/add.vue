<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">路灯杆名称:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" placeholder='路灯杆名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">线路名称:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input" placeholder='线路名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>广播品牌:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in brandSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>广播型号:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in typeSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>广播名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.input" :maxLength='50' placeholder='50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>广播分机号:</div>
        <div class="edit_item_input">
          <a-input-number style='width: 667px' v-model="config.input" :min="100" :max="99999" placeholder='3-5位，数字' />
        </div>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>广播状态:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stageSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='256' :rows="5" placeholder="500字以内，格式不限制" @change="onChangeConfig" v-model="config.remark" />
          <div class="edit_number_ko_first">{{remarkLength}}/256</div>
        </div>
      </div>
    </div>
    <div class="flexrow flexjc" style="margin-top: 50px;">
      <a-button type='primary' style='margin-left: 20px;margin-right: 20px;'>保存</a-button>
      <a-button>重置</a-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        brandSelectList: [], //路灯杆品牌
        typeSelectList: [], //路灯杆型号
        stateSelectList: [], //路灯杆状态
        useSelectList: [], //用图类型
        ascSelectList: [], //归属线路
        remarkLength: 0,
        config: {
          brand: '',
          type: '',
          remark: ''
        }
      }
    },
    methods: {
      /* 修改描述 备注*/
      onChangeConfig(e) {
        this.remarkLength = this.config.remark.length
      },

      stateSelectChange(e) {},
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
