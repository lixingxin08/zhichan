<template>
  <a-layout-header
    style="background: #fff; padding: 0;text-align:left;height:60px;line-height:60px"
  >
  <div class="flexrow flexac flexsb">
    <a-breadcrumb class="bread">
      <a-breadcrumb-item v-for="(item,index) in title" :key="index">
        <span :class="index==title.length-1?'color1':'color2'">{{item}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>

	<a-breadcrumb class="bread">
	  <a-breadcrumb-item>
	    <div class="flex_f" v-if="!addtype">
	      <div class="head_r"></div>
	      <div class="head_r" @click="backhome()">返回首页</div>
	      <div class="head_r head_r_last">
	        <img src="../../assets/nav_img/icon_z_jichu.png" alt class="head_r_img" />
	        {{user.realName}}
	      </div>
	    </div>
	    <div  v-else>
	      <a-button type='primary' style="margin-right: 20px;font-size: 12px;" @click="backlast()">返回</a-button >
	    </div>
	  </a-breadcrumb-item>
	</a-breadcrumb>
  </div>
  </a-layout-header>
</template>
<script>
export default {
  name:"isheader",
  data() {
    return {
      iscollapsed: false,
      title: [],
	  user: "",
	  addtype: false,
    };
  },
  methods: {
	  backlast() {
	    this.$router.go(-1);
	  },
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
    this.gettitle()
  },
  watch: {
    $route: function (val,oldval) {
      console.log(val,oldval,112);
      if (val.path.search("/add")>=0 ||val.path.search("/see")>=0) {
        this.addtype = true;
      }else{
         this.addtype = false;
      }
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
.head_r {
  margin-right: 20px;
  cursor: pointer;
}
.head_r_img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  border-radius: 50%;
  margin-right: 10px;
}
.head_r_last {
  margin-right: 40px;
}
.head_btn{
  margin-right: 80px;
  margin-top: 19px;
}
</style>
