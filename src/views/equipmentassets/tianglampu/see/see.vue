<template>
  <div class="content2">
    <div class="flexrow des-title">路灯杆信息</div>
    <a-descriptions size='small' bordered>

      <a-descriptions-item label="路灯杆型号" >
        {{config.modelName}}
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆名称" :span="2">
        {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆编号" >
       {{config.deviceCode}}
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆状态" :span="2">
        {{config.statusCode==0?'备用':(config.statusCode==1?'启用':'报废')}}
      </a-descriptions-item>
      <a-descriptions-item label="用途类型" >
       {{config.useType==1?'智慧路灯杆':'普通路灯杆'}}
      </a-descriptions-item>
      <a-descriptions-item label="监控箱名称" :span="2">
        {{monitorName}}
      </a-descriptions-item>
      <a-descriptions-item label="归属线路" >
       {{config.lineName}}
      </a-descriptions-item>
      <a-descriptions-item label="归属项目" :span="2">
       {{config.projectName}}
      </a-descriptions-item>
      <a-descriptions-item label="项目阶段" >
          {{config.phaseName}}
      </a-descriptions-item>
      <a-descriptions-item label="地图位置" :span="2">
      经度:{{config.longitude}}纬度:{{config.latitude}}
      </a-descriptions-item>
      <a-descriptions-item label="位置地址" >
       {{config.address}}
      </a-descriptions-item>
    </a-descriptions>
    <div v-if="productSpecificationsList.length>0" class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
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
        deviceId: '', //路灯杆id
        monitorName: '', //监控箱id
        config: {}, //路灯杆详情
        monitorConfig: {}, //监控箱详情
        productSpecificationsList: [] //产品规格详情列表
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.monitorName = this.$route.query.monitorName
      if (this.deviceId) {
        this.getDetail()
      }

    },
    methods: {
      /* 获取路灯杆详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicelightpoledetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.getProductSpecifications()
        }
      },
      /* 获取监控箱详情*/
      async getMonitorDetail() {
        let param = {
          deviceId: this.monitorId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxdetail, param)
        if (res.data.resultCode == 10000) {
          this.monitorConfig = res.data.data
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
     res.data.data.forEach((item) => {
       if (item.parentId == '100000000000000000000000000000000000000000000000000000000000') {
         item.childrenList = []
         res.data.data.forEach((childItem) => {
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
