<template>
  <div id="bg">
    <div id="cbox">
      <div class="login">
        <div class="title">智慧路灯杆</div>
        <div class="login_t flex_f">
          <div class="login_h" :class="logintyoe==1?'login_hg':''" @click="change(1)">用户名称</div>
          <div class="login_h" :class="logintyoe==2?'login_hg':''" @click="change(2)">手机号码</div>
          <div class="login_h" :class="logintyoe==3?'login_hg':''" @click="change(3)">电子邮箱</div>
        </div>
        <div class="login_item" v-if="logintyoe==1">
          <input
            type="text"
            placeholder="请输入用户名称"
            v-model="form.name"
            @keyup="verifyUsername(form.name)"
          />
          <div class="tips" v-if="tiptype==1">{{tip}}</div>
        </div>
        <div class="login_item" v-if="logintyoe==2">
          <input type="text" placeholder="请输入手机号码" v-model="form.name" @keyup="IsPhone(form.name)" />
          <div class="tips" v-if="tiptype==2">{{tip}}</div>
        </div>
        <div class="login_item" v-if="logintyoe==3">
          <input type="text" placeholder="请输入电子邮箱" v-model="form.name" @keyup="verEmail(form.name)" />
          <div class="tips" v-if="tiptype==3">{{tip}}</div>
        </div>
        <div class="login_item">
          <input type="password" placeholder="请输入密码" v-model="form.psw" @keyup="verpsw(form.psw)" />
          <div class="tips" v-if="tiptype==4">{{tip}}</div>
        </div>
        <div class="login_item">
          <input type="text" placeholder="请输入验证码" maxlength="6" v-model="form.code" />
          <verify @isCode="getcode"></verify>
          <div class="tips" v-if="tiptype==5">{{tip}}</div>
        </div>
        <div class="login_item submit" @click="login()">登录</div>
      </div>
    </div>
  </div>
</template>
<script>
import verify from "../../components/verify/verify";
import isSearch from "../../components/search/search";
export default {
  name: "login",
  components: {
    verify,
  },
  data() {
    return {
      logintyoe: 1,
      tip: "",
      tiptype: 0,
      flag: 0,
      form: {
        name: "",
        psw: "",
        code: "",
      },
    };
  },
  created() {
    console.log(this.$md5("hello"));
  },
  methods: {
    getcode(val) {
      console.log(val, 77777);
    },
    change(type) {
      this.logintyoe = type;
      this.form.name = "";
      this.form.psw = "";
      this.form.code = "";
    },
    //登录
    login() {
      //  var wsObj = new WebSocket("ws://192.168.1.32:8888/websocket");   //建立连接

      // wsObj.onopen = function () {  //发送请求
      //   wsObj.send("Hello WebSocket");
      // };
      // wsObj.onmessage = function (ev) {  //获取后端响应
      // console.log(ev,11);
      // }
      //  this.$router.push({ name: "home" });
      //  return
      // if (this.flag == 1) {
      //   return;
      // }
      // if (this.form.name == "" || this.form.psw == "" || this.form.code == "") {
      //   this.$message.error("登录信息不能留空", 2);
      //   return;
      // }
      // this.flag = 1;
      this.$http.get('/api/login/getValidateCode').then((res) => {
        console.log(res);
        if (res.status == 200) {
        } else {
        }
      });

      console.log(this.tiptype !== 0);
      if (this.tiptype !== 0) {
        this.$message.error("请输入正确的登录信息", 2);
        return;
      }
    },
    //验证密码
    verpsw(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      if (str.length < 6 || str.length > 32) {
        this.tiptype = 4;
        this.tip = "密码长度为【6-32个字符】";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //验证用户名
    verifyUsername(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let re = /^[a-z_][a-z0-9]{5,31}$/;
      if (re.test(str) !== true) {
        this.tiptype = 1;
        this.tip =
          "以字母或英文下划线开头由字母、数字和英文下划线组成【6-32个字符】";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //校验手机号
    IsPhone(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let myreg = /^1[3456789]\d{9}$/;
      if (myreg.test(str) !== true) {
        this.tiptype = 2;
        this.tip = "请输入正确的手机号码";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
    //验证邮箱
    verEmail(str) {
      if (str == "") {
        this.tiptype = 0;
        this.tip = "";
        return;
      }
      let re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (re.test(str) !== true) {
        this.tiptype = 3;
        this.tip = "请输入正确的电子邮箱";
      } else {
        this.tiptype = 0;
        this.tip = "";
      }
    },
  },
};
</script>


<style scope>
@import url("./login.css");
</style>