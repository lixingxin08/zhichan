<template>
  <div class="content2">
    <div class="flexrow des-title">路灯杆信息</div>
    <a-descriptions size='small' bordered>
      <a-descriptions-item label="控制器品牌">
        Cloud Database
      </a-descriptions-item>
      <a-descriptions-item label="控制器型号" :span="2">
        Prepaid
      </a-descriptions-item>
      <a-descriptions-item label="控制器名称">
        YES
      </a-descriptions-item>
      <a-descriptions-item label="控制器编号"  :span="2">
        2018-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="控制器状态" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆名称"  :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="线路名称" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="通讯模组号(IMEI)"  :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="物联数据卡(ICCID)" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label=""  :span="2">
        
      </a-descriptions-item>
    </a-descriptions>
    <div class="flexrow des-title" style="margin-top: 30px;">产品规格</div>
    <a-descriptions size='small' bordered>
      <a-descriptions-item label="运行内存(RAM)">
        Cloud Database
      </a-descriptions-item>
      <a-descriptions-item label="内存大小" :span="2">
        Prepaid
      </a-descriptions-item>
      <a-descriptions-item label="3G/4G频段(选配)">
        YES
      </a-descriptions-item>


    </a-descriptions>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        config: {}
      }
    },
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
