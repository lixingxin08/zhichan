<template>
  <div class="content2">
    <div class="flexrow des-title">环境要素信息</div>
    <a-descriptions size='small' bordered>
      <a-descriptions-item label="环境要素型号">
           {{config.modelName}}
      </a-descriptions-item>
      <a-descriptions-item label="环境要素名称":span="2">
           {{config.deviceName}}
      </a-descriptions-item>
      <a-descriptions-item label="环境要素编号"  >
       {{config.deviceCode}}
      </a-descriptions-item>
      <a-descriptions-item label="环境要素状态" :span="2">
        {{config.statusCode==0?'备用':(config.statusCode==1?'启用':'已报废')}}
      </a-descriptions-item>
      <a-descriptions-item label="归属灯杆"  >
 {{lightConfig.name}}
      </a-descriptions-item>
      <a-descriptions-item label="归属线路" :span="2">
      {{lineConfig.name}}
      </a-descriptions-item>
    </a-descriptions>
    <div v-if='productSpecificationsList.length>0' class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
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
	    let res = await this.$http.post(this.$api.deviceenvironmentaldetail, param)
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
	      if (res.data.data)
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
