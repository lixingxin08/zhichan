<template>
    <div>
        map11111111111111111111111
        <a-icon type="ie" />
        <a-icon type="right" />
        <a-icon type="check-circle" />
        
        <div @click="test()">gskdfjsakk</div>
         <is-localtion :visible='visible' :position='position' :lnglat='lnglat' :zoom='zoom' :city='city'></is-localtion>
    </div>
</template>
<script>
import isLocaltion from '../../components/localtion/localtion'
export default {
    components:{
        isLocaltion
    },
    data() {
        return {
            visible:false,
            position:"",
            lnglat:[],
            zoom:13,
            city:'深圳'
        }
    },
    methods:{
        test(){
            this.$message.error('sjdfkskj')
        }
    },
    created() {
    
    },
}
</script>