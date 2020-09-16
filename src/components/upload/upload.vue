<template>
  <div class="upload">
    <a-upload
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      @change="importExcel"
    >
      <div class="isupload">导入</div>
    </a-upload>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      xlsxJson: "",
      wb: "",
    };
  },
  methods: {
    importExcel(file) {
      const types = file.file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        (item) => item === types
      );
      if (!fileType) {
        this.$message("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file.file).then((tabJson) => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson;
          this.$emit("exceldata", this.xlsxJson);
          console.log("数据", this.xlsxJson);
        }
      });
    },
    file2Xce(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary",
          });
          const result = [];
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.originFileObj);
      });
    },
  },
};
</script>
<style>
.upload {
  width: 66px;
  height: 36px;
  position: relative;
  overflow: hidden;
}
.isupload {
  width: 66px;
  height: 36px;
  background-color: #1890ff;
  color: #fff;
  overflow: hidden;
  text-align: center;
  line-height: 36px;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
}
.avatar-uploader {
  z-index: 999;
}
</style>