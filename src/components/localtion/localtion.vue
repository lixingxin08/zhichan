<template>
  <div class="dialog" v-if="visible">
    <div class="dialog_t flex_b">
      <div>地理位置</div>
      <div @click="cancel()">
        <a-icon type="close" />
      </div>
    </div>
    <div class="dialog_c">
      <div class="flex_f dialog_c_t">
        <div>
          <a-input placeholder="输入位置名称" id="searinp" class="dialog_inp" v-model="city" />
        </div>
        <div class="edit_item_toast btn_blue mapbtn" @click="getLatLngLocation()">
          <a-icon type="environment"></a-icon>地图定位
        </div>
      </div>
      <div id="map-container" class="map"></div>
    </div>
    <div class="dialog_f flex_a">
      <div class="flex_f">
        <div class="ok_btn" @click="define()">确定</div>
        <div class="cancel_btn" @click="cancel()">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        inttype: false,
    };
  },
  props:{
      visible:Boolean,
      position:String,
      lnglat:Array,
      zoom:Number,
      isshow:Function  
  },
  methods: {
    define() {
      if (this.position == "") {
        return this.$message.error("请选择地图位置");
      } else {
        this.visible = false;
      }
    },
    cancel() {
      this.visible = false;
      this.position = "";
    },
    getLatLngLocation() {
      if (this.city == "") {
        return this.$message.error("请先输入位置名称");
      }
      this.inttype = false;
      let _that = this;
      let geocoder = new AMap.Geocoder();
      geocoder.getLocation(_that.city, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          console.log(result);
          const lnglat = result.geocodes[0].location;
          _that.lnglat = lnglat
          _that.position = lnglat.lng + "," + lnglat.lat;
          this.init();
        } else {
          console.log(result);
        }
      });
    },
    init() {
      let _that = this;
      console.log(this.lng, 222);
      const map = new AMap.Map("map-container", {
        zoom: 13,
        center: _that.lng,
        viewMode: "3D",
      });
      map.plugin(
        ["AMap.ToolBar", "AMap.MapType", "AMap.Geolocation"],
        function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(
            new AMap.MapType({ showTraffic: false, showRoad: false })
          );
          const geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            showButton: true, // 是否显示定位按钮
            buttonPosition: "LB", // 定位按钮的位置
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮距离对应角落的距离
            showMarker: true, // 是否显示定位点
            showCircle: false, // 是否显示定位精度圈
            circleOptions: {
              // 定位精度圈的样式
              strokeColor: "#0093FF",
              noSelect: true,
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: "#02B0FF",
              fillOpacity: 0.25,
            },
            zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
            // 设置定位超时时间，默认：无穷大
            timeout: 10000,
          });

          // 把定位插件加入地图实例
          map.addControl(geolocation);

          // 添加地图全局定位事件
          AMap.event.addListener(geolocation, "complete", _that.onComplete); //返回定位信息
          AMap.event.addListener(geolocation, "error", _that.onError); //返回定位出错信息
          console.log(geolocation, 2222);
          // 调用定位
          if (_that.inttype == true) {
            geolocation.getCurrentPosition();
          }
        }
      );
      map.on("click", function (params) {
        console.log(params, 112);
        if (_that.markertype == true) {
          map.remove(_that.marker);
        }
        _that.position = params.lnglat.lng + "," + params.lnglat.lat;
        _that.marker = new AMap.Marker({
          position: new AMap.LngLat(params.lnglat.lng, params.lnglat.lat),
          offset: new AMap.Pixel(-10, -10),
          icon: "//vdata.amap.com/icons/b18/1/2.png", // 添加 Icon 图标 URL
        });
        _that.$message.success("当前经纬度为" + _that.position);
        map.add(_that.marker);
        _that.markertype = true;
      });
    },
  },
};
</script>