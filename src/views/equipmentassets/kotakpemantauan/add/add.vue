<template>
  <div class="content2">
    <a-steps style='width: 400px;margin: 0 auto;' :current="step" type="navigation" @change="onChangeStep">
      <a-step v-for="item in steps" :key="item.status" :title="item.title" />
    </a-steps>
    <is-first v-if="step==0"></is-first>
    <is-second v-if="step==1"></is-second>
    <div class="flexrow flexjc" style="margin-top: 50px;">
<a-button v-if='step!=0' @click='backStep'>上一步</a-button>
<a-button type='primary' style='margin-left: 20px;margin-right: 20px;'>保存</a-button>
<a-button type='primary' style='margin-right: 20px;'>保存并复制</a-button>
<a-button>重置</a-button>
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
        config: {}
      }
    },
    methods: {
      onChangeConfig(e) { //修改字典描述
        this.remarkLength = this.config.remark.length
      },
      onChangeStep(step) {
        this.step = step;
      },
      backStep(){
        this.onChangeStep(this.step-1)
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
