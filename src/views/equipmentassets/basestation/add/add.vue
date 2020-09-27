<template>
  <div class="content2">
    <div style="margin: 0 auto;">
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属路灯杆:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input"  placeholder='路灯杆名称' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">归属线路:</div>
        <div class="edit_item_input">
          <a-input disabled v-model="config.input"  placeholder='线路名称' />
        </div>
      </div>
     <!-- <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>控制器品牌:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in brandSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div> -->
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>5G基站型号:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in typeSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>5G基站名称:</div>
        <div class="edit_item_input">
          <a-input v-model="config.input" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>5G基站编号:</div>
        <div class="edit_item_input">
          <a-input v-model="config.input" :maxLength='30' placeholder='30字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号' />
        </div>
      </div>

  <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>5G基站运营商:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stageSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>
      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first"><span style="color: #FF0000;">*</span>5G基站状态:</div>
        <a-select :value="config.brand?config.brand:'请选择'" style="width: 667px;" @change="stateSelectChange">
          <a-select-option v-for='(item,index) in stateSelectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac edit_item_ko_first">
        <div class="edit_item_title_ko_first">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea :maxLength='250' :rows="5" placeholder="250字以内，格式不限制" @change="onChangeConfig" v-model="config.remark" />
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
        typeSelectList: [], //路灯杆型号
        kontrolerList:[],//灯具list
        stateSelectList: this.$config.statueList, //路灯杆状态
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
      kontrolerSelectChange(e){}
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
