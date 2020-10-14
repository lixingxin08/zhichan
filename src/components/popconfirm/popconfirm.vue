<template>
  <div v-show="visable" class="dialogdel">
    <div class="dialogdel_t flex_b">
      <div></div>
      <div @click="cancel()">
        <a-icon type="close" />
      </div>
    </div>
    <div class="dialogdel_c flex_a">您确定要删除吗？</div>
    <div class="dialogdel_f flex_a">
      <div class="flex_f">
        <a-button type='primary' @click="confirmDialog()">确定</a-button>
        <a-button style='margin-left: 40px;' @click="cancel()">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        visable: false
      }
    },
    props: {
      confirm: {
        type: Function,
        default: null
      }
    },
    methods: {
      confirmDialog() {
        this.$emit("confirm", this.item)
        this.visable = false
      },
      cancel() {
        this.$emit("cancle")
        this.visable = false
      },
      show(item) {
        this.item = item
        this.visable = true
      }
    },
  }
</script>

<style>
  .dialogdel {
    width: 600px;
    height: 392px;
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%);
    box-shadow: 0px 0px 20px #CCCCCC;
    border-radius: 8px;
    background-color: #fff;
    z-index: 2;
  }

  .dialogdel_t {
    width: 600px;
    height: 72px;
     border-top-left-radius: 8px;    border-top-right-radius: 8px;
    background: #1890ff;

    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialogdel_c {
    height: 248px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
