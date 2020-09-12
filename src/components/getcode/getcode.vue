<template>
<div>
  <div @click="getcode()" class="iscode">{{codetips}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 5,
      codetips: "获取验证码",
      timer: null,
    };
  },
  methods: {
    getcode() {
      let _that = this;
      _that.timer = setInterval(function () {
        _that.time--;
        _that.codetips = _that.time;
        if (_that.time <= 0) {
          _that.time = 60;
          _that.codetips = '重新获取验证码'
          clearInterval(_that.timer);
          _that.timer = null;
        }
      }, 1000);
    },
  },
};
</script>