<template>
  <div class="dialogadminadd" v-show="visible">
    <div class="dialogadminadd_t flex_b">
      <div>地理位置</div>
      <div @click="cancel()">
        <a-icon type="close" />
      </div>
    </div>
    <div class="dialogadminadd_c">
      <div class="flex_f dialogadminadd_c_t">
        <div>
          <a-input
            placeholder="输入位置名称"
            id="searinp"
            class="dialogadminadd_inp"
            @keydown.enter="getLatLngLocation()"
            v-model="city"
          />
        </div>
        <div
          class="edit_item_toast btn_blue mapbtn"
          @click="getLatLngLocation()"
        >
          <a-icon type="environment"></a-icon>
          <span class="positiontext">地图定位</span>
        </div>
      </div>
      <div id="map-container" class="map"></div>
    </div>
    <div class="dialogadminadd_f flex_a">
      <div class="flex_f">
        <div class="confirm_btn" @click="confirm()">确定</div>
        <div class="cancel_btn" @click="cancel()">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import AMap from "AMap";
export default {
  data() {
    return {
      isimg: require("../../assets/icon_tc_dw.png"),
      lng: [116.397428, 39.90923],
      position: "",
      city: "",
      map: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  props: {
    visible: Boolean,
  },
  methods: {
    init() {
      let _that = this;
      console.log(_that.lng, 222);
      this.map = new AMap.Map("map-container", {
        zoom: 13,
        viewMode: "2D",
        resizeEnable: true,
      });
      _that.map.plugin(["AMap.ToolBar", "AMap.Geolocation", 'AMap.Geocoder'], function () {
        _that.map.addControl(new AMap.ToolBar());
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
        _that.map.addControl(geolocation);
      });
      
      _that.map.on("click", function (params) {
        console.log(params, 112);
        if (_that.markertype == true) {
          _that.map.remove(_that.marker);
        }
        _that.position = params.lnglat.lng + "," + params.lnglat.lat;
        _that.marker = new AMap.Marker({
          position: new AMap.LngLat(params.lnglat.lng, params.lnglat.lat),
          offset: new AMap.Pixel(-63, -54),
          icon: _that.isimg, // 添加 Icon 图标 URL
          size: new AMap.Size(80, 54),
          imageSize: new AMap.Size(46, 54),
        });
        _that.$message.success("当前定位为" + _that.position);

        _that.map.add(_that.marker);
        _that.markertype = true;
        let lnglat=[params.lnglat.lng,params.lnglat.lat]
       _that.getaddress(lnglat)
      });
    },
    confirm() {
      if (this.position == "") {
        return this.$message.error("请选择地图位置");
      } else {
        this.visible = false;
        this.$emit("positon", this.position);
        this.$emit("isvisible", this.visible);
      }
    },
    getaddress: function(lnglat) {
				AMap.plugin('AMap.Geocoder', function() {
					var geocoder = new AMap.Geocoder({
						// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
						city: '010'
					})
					geocoder.getAddress(lnglat, function(status, result) {
       
						if (status === 'complete' && result.info === 'OK') {
							// self.formattedAddress=result.regeocode.formattedAddress
              // result为对应的地理位置详细信息
              this.$emit("address",result.regeocode.formattedAddress);     
						}
					})
				})
			},





    getLatLngLocation() {
      let _that = this;
      if (this.city == "") {
        return this.$message.error("请先输入位置名称");
      }
      var autoOptions = {
        input: "searinp",
      };
      _that.map.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], function () {
        var auto = new AMap.AutoComplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          map: _that.map,
        }); //构造地点查询类
        auto.on("select", select); //注册监听，当选中某条记录时会触发
        function select(e) {
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name); //关键字查询查询
        }
      });
    },
    cancel() {
      this.position = "";
      this.visible = false;
      this.$emit("isvisible", this.visible);
      this.$emit("positon", this.position);
    },
    onComplete(e) {
      console.log(e, "onComplete ");
    },
    onError(e) {
      console.log(e, "onError ");
    },
  },
};
</script>
<style >
.dialogadminadd {
  width: 920px;
  height: 810px;
  position: relative;
  left: 0;

  border-radius: 8px;
  box-shadow: 0px 0px 20px 0px #ccc;
  background-color: #fff;
  z-index: 2;
}
.dialogadminadd_t {
  width: 920px;
  height: 72px;
  background-color: #1890ff;
  color: #fff;
  font-size: 24px;
  padding: 0 40px;
}
.dialogadminadd_c {
  width: 920px;
  height: 554px;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  font-weight: 400;
  text-align: center;
  color: #333333;
  z-index: 3;
  padding: 0 40px;
}
.dialogadminadd_c_t {
  height: 32px;
  margin-top: 30px;
  margin-bottom: 20px;
}
.dialogadminadd_inp {
  width: 724px;
  height: 36px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}
.map {
  width: 840px;
  height: 472px;
}
.dialogadminadd_f {
  margin-top: 40px;
}
.mapbtn {
  width: 100px;
  height: 36px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  background-color: #1890ff;
  margin-left: 16px;
  vertical-align: middle;
  border-radius: 8px;
  font-size: 14px;
}
.positiontext {
  margin-left: 1px;
  cursor: pointer;
}
</style>