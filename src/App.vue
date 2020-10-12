<template>
 
    <div id="app">
       <a-config-provider :locale="zhCN">
      <router-view />
        </a-config-provider>
    </div>

</template>

<script>
  import zhCN from "ant-design-vue/es/locale/zh_CN";
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  moment.locale('zh-cn');
  export default {
    name: "App",
    data() {
      return {
        zhCN,
        ivews: "login,home" //缓存组件
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
  min-width: 1920px;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
}
#app::-webkit-scrollbar{
  display: none;
}
</style>
