<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">线路
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item-model" style="margin-top: 20px;">

        <div class="item-title-model"><span style="color: #FF0033;">*</span>线路名称:</div>
        <a-input v-model='param.lineName' :maxLength="20" placeholder="20字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"></a-input>
      </div>

      <div class="flexrow flexac item-model" style="margin-top: 20px;">

        <div class="item-title-model"><span style="color: #FF0033;">*</span>开关名称:</div>
        <a-input-number style='width: 667px;' v-model='param.switchNo' :max="999999" placeholder="请输入开关名称,范围0~999999"></a-input-number>
      </div>
      <div class="flexrow flexac item-model">
        <div class="item-title-model"><span style="color: #FF0033;">*</span>线路状态:</div>
        <a-select :value="param.enableFlag>=0?param.enableFlag:'请选择线路状态'" class='select_item_param' @change="handleChange">
          <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac item-model">
        <div class="item-title-model">备注信息:</div>
        <div style="position: relative;width: 667px;">
          <a-textarea v-model="param.remark" :maxLength="250" placeholder="请输入线路描述,250字以内" :auto-size="{ minRows: 3, maxRows: 5 }" />
          <div class="edit_number_ko_first">{{param.remark.length}}/250</div>
        </div>
      </div>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type='primary' @click='submit'>确定</a-button>
        <a-button style="margin-left: 70px;" @click='reset'>重置</a-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        param: {
          enableFlag: -1,
          remark: ''
        },
        selectList: this.$config.lineStatueList
      }
    },

    methods: {
      setParam(item) {
        localStorage.setItem('cache', JSON.stringify(item))
        this.param = JSON.parse(localStorage.getItem('cache'))
      },
      submit() {
        if (!this.$utils.vify_cn20(this.param.lineName)) {
          this.$message.warning('线路名称格式错误')
          return
        }
        if (!this.param.lineName) {
          this.$message.warning('线路名称不能为空');
          return
        }
        if (!this.param.switchNo) {
          this.$message.warning('开关名称不能为空');
          return
        }
        if (this.param.enableFlag < 0) {
          this.$message.warning('请选择线路状态类型');
          return
        }
        this.$emit('callback', this.param)
      },
      closedialog() {
        this.$emit('callback')
      },
      handleChange(e) {
        this.param.enableFlag = e
      },
      reset() {
        this.param = JSON.parse(localStorage.getItem('cache'))
      }
      // /* 获取业务类别*/
      // async getCombobox() {
      //   let param = {
      //     classCode: 'device_mode_param'
      //   }
      //   let res = await this.$http.post(this.$api.dictionarycombobox, param)
      //   if (res.data.resultCode == 10000) {
      //     this.paramList = res.data.data
      //   }
      // },
    }
  }
</script>

<style>
  .dialog-title {
    background: #1890FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 24px;
    height: 72px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    color: #ffffff;
    line-height: 14px;
  }

  .item-model {

    margin-left: 40px;
    margin-right: 40px;
    margin-top: 10px;
  }

  .select_item_param {
    width: 667px;
  }

  .item-title-model {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: right;
    margin-right: 10px;
    width: 120px;
    line-height: 14px;
    flex-shrink: 0;
  }
</style>
