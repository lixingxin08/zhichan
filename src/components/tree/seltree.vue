<template>
  <div class="search">
    <!-- <div class="search">
      <a-input-search placeholder enter-button="搜索" size="default" @search="onSearch" />
    </div>-->
    <div class="istree">
      <a-tree :show-line="showLine" @select="onSelect" :checkable="checkable" :tree-data="treedata" :replaceFields="replaceFields"
        :checked-keys="checkedKeys" :default-expanded-keys="defaultExpandedKeys" @check="onCheck">
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
        olddata: "",
      };
    },
    props: {
      treedata: Array, //树数据
      checkable: {
        type: Boolean,
        default: true
      },
      replaceFields: Object, //替换属性
      defaultExpandedKeys: Array, //默认展开
      checkedKeys: {
        type: Array,
        default:()=>[]
      }
    },
    created() {

    },
    methods: {
      onSelect(selectedKeys, selectedNodes) {
        console.log(selectedKeys, selectedNodes, 8889999, this.checkedKeys);

        // if (this.checkedKeys.includes(selectedKeys[0])) {
        //     for (let i = 0; i < this.checkedKeys.length; i++) {
        //       if (this.checkedKeys[i]==selectedKeys[0]) {
        //         console.log(i,1111111111111111);
        //         this.checkedKeys.splice(i,1)
        //       }
        //     }
        // }else{
        //     this.checkedKeys.push(selectedKeys[0])
        // }
        // console.log(this.checkedKeys,55555555555555555);
        if (selectedNodes.selected == false) {
          return;
        }
        this.olddata = selectedNodes.selectedNodes[0].data.props;
        this.$emit("selectdata", selectedNodes.selectedNodes[0].data.props || "");
      },
      onSearch(value) {
        console.log(value, 88292);
        //this.$emit("searchdata", value);
      },
      onCheck(checkedKeys, info) {
       // console.log("onCheck", checkedKeys);
        //this.checkedKeys =checkedKeys
        this.$emit("checkedKeys", checkedKeys);
      },
      setSelectKey(checkedKeys) {
        this.checkedKeys = checkedKeys
      }
    },
  };
</script>
<style scoped>
  .search {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
    overflow: scroll;
  }

  .search::-webkit-scrollbar {
    display: none;
  }

  .search {
    width: 100%;
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
