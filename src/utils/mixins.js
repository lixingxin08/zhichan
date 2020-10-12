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
      defaultSelectedKeys: [], //默认选中
    };
  },
  methods: {
    //树接口
    async gettree() {
   
      if (!this.$config.treeData|| this.$config.treeData <= 0) {
        let res = await this.$http.post(this.$api.devicemonitorboxtree, {});
        if (res.data.resultCode == 10000) {
          this.setdata(res.data.data);
        }
      } else {
        this.setdata(null)
      }
    },

    /* 设置tree 数据*/
    setdata(data) {
      if (this.$utils.getLineSelectKey())
        this.parentData = this.$utils.getLineSelectKey()
      this.treedata = data ? this.$utils.toTree(data) : this.$config.treeData;
      this.$config.treeData = this.treedata
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
          if (res.data.data && res.data.data.length > 0) {
            let expandKeys = JSON.parse(localStorage.getItem('treeExpandedKeys'))
            res.data.data.forEach((item) => {
              if (item.nodeType == 'GLP') {
                expandKeys.push(item.id)
              }
            })
            localStorage.setItem('treeExpandedKeys', JSON.stringify(expandKeys))
          }
          let childTree = this.$utils.toTree(res.data.data)
          if (childTree[0] != null) {
            if (childTree[0].pid == treeNode.dataRef.id)
              treeNode.dataRef.children = childTree
          }
        }
        this.treedata = [...this.treedata];
         this.$config.treeData = this.treedata
        if (this.$refs.tree) {
          this.$refs.tree.updateExpandKeys()
        }
        resolve();
      });
    },
  }
};
