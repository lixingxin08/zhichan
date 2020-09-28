<template>
  <div class="content2">
    <div class="flexrow des-title">灯具信息</div>
    <a-descriptions size='small' bordered>

      <a-descriptions-item label="灯具型号">
        {{config.modelName}}
      </a-descriptions-item>
      <a-descriptions-item label="灯具名称" :span="2">
        {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="灯具编号">
        {{config.deviceCode}}
      </a-descriptions-item>
      <a-descriptions-item label="监灯具状态" :span="2">
        {{config.statusCode==0?'备用':(config.statusCode==1?'启用':'报废')}}
      </a-descriptions-item>
      <a-descriptions-item label="归属路灯杆">
        {{lightpole.name}}
      </a-descriptions-item>
      <a-descriptions-item label="归属线路" :span="2">
        {{lightpole.parentName}}
      </a-descriptions-item>
      <a-descriptions-item label="控制器名称">
        {{config.controlName}}
      </a-descriptions-item>
      <a-descriptions-item label="通讯模组号(IMEI)" :span="2">
        {{config.imei}}
      </a-descriptions-item>
      <a-descriptions-item label="物联数据卡(ICCID)">
        {{config.iccid}}
      </a-descriptions-item>
      <a-descriptions-item label="" :span="2">
      </a-descriptions-item>
    </a-descriptions>
    <div class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
    <a-descriptions size='small' bordered>
      <a-descriptions-item v-for='(item,index) in productSpecificationsList' :key='index' :label="item.parameterName"
        :span="index%2!=0?1:2">
        {{item.parameterValue?item.parameterValue:'未知'}}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceId: '',
        productSpecificationsList: [], //产品规格详情列表
        config: {},
        lightpole:{}
      }
    },
    created() {
      this.deviceId = this.$route.query.deviceId
      this.lightpole=JSON.parse(localStorage.getItem('lamp'))
      if (this.deviceId) {
        this.getDetail()
      }
    },
    methods:{
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
      async getProductSpecifications() {
        this.paramList = []
        let param = {
          pageIndex: 1,
          pageSize: 200,
          modelId: this.config.modelId
        }
        let res = await this.$http.post(this.$api.parampage, param);
        if (res.data.resultCode == 10000) {
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
