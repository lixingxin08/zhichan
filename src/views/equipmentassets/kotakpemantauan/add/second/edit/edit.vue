<template>
  <div class="ps_ab">
    <div class="ps_flex" style="padding: 0px;border-radius: 10px;">
      <div class="dialog-title flexrow flexac flexsb">线路
        <a-icon type="close" @click='closedialog' />
      </div>

      <div class="flexrow flexac item-model" style="margin-top: 20px;">

        <div class="item-title-model"><span style="color: #FF0033;">*</span>线路名称:</div>
        <a-input v-model='param.parameterName' :maxLenght="50" placeholder="50字以内，中文汉字、英文字母、数字、英文下划线、中英文小括号"></a-input>
      </div>


      <div class="flexrow flexac item-model">
        <div class="item-title-model"><span style="color: #FF0033;">*</span>线路状态:</div>
        <a-select :value="param.paramType?param.paramType:'请选择线路状态'" class='select_item_param' @change="handleChange">
          <a-select-option v-for='(item,index) in selectList' :key='index' :value="item.comboBoxId">
            {{item.comboBoxName}}
          </a-select-option>
        </a-select>
      </div>

      <div class="flexrow flexac item-model">
        <div class="item-title-model">备注信息:</div>

        <a-textarea v-model="param.description" :maxLenght="500" placeholder="请输入线路描述,500字以内" :auto-size="{ minRows: 3, maxRows: 5 }" />
      </div>
      <div class="flexrow flexjc" style="margin-top: 40px;margin-bottom: 100px;">
        <a-button type='primary' @click='submit'>确定</a-button>
        <a-button style="margin-left: 70px;">重置</a-button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        param:{
paramType:1
        },
        selectList: [{
            comboBoxId: '1',
            comboBoxName: '备用'
          },
          {
            comboBoxId: '2',
            comboBoxName: '启用'
          }, {
            comboBoxId: '3',
            comboBoxName: '损坏'
          }
        ]
      }
    },

    methods: {
      setParam(item){
        this.param=item
      },
      submit() {
        if (!this.param.parameterName) {
          this.$message.warning('线路名称不能为空');
          return
        }

        if (!this.paramType) {
          this.$message.warning('请选择线路状态类型');
          return
        }
        let param = this.param
        param.paramType = this.paramType
        this.$emit('callback', param)
      },
      closedialog() {
        this.$emit('callback')
      },
      handleChange(e) {
        this.param.paramType = e
      },
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
