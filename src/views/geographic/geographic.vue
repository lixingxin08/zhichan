<template>
  <div class="supervisionhome">
    <is-top></is-top>
    <div class="content flex_fs">
      <div class="changlist" @click="changelist()">切换列表</div>
      <is-left></is-left>
      <is-map v-show="listtype"></is-map>
      <is-list v-show="!listtype"></is-list>
    </div>
  </div>
</template>
<script>
import isTop from "./top/top";
import isList from "./list/list";
import isLeft from "./content/left";
import isMap from "./content/map";
export default {
  name:"supervision",
  data() {
    return {
      listtype: true,
    };
  },
  components: {
    isTop,
    isLeft,
    isMap,
    isList
  },
  methods: {
    changelist(){
      this.listtype=!this.listtype
    }
  },
  created() {},
};
</script>
<style  scoped>
.supervisionhome {
  height: 9.6rem;
  
}
.content {
  width: 100%;
  height: 8.6rem;
  
  position: relative;
}
.changlist {
  width: 88px;
  height: 32px;
  line-height: 32px;
  background: rgba(24, 144, 255, 1);
  border: 1px solid rgba(24, 144, 255, 1);
  box-shadow: 0px 0px 6px rgba(24, 144, 255, 1);
  color: #fff;
  opacity: 1;
  border-radius: 4px;
  position: absolute;
  top:20px;
  left: 20px;
  z-index: 2;
  cursor: pointer;
}
</style>
