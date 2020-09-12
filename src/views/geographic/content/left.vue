<template>
  <div id="search">
    <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>
    <div class="istree">
      <a-tree
        :show-line="showLine"
        :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
        @select="onSelect"
      >
        <a-icon slot="icon" type="carry-out" />
        <a-tree-node key="0-0">
          <a-icon slot="icon" type="carry-out" />
          <span slot="title" style="color: #1890ff">parent 1</span>
          <a-tree-node key="0-0-0" title="parent 1-0">
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0-0-0" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
            <a-tree-node key="0-0-0-1" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
            <a-tree-node key="0-0-0-2" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
          </a-tree-node>
          <a-tree-node key="0-0-1" title="parent 1-1">
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0-1-0" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
          </a-tree-node>
          <a-tree-node key="0-0-2" title="parent 1-2">
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0-2-0" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
            <a-tree-node key="0-0-2-1" title="leaf">
              <a-icon slot="icon" type="carry-out" />
              <a-icon slot="switcherIcon" type="form" />
            </a-tree-node>
          </a-tree-node>
        </a-tree-node>
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
  methods: {
    onSelect(selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onSearch(value) {
      console.log(value);
    },
    arrayToTree(arr, parentId) {
      //  arr 是返回的数据  parendId 父id
      let temp = [];
      let treeArr = arr;
      treeArr.forEach((item, index) => {
        if (item.parentId == parentId) {
          if (arrayToTree(treeArr, treeArr[index].id).length > 0) {
            // 递归调用此函数
            treeArr[index].children = arrayToTree(treeArr, treeArr[index].id);
          }
          temp.push(treeArr[index]);
        }
      });

      return temp;
    },
  },
};
</script>
<style scoped>
#search {
  width: 280px;
  height: 100%;
  padding: 20px;
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
