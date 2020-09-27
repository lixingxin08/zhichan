<template>
  <div class="supervisionhome">
    <div class="changlist" @click="show()">地图定位</div>
    <div class="content flex_fs">
      <div class="changlist" @click="changelist()">切换列表</div>
      <is-left></is-left>
      <is-map :visible='visible' @positon='getposition' @isvisible='getvisible'></is-map>
    
    </div>
  </div>
</template>
<script>
import isLeft from "./content/left";
// import isMap from "./content/map";
import isMap from "../../components/position/position";
 
import {Mixin1} from '../../utils/mixins'
export default {
  name:"supervision",
  mixins: [Mixin1],
  data() {
    return {
      listtype: true,
      visible:false
    };
  },
  components: {
    isLeft,
    isMap,
  },
  methods: {
    show(){
      this.visible=true
    },
    getvisible(val){
      this.visible=val
    },
    getposition(val){
      console.log(val,655565);
    },
    changelist(){
              const tHeader = ['账本名称','日账单日期', '数据行', '支付总额','支付时间','状态']
            const filterVal = ['name','createTime', 'userCount', 'payMoneyTotal', 'payTime','status']
            let list=[{name:1,createTime:11,userCount:2,payMoneyTotal:3,payTime:4,status:5}]
            this.exportExcel(tHeader,filterVal,list,"test")
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

</style>
