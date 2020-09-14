<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      ivews:"login,home"//缓存组件
    }
  },
  mounted() {
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
