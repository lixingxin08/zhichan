<template>
  <div id="home">
    <a-layout id="components-layout-demo-custom-trigger" >
      <isnav :iscollapsed="collapsed"></isnav>
      <a-layout class='scroller'>
        <ishead @tocollapsed="getcollapsed"></ishead>
        <a-layout-content style="background-color: #FFFFFF;margin: 20px;">
          <keep-alive :include="isinclude" >
            <router-view style="background-color: #FFFFFF;margin-bottom: 20px;"></router-view>
          </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import isnav from "../../components/pages/nav";
import ishead from "../../components/pages/header";

export default {
  name: "home",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      collapsed: false,
      searchdata: "",
      isinclude: "nav",
      isRouterShow: true,
    };
  },
  components: {
    isnav,
    ishead,
  },

  methods: {
    getcollapsed(val) {
      this.collapsed = val;
    },
    async reload() {
      this.isRouterShow = false;
      await this.$nextTick()
      this.isRouterShow = true;
    },
  },
  created() {},
};
</script>
<style>
#home {
  height: 100%;
}
#components-layout-demo-custom-trigger {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
.scroller {
 overflow: initial;
  height: 100vh;
  min-Width:80vw;
}
.scroller::-webkit-scrollbar{
  display: none;
}
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
