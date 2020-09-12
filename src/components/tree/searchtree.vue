<template>
  <div id="search">
    <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>
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
      this.$emit("selectdata", "");
      this.$emit("selectdata", selectedNodes.selectedNodes[0].data.props || "");
    },
    onSearch(value) {
      this.$emit("searchdata", value);
    },
  },
};
</script>
<style scoped>
#search {
  width: 100%;
  height: 100%;
  min-height: 909px;
  padding: 20px;
  background-color: #fff;
  overflow: scroll;
  box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.16);
}
#search::-webkit-scrollbar {
  display: none;
}
.search {
  width: 240px;
}
.istree {
  text-align: left;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.istree::-webkit-scrollbar {
  display: none;
}
</style>
