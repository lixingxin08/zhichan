<template>
  <div id="app">
      <a-config-provider :locale="zhCN">
        <router-view />
      </a-config-provider>
  </div>
</template>

<script>
  import zhCN from "ant-design-vue/es/locale/zh_CN";
export default {
  name: "App",
  data() {
    return {
        zhCN,
      ivews:"login,home"//缓存组件
    }
  },
  mounted() {
    this.$utils.cleanTree()
    localStorage.setItem("istoken", "istoken");
  },

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
  height: 100%;
}
</style>
