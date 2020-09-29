<template>
  <div class="content2">
    <div class="flexrow des-title">监控箱信息</div>
    <a-descriptions size='small' bordered>
      
      <a-descriptions-item label="监控箱型号" >
        Prepaid
      </a-descriptions-item>
      <a-descriptions-item label="监控箱名称" :span="2">
        YES
      </a-descriptions-item>
      <a-descriptions-item label="监控箱编号"  >
        2018-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="监控箱状态":span="2" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="用途类型" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="通讯模组号(IMEI)" :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="物联数据卡(ICCID)"  >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="归属项目" :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="项目阶段"  >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="启用线路数" :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="地图位置"  >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="位置地址" :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
    </a-descriptions>
    <div class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
    <a-descriptions size='small' bordered>
  


    </a-descriptions>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId:'',
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
    methods:{
      /* 获取详情*/
      async getDetail() {
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicecameradetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.getProductSpecifications()
        }
      },
      async getProductSpecifications() {
        this.productSpecificationsList = []
        let param = {
          pageIndex: 1,
          pageSize: 200,
          modelId: this.config.modelId
        }
        let res = await this.$http.post(this.$api.parampage, param);
        if (res.data.resultCode == 10000) {
          if(res.data.data)
          this.productSpecificationsList = res.data.data
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
