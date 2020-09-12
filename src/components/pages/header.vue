<template>
  <a-layout-header
    style="background: #fff; padding: 0;text-align:left;height:60px;line-height:60px"
    class="flex_b"
  >
    <a-breadcrumb class="bread">
      <a-breadcrumb-item v-for="(item,index) in title" :key="index">
        <span :class="index==title.length-1?'color1':'color2'">{{item}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-breadcrumb class="bread">
      <a-breadcrumb-item>
         <div class="flex_f">
           <div class="head_r"></div>
           <div class="head_r">返回首页</div>
           <div class="head_r head_r_last"><img src="../../assets/nav_img/user.png" alt="" class="head_r_img">{{user.realName}}</div>
         </div>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </a-layout-header>
</template>
<script>
export default {
  name:"isheader",
  data() {
    return {
      iscollapsed: false,
      title: [],
      user:""
    };
  },
  methods: {
    changecollapsed() {
      this.iscollapsed = !this.iscollapsed;
      this.$emit("tocollapsed", this.iscollapsed);
    },
    gettitle(){
       this.$route.matched.forEach((item) => {
        this.title.push(item.meta.title);
      });
    }
  },
  created() {
    this.user=JSON.parse(localStorage.getItem('usermsg'))
    this.gettitle()
  },
  watch: {
    $route: function (val) {
      let list = new Array();
      val.matched.forEach((item) => {
        list.push(item.meta.title);
      });
      this.title = list;
    },
  },
};
</script>
<style  scoped>
.bread {
  padding-left: 24px;
  height: 60px;
  line-height: 60px;
}
.tittle {
  margin-left: 0.24rem;
}
.color1 {
  color: #333;
}
.color2 {
  color: #999;
}
.head_r{
  margin-right: 20px;
  cursor: pointer;
}
.head_r_img{
  width: 32px;
  height: 32px;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 10px;
}
.head_r_last{
  margin-right: 40px;
}
</style>