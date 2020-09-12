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
    let sessionid=  JSON.parse(localStorage.getItem('usermsg')).iscookie||"asdkasgdkjakkj"
      this.setCookie('session',sessionid,10000)
  },
  methods:{
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
      },
  }

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
