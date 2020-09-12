<template>
  <div class="dialog">
    <div class="dialog_t flex_b">
      <div></div>
      <div @click="cancel()">
        <a-icon type="close" />
      </div>
    </div>
    <div class="dialog_c flex_a">您确定要删除吗？</div>
    <div class="dialog_f flex_a">
      <div class="flex_f">
        <div class="ok_btn" @click="confirm()">确定</div>
        <div class="cancel_btn" @click="cancel()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    methods:{
      confirm(){
        //  this.isremove()
        this.$emit("confirm")
      },
      cancel(){
         this.$emit("cancle")
      },
    },
  }
</script>

<style>
  .dialog {
    width: 920px;
    height: 492px;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
    border-radius: 8px;
    background-color: #fff;
    z-index: 2;
  }

  .dialog_t {
    width: 920px;
    height: 72px;
    background: #1890ff;
    border: 1px solid #1890ff;
    padding: 0 40px;
    color: #fff;
    font-size: 24px;
  }

  .dialog_c {
    height: 348px;
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #333333;
  }
</style>
