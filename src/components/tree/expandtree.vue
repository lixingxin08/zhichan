<template>
  <div class="search">
    <!-- <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>-->
    <div class="istree">
      <a-tree :show-line="showLine" :load-data="onLoadData" @select="onSelect" @expand='onExpand' :tree-data="treedata"
        :default-selected-keys='defaultSelectedKeys' :replaceFields="replaceFields" :expandedKeys="expandedKeys">
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
        showTree: false,
        olddata: "",
        expandedKeys: []
      };
    },
    props: {
      treedata: Array, //树数据
      onLoadData: {
        type: Function,
        default: null
      },
      replaceFields: {
        type: Object,
        default: () => ({ //左边shu
          title: "name",
          key: "id",
        })
      }, //替换属性
      defaultSelectedKeys: Array
    },
    created() {
    this.updateExpandKeys()
    },
    methods: {
      onExpand(expandedKeys, expandedNodes) {

        this.expandedKeys = expandedKeys
        localStorage.setItem('treeExpandedKeys', JSON.stringify(this.expandedKeys))
      },
      onSelect(selectedKeys, selectedNodes) {
        if (selectedNodes.selected == false) {
          return
        }
        this.getAreaId(selectedNodes.node)
        this.$emit("parentdata", selectedNodes.node.$parent.dataRef)
        this.olddata = selectedNodes.selectedNodes[0].data.props
        this.$emit("selectdata", selectedNodes.selectedNodes[0].data.props || "");
      },
      onSearch(value) {
        this.$emit("searchdata", value);
      },
      updateExpandKeys(){
        if (localStorage.getItem('treeExpandedKeys'))
          this.expandedKeys = JSON.parse(localStorage.getItem('treeExpandedKeys'))
      },
      getAreaId(node) {
        if (!node.dataRef)
          return
        if (node.dataRef.nodeType == 'AREA') {
          this.$utils.setAreaId(node.dataRef)
        } else {
          if (node.$parent)
            this.getAreaId(node.$parent)
        }
      }
    },
  };
</script>
<style scoped>
  .istree {
    width: auto;
    text-align: left;
    height: 90vh;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    overflow-y: scroll;
  }

  .istree::-webkit-scrollbar {
    display: none;
  }
</style>
