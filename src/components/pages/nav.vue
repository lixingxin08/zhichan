<template>
  <a-layout-sider v-model="iscollapsed" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo_box flex_a" >
       <img class="logo_img" src="../../assets/nav_img/logo@2x.png" alt />
    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[$route.name]" :selectedKeys="[$route.name]">
      <a-menu-item key="asetgeografis">
        <!-- <a-icon type="calendar" /> -->
        <router-link to="/asetgeografis">
          <span>地理资产</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu key="watthourmeter" >
        <div slot="title" class="flex_F">
          <img class="nav_icon" src="../../assets/nav_img/icon_z_jichu@2x.png" alt />
          <span class="nav_title">基础配置</span>
        </div>
        <a-menu-item key="watthourmeter">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/watthourmeter'>
            <span>区域管理</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="asetperalatan" >
        <div slot="title" class="flex_F">
          <img class="nav_icon" src="../../assets/nav_img/icon_z_jichu@2x.png" alt />
          <span class="nav_title">设备资产</span>
        </div>
        <a-menu-item key="kotakpemantauan">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/kotakpemantauan">
            <span>监控箱信息</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="tianglampu">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/tianglampu'>
            <span>路灯杆</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="kontroler">
          <!-- <a-icon type="upload" /> -->
          <router-link to="/kontroler">
            <span>路灯控制器</span>
          </router-link>
        </a-menu-item>
      <!--   <a-menu-item key="pengelompokan">
          <a-icon type="upload" />
          <router-link to='/pengelompokan'>
            <span>分组管理</span>
          </router-link>
        </a-menu-item>-->
        <a-menu-item key="kamera">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/kamera'>
            <span>摄像头信息</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="siaranip">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/siaranip'>
            <span>公共广播</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="panggilbantuan">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/panggilbantuan'>
            <span>求助报警</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="apinfo">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/apinfo'>
            <span>共享WIFI</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="lingkungan">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/lingkungan'>
            <span>环境要素信息</span>
          </router-link>
        </a-menu-item>
         <a-menu-item key="layarled">
         <!--   <a-icon type="upload" /> -->
           <router-link to='/layarled'>
             <span>多媒体发布屏</span>
           </router-link>
         </a-menu-item>
        <a-menu-item key="masagaransiperalatan">
          <!-- <a-icon type="upload" /> -->
          <router-link to='/masagaransiperalatan'>
            <span>设备质保期</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
  export default {
    name: "isnav",
    props: {
      iscollapsed: Boolean,
    },
  };
</script>
<style>
  .logo_box{
     width: 100%;
    height: 42px;
    margin-top: 16px;
    margin-bottom: 16px;

  }
  .logo_img{
    width: 120px;
    height: 42px;
  }
  .nav_icon {
    width: 14px;
    height: 14px;
    vertical-align: middle;
  }
  .nav_title{
    margin-left: 10px;
  }
</style>
