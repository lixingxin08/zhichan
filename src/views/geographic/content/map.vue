<template>
  <div class="ismap">
    <div id="map-container" class="map"></div>
    <a-table
      :columns="columns"
      :data-source="data"
      class="maplist"
      bordered
      :customHeaderRow="headstyle"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
  </div>
</template>

<script>
import AMap from "AMap";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default {
  name: "map.vue",
  data() {
    return {
      data,
      columns: [
        {
          title: "警报时间",
          dataIndex: "name",
          key: "name",
          className: "table_list",
          scopedSlots: { customRender: "name111" },
          customHeaderCell: this.headstyle,
          width: 120,
        },
        {
          title: "设备名称",
          dataIndex: "age",
          key: "age",
          className: "table_list",
          width: 88,
          customHeaderCell: this.headstyle,
        },
        {
          title: "所属区域",
          dataIndex: "address",
          key: "address 1",
          ellipsis: true,
          className: "table_list",
          customHeaderCell: this.headstyle,
          width: 88,
        },
        {
          title: "警报类型",
          dataIndex: "address",
          key: "address 2",
          ellipsis: true,
          className: "table_list",
          width: 88,
          customHeaderCell: this.headstyle,
        },
        {
          title: "警报内容",
          dataIndex: "address",
          key: "address 3",
          ellipsis: true,
          className: "table_list",
          width: 88,
          customHeaderCell: this.headstyle,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const map = new AMap.Map("map-container", {
        zoom: 11,
        center: [116.397428, 39.90923],
        viewMode: "3D",
      });
      map.plugin(["AMap.ToolBar", "AMap.MapType"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(
          new AMap.MapType({ showTraffic: false, showRoad: false },hide())
        );
      });
    },
    headstyle(record, rowIndex) {
      return {
        style: {
          color: "#fff",
          background: "#1890FF!important",
          "font-size": "16px",
          "text-align": "center",
          "light-height": "100%",
          "padding-left": "0",
          "padding-right": "0",
          "padding-top": "8px",
          "padding-bottom": "7px",
        },
      };
    },
  },
};
</script>

<style scoped>
.ismap {
  width: 1392px;
  height: 8.6rem;
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