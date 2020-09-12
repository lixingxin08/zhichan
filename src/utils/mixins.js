export const mixins={
    data(){
        return{

        }
    },
    created() {
        
    },
    methods: {
        exportExcel(list,tHeaderlist,filterVallist,excelName) {
                    require.ensure([], () => {
                  const {
                      export_json_to_excel
                  } = require('../vendor/Export2Excel');
                  const tHeader =tHeaderlist;
                  const filterVal =filterVallist;
                  const data = this.formatJson(filterVal, list);
                  export_json_to_excel(tHeader, data, excelName);
              })
          },
        
    },

}