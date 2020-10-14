<template>
  <div class="content2">
    <div class="flexrow des-title">求助装置信息</div>
    <a-descriptions size='small' bordered>

      <a-descriptions-item label="求助装置型号">
        {{config.modelName}}
      </a-descriptions-item>
      <a-descriptions-item label="求助装置名称" :span="2">
        {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="求助装置分机号">
        {{config.deviceCode}}
      </a-descriptions-item>
      <a-descriptions-item label="求助装置状态" :span="2">
        {{config.statusCode==0?'备用':(config.statusCode==1?'启用':'已报废')}}
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆名称">
        {{lineConfig.name}}
      </a-descriptions-item>
      <a-descriptions-item label="线路名称" :span="2">
        {{lightConfig.name}}
      </a-descriptions-item>
      <a-descriptions-item label="">
      </a-descriptions-item>
    </a-descriptions>
    <div v-if='productSpecificationsList.length>0' class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
   <div class="flexrow" v-for='(item,index) in productSpecificationsList' :key='index'>
     <div class="att-title">{{item.propertyName}}</div>
     <div class="flexcolumn" style="width: 100%;">
       <div class="flexrow" v-for='(item2,index2) in item.childrenList' :key='index2'>
         <div class="att-item">{{item2.propertyName}}</div>
         <div class="att-item">{{item2.propertyValue}}</div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId: '',
        lineConfig: {}, //线路
        lightConfig: {}, //灯杆
        config: {},
        productSpecificationsList: [] //产品规格详情列表
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.lightConfig = this.$utils.getLightSelectKey()
      this.lineConfig = this.$utils.getLineSelectKey()
      if (this.deviceId) {
        this.getDetail()
      }
    },
    methods: {
      /* 获取详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicepolicedetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.getProductSpecifications()
        }
      },
 async getProductSpecifications() {
   this.paramList = []
   let param = {
     pageIndex: 1,
     pageSize: 200,
     modelId: this.config.modelId
   }
   let res = await this.$http.post(this.$api.parampage, param);
   if (res.data.resultCode == 10000) {
     let data = []
     res.data.data.result.forEach((item) => {
       if (item.parentId == '100000000000000000000000000000000000000000000000000000000000') {
         item.childrenList = []
         res.data.data.result.forEach((childItem) => {
           if (childItem.parentId == item.propertyId) {
             item.childrenList.push(childItem)
           }
         })
         if (item.childrenList.length <= 0)
           item.childrenList = [{}]
         data.push(item)
       }
     })
     this.productSpecificationsList = data
   }
 }
    }
  }
</script>

<style>
  .des-title {
    padding: 10px;
    background: #1890FF;
    font-size: 14px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
</style>
