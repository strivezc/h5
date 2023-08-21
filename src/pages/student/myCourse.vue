<template>

<div class="myCourse">
    
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    
    <div class="to_buy">已取消</div>

</div>

</template>

<script>

import Sheader from './components/s-header'

export default {

    data(){
        return{
            headerType: 2,
            headerTit: '我的课程'
        }
    },

    mounted(){

    },

    methods:{

    },

    components:{
        Sheader
    }

}

</script>

<style scoped>
.myCourse{
    width: 100%;
    height: 100%;
    background: #F9F9F9;
}
.to_buy{
    font-size: 0.93rem;
    color: #999999;
    position: fixed;
    top: 0.8rem;
    right: 1.07rem;
}
</style>