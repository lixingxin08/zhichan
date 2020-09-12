<template>
  <a-select
    show-search
   
    placeholder="inputsearch"
    style="width: 200px"
     :value="value"
    :default-active-first-option="false"
    :show-arrow="false"
    :allowClear="false"
    :filter-option="true"
    :not-found-content="null"
    @search="handleSearch"
    @change="handleChange"
    @inputKeydown.enter="search()" 
    @inputKeydown="getlocal()"
  >
    <a-icon slot="suffixIcon" type="step-backward" />
    <a-select-option v-for="item in hisorydata" :key="item">{{ item }}</a-select-option>
  </a-select>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      timeout: null,
      currentValue: null,
      value:null,
      hisorydata: [],
    };
  },
  props:{
    getdata:Function,
    localSearchData:String //localstorage名称
  },
  methods: {
    handleSearch(value) {
      this.value = value;
      
    },
    handleChange(value) {
      this.value = value;
      this.getdata(value)
    },
    search() {
      let _that = this;
       this.getdata(_that.value)
      this.hisorydata.push(_that.value);
      this.hisorydata = [...new Set(_that.hisorydata)];
      localStorage.setItem(this.localSearchData,JSON.stringify(this.hisorydata))
    },
    getlocal(){
       this.hisorydata=JSON.parse(localStorage.getItem(this.localSearchData))||[]
    }
  },
  watch:{
    value(val){
      if (val=='') {
        this.hisorydata=[]
      }
    }
  }
  
};
</script>
