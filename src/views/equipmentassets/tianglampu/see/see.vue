<template>
  <div class="content2">
    <div class="flexrow des-title">路灯杆信息</div>
    <a-descriptions size='small' bordered>
      <a-descriptions-item label="路灯杆品牌">
        Cloud Database
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆型号" :span="2">
        Prepaid
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆名称">
        YES
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆编号"  :span="2">
        2018-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="路灯杆状态" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="用途类型"  :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="监控箱名称" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="归属线路"  :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="归属项目" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="项目阶段"  :span="2">
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="地图位置" >
        2019-04-24 18:00:00
      </a-descriptions-item>
      <a-descriptions-item label="位置地址"  :span="2">
        2019-04-24 18:00:00
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
