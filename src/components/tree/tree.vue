<template>
  <div class="search">
    <!-- <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>-->
    <div class="istree">
      <a-tree
        :show-line="showLine"
        @select="onSelect"
        :tree-data="treedata"
        :replaceFields="replaceFields"
        :default-expanded-keys="defaultExpandedKeys"
      >
        <a-icon slot="icon" type="carry-out" />
      </a-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLine: true,
      showIcon: true,
      olddata:""
    };
  },
  props: {
    treedata: Array, //树数据
    replaceFields: Object, //替换属性
    defaultExpandedKeys: Array, //默认展开
  },
  created() {},
  methods: {
    onSelect(selectedKeys, selectedNodes) {
      console.log(selectedKeys, selectedNodes,8889999);
      if (selectedNodes.selected==false) {
        return
      }
      this.olddata=selectedNodes.selectedNodes[0].data.props
      this.$emit("selectdata", selectedNodes.selectedNodes[0].data.props || "");
    },
    onSearch(value) {
      console.log(value, 88292);
      this.$emit("searchdata", value);
    },
  },
};
</script>
<style scoped>

.istree {
  width: 100%;
  text-align: left;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.istree::-webkit-scrollbar {
  display: none;
}
</style>
