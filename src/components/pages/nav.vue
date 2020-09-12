<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo_box flex_a" >
       <img class="logo_img" src="../../assets/nav_img/logo@2x.png" alt />
    </div>
    <a-menu
      theme="dark"
      mode="inline"
    >

    </a-menu>
  </a-layout-sider>
</template>
<script>
export default {
  name: "isnav",
  data() {
    return {};
  },
  computed: {
  },
  props: {
    iscollapsed: Boolean,
  },
};
</script>
<style  scoped>
.nav_icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
}
.nav_title{
  margin-left: 10px;
}
.rizhi{
  margin-left: 30px;
}
.logo_img{
  width: 120px;
  height: 42px;
}
.logo_box{
   width: 100%;
  height: 42px;
  margin-top: 16px;
  margin-bottom: 16px;

}
</style>
