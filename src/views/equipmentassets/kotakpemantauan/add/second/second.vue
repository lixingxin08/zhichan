<template>
  <div class="flexcolumn">
    <a-button type='primary' style='width: 108px;margin: 20px;'@click="edit({})">+ 新增线路</a-button>
    <a-table :scroll="{  y: 700 }" style='width: 80%;margin-left: 20px;' :columns="tableTitle" :data-source="tableData" bordered size="small" :pagination="false"
     >
      <template slot="index" slot-scope="text, record,index">{{(index+1)}}</template>
      <template slot="operation" slot-scope="text, record">
        <div class="flexrow flexac flexjc">
          <a href="#" style='font-size: 12px;' @click="edit(record)">编辑</a>
          <div class="per-line"></div>
          <a-popconfirm title="确定删除？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record)">
            <a href="#" style='color: #FF0000;font-size: 12px;'>删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <is-edit ref='edit' v-show="isShowEdit" @callback='editCallBack'></is-edit>
  </div>
</template>

<script>
  import tbData from '../../table.json'
  import isEdit from './edit/edit.vue'
  export default {
    components:{
      isEdit
    },
    data() {
      return {
        isShowEdit:false,//是否展示修改 新增页面
        tableTitle:tbData.tableLineTitle,
        tableData: [{}]
      }
    },
    methods:{
      /* 新增修改*/
      edit(item){
        this.$refs.edit.setParam(item)
        this.isShowEdit=true
      },
      /* 新增修改 回调*/
      editCallBack(param){
        if(param){}
        this.isShowEdit=false
      }
    }
  }
</script>

<style>
  .add_kotak_btn {
    width: 128px;
  }
</style>
