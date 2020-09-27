export const Mixin1 = {
    data() {
        return {
        };
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
        return {
        };
    },
    methods: {
        async getdata(url,param) {
            let res = await this.$http.post(this.$api.areastree, {});
            if (res.data.resultCode == 10000) {
                return  data=res.data.data
            }else{
                this.$message.success(res.data.resultMsg);
            }
            
          },
    }
};