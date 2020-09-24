<template>
  <div class="ismap">
    <div id="map-container" class="map"></div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "map.vue",
  data() {
    return {
      isimg: require("../../../assets/icon_tc_dw.png"),
      lng: [116.397428,39.90923],
      islat: 116.397428,
      islng: 39.90923,
      position: "",
    };
  },
  mounted() {
    let _that=this
    if (navigator.geolocation) {
      var n = navigator.geolocation.getCurrentPosition(function (res) {
        console.log(res, 2222); // 需要的坐标地址就在res中
        // _that.lng[0]=res.coords.longitude
        // _that.lng[1]=res.coords.latitude
      });
    } else {
      alert("该浏览器不支持定位");
    }
    this.init();
  },
  methods: {
    init() {
      let _that = this;
      console.log(this.lng,77777);
      const map = new AMap.Map("map-container", {
        zoom: 13,
        center:_that.lng,
        viewMode: "2D",
      });
      map.plugin(["AMap.ToolBar", "AMap.Geolocation"], function () {
        map.addControl(new AMap.ToolBar());
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: false, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        //海量点
          _that.islat += _that.islat
          _that.islng += _that.islng 
          let ismarker = new AMap.Marker({
            position: new AMap.LngLat(_that.islat, _that.islng),
            offset: new AMap.Pixel(-46, -54),
            icon: _that.isimg, // 添加 Icon 图标 URL
          });
          map.add(ismarker);


        //监听zoom
        map.on("zoomchange", () => {
          var iszoom = map.getZoom();
          console.log(iszoom);
        });
      });
    },
    onComplete(success) {
      console.log(success,'onError');
    },
    onError(error) {
      console.log(error);
    },
  },
};
</script>

<style scoped>
.ismap {
  width: 1392px;
  height: 560px;
  position: relative;
}
.map {
  width: 1392px;
  height: 100%;
}
.maplist {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 470px;
  height: 346px;
  border-radius: 8px;
  z-index: 2;
  background-color: #fff;
  overflow: hidden;
}
</style>