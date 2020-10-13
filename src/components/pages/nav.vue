<template>
  <a-layout-sider v-model="iscollapsed" class="scroller2" :trigger="null" collapsible collapsedWidth="0">
    <div class="logo_box flexcolumn flexac">
      <img class="logo_img" :src="usermsg.customerLogo" alt />
      <div class="logo_title">{{usermsg.customerName}}</div>
    </div>
    <div style="height: 2px;background-color: #FFFFFF;width: 90%;margin: 8px auto;"></div>
    <a-menu theme="dark" mode="inline" @click="handleClick" @openChange='openChange' :selected-keys="selectedKeys"
      :open-keys="openKeys">
      <!--  <a-sub-menu v-if='menudata' v-for='(item,index) in menudata' :key='index'>
        <div slot="title" class="flex_F">
          <img class="nav_icon" src="../../assets/nav_img/icon_z_jichu@2x.png" alt />
          <span class="nav_title">基础配置</span>
        </div>
        <a-menu-item v-for='(item2,index2) in item.children' :key="index2">
          <span @click="gotoUrl(item.url)">行政区划</span>
        </a-menu-item>
      </a-sub-menu>-->
      <template v-for="item in menudata">
        <a-menu-item v-if="!item.children" :key="item.menuName">
          <router-link :to="{path:item.linkURL}">
            <img style='width: 14px;height: 14px;margin-right:5px ' :src="item.menuIcon" alt /> <span>{{item.menuName}}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.id" :menu-info="item"></sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script>
  import {
    Menu
  } from "ant-design-vue";
  import js from './new_file.json'
  const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.menuName" v-bind="$props" v-on="$listeners">
          <span slot="title">
           <img style='width: 14px;height: 14px;margin-right:5px ' :src="menuInfo.menuIcon" alt /><span>{{ menuInfo.menuName }}</span>
          </span>
          <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.menuName" >
           <router-link :to="item.linkURL">
             <img style='width: 14px;height: 14px;margin-right:5px ' :src="item.menuIcon" alt />
                    <span>{{item.menuName}}</span>
                  </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.menuName" :menu-info="item" />
          </template>
        </a-sub-menu>
      `,
    name: "SubMenu",
    // must add isSubMenu: true
    isSubMenu: true,
    props: {
      ...Menu.SubMenu.props,
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  };

  export default {
    name: "isnav",
    data() {
      return {
        usermsg: {},
        menudata: [], //树数据
        selectedKeys: [],
        openKeys: []
      };
    },
    components: {
      "sub-menu": SubMenu,
    },

    created() {
      if (localStorage.getItem("asset"))
        this.usermsg = JSON.parse(localStorage.getItem("asset"))
      this.getMenuList();
    },
    methods: {
      handleClick(e) {
        console.log('click ', e.key);
        this.selectedKeys = [e.key]
      },
      openChange(e) {
        console.log('open ', e);
        this.openKeys = e
        localStorage.setItem("navOpenId", JSON.stringify(e))
      },
      async getMenuList() {
        let isurl = window.location.href.split('#/')
        console.log(isurl, 9999);
        let isurl2 = isurl[1].split('/')
        if (localStorage.getItem("asset")) {
          let navlist = JSON.parse(localStorage.getItem("asset")).navlist
          for (let i = 0; i < navlist.length; i++) {
            if (navlist[i].linkURL == isurl2[0]) {
              this.selectedKeys = navlist[i].menuName
            }
          }
          this.menudata = this.toTree(
            navlist
          );
        } else {
          if (isurl[0].indexOf('localhost') >= 0)
            this.menudata = this.toTree(js.navlist)
        }

      },
      toTree(data) {
        let result = [];
        if (!Array.isArray(data)) {
          return result;
        }
        data.forEach((item) => {
          delete item.children;
        });
        let map = {};
        data.forEach((item) => {
          map[item.menuId] = item;
        });
        data.forEach((item) => {
          let parent = map[item.parentId];
          if (parent) {
            (parent.children || (parent.children = [])).push(item);
          } else {
            result.push(item);
          }
        });
        if (localStorage.getItem("navOpenId")) {
          this.openKeys = JSON.parse(localStorage.getItem("navOpenId"))
        }
        return result;
      },
    },

    props: {
      iscollapsed: Boolean,
    },
  };
</script>
<style scoped>
  .logo_title {
    width: 90%;
    margin-top: 5px;
    font-size: 15px;
    font-weight: bold;
 overflow: hidden;
 	text-overflow:ellipsis;
 	white-space: nowrap;

  }

  .nav_icon {
    width: 14px;
    height: 14px;
  }

  .nav_title {
    margin-left: 10px;
  }

  .scroller2 {
    color: #fff;
    height: 100vh;
    overflow: scroll;
    max-height: 1009px;
  }

  .scroller2::-webkit-scrollbar {
    display: none;
  }

  .rizhi {
    margin-left: 30px;
  }

  .logo_img {
    width: 120px;
    height: 42px;
  }

  .logo_box {
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
