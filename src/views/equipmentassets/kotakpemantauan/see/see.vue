<template>
  <div class="content2">
    <div class="flexrow des-title">监控箱信息</div>
    <a-descriptions size='small' bordered>
      <!-- <a-descriptions-item label="监控箱品牌">
        {{config.deviceModelName}}
      </a-descriptions-item> -->
      <a-descriptions-item label="监控箱型号">
        {{config.modelName}}
      </a-descriptions-item>
      <a-descriptions-item label="监控箱名称" :span="2">
        {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="监控箱编号">
        {{config.deviceCode}}
      </a-descriptions-item>
      <a-descriptions-item label="监控箱状态" :span="2">

        {{config.statusCode==0?'备用':(config.statusCode==1?'启用':'报废')}}
      </a-descriptions-item>
      <a-descriptions-item label="用途类型">
        {{config.statusCode==0?'虚拟监控箱':"真实监控箱"}}
      </a-descriptions-item>
      <a-descriptions-item label="通讯模组号(IMEI)" :span="2">
        {{config.imei}}
      </a-descriptions-item>
      <a-descriptions-item label="物联数据卡(ICCID)">
        {{config.iccid}}
      </a-descriptions-item>
      <a-descriptions-item label="归属项目" :span="2">
        {{config.projectName}}
      </a-descriptions-item>
      <a-descriptions-item label="项目阶段">
        {{config.phaseName}}
      </a-descriptions-item>
      <a-descriptions-item label="启用线路数" :span="2">
        {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="地图位置">
        经度:{{config.longitude}}纬度:{{config.latitude}}
      </a-descriptions-item>
      <a-descriptions-item label="位置地址" :span="2">
        {{config.address}}
      </a-descriptions-item>
      <!-- <a-descriptions-item label="" :span="2">
      </a-descriptions-item> -->
    </a-descriptions>
    <div class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
    <a-descriptions size='small' bordered >
      <a-descriptions-item v-for='(item,index) in productSpecificationsList' :key='index' :label="item.parameterName" :span="index%2!=0?1:2">
        {{item.parameterValue?item.parameterValue:'未知'}}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {},//设备详情
        deviceId: "",//设备id
        productSpecificationsList:[]//产品规格详情列表
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.getDetail()
    },
    methods: {
      async getDetail() {
        if (!this.deviceId)
          return
        let param = {
          deviceId: this.deviceId
        }
        let res = await this.$http.post(this.$api.devicemonitorboxdetail, param)
        if (res.data.resultCode == 10000) {
          this.config = res.data.data
          this.getProductSpecifications()
        } else {
          this.$router.go(-1)
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
          this.productSpecificationsList=res.data.data
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
