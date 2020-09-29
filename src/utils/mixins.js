export const Mixin1 = {
  data() {
    return {};
  },
  methods: {
    exportExcel(istHeader, isfilterVal, list, excelname) {
      // const tHeader = ['账本名称','日账单日期', '数据行', '支付总额','支付时间','状态']
      // const filterVal = ['name','createTime', 'userCount', 'payMoneyTotal', 'payTime','status']
      // let list=[{name:1,createTime:11,userCount:2,payMoneyTotal:3,payTime:4,status:5}]
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../vendor/Export2Excel');
        const tHeader = istHeader
        const filterVal = isfilterVal
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, excelname);
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  }
};

export const Mixin2 = {
  data() {
    return {};
  },
  methods: {
    async getdata(url, param) {
      let res = await this.$http.post(this.$api.areastree, {});
      if (res.data.resultCode == 10000) {
        return data = res.data.data
      } else {
        this.$message.success(res.data.resultMsg);
      }

    },
  }
};

export const lightstree = {
  data() {
    return {
      showTree: false, //展示树
      treedata: [],
      isselectdata: "", //选中的左边树item
      parentData: {}, //选中父级菜单
      defaultExpandedKeys: [], //默认展开
      defaultSelectedKeys: [], //默认选中
    };
  },
  methods: {
    //树接口
    async gettree() {
      this.treedata = this.$utils.getlightTreeData()
      if (!this.treedata) {
        let res = await this.$http.post(this.$api.devicemonitorboxtree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
        }
      } else {
        this.defaultExpandedKeys = this.$utils.getLightExpangKey()
        this.setSelectKey()
        this.showTree = true
      }
    },

    /* 设置tree 数据*/
    setdata(data) {
      this.defaultExpandedKeys = this.$utils.getTreeExpandedKeys(data)
      this.$utils.setLightExpandKey(this.defaultExpandedKeys)
      this.treedata = this.$utils.toTree(data);
      this.setSelectKey()
      this.showTree = true
    },
    /* 设置选中item*/
    setSelectKey() {
      if (this.$utils.getLightSelectKey()) {
        this.getselectdata(this.$utils.getLightSelectKey());
        this.defaultSelectedKeys.push(this.$utils.getLightSelectKey().id);
      } else {
        this.getselectdata(this.treedata[0])
        this.defaultSelectedKeys.push(this.treedata[0].id);
      }
    },
    /* 点击Item事件*/
    getselectdata(val) {
      if (!val)
        return
      this.$utils.setLightSelectKey(val)
      this.isselectdata = val;
      this.tableData = []
      if (this.isselectdata.nodeType == 'GLP')
        this.getTableData()
    },
    parentdata(val) {
      console.log(val)
     this.$utils.setLineSelectKey(val)
      this.parentData = val
    },
    onLoadData(treeNode) {
      return new Promise(async resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        if (treeNode.dataRef.nodeType != 'ECB' && treeNode.dataRef.nodeType != 'LINE') {
          resolve();
          return
        }
        let param = {
          deviceId: treeNode.dataRef.id
        }
        let res = await this.$http.post(this.$api.devicelightpoletree, param)
        if (res.data.resultCode == 10000) {
          let childTree = this.$utils.toTree(res.data.data)
          if (childTree[0] != null) {
            if (childTree[0].pid == treeNode.dataRef.id)
              treeNode.dataRef.children = childTree
          }
        }
        this.treedata = [...this.treedata];
        this.$utils.setlightTreeData(this.treedata)
        resolve();
      });
    },
  }
};
