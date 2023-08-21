<template>

<div class="exchange">
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    <div class="to_record">兑换记录</div> 
    <div class="_box">  
        <div class="input_area">
            <div class="input_box">
                <input class="_input centerCZ" placeholder="请输入兑换码"/>
            </div>
            <div class="input_box">
                <input class="_input centerCZ" placeholder="请输入图片验证码"/>
            </div>
        </div> 
        <div class="exc_btn">兑换</div>
    </div>
</div>

</template>

<script>

import Sheader from './components/s-header'

export default {

    data(){
        return{
            headerType: 1,
            headerTit: '兑换课时'
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
.exchange{
    position: relative;
}
.to_record{
    position: absolute;
    top: 4.23rem;
    right: 1.23rem;
    font-size: 0.93rem;
    color: #666;
}
._box{
    margin-top: 1.23rem;
    padding: 0 1.6rem;
}
.input_box{
    height: 3.07rem;
    position: relative;
    font-size: 1.2rem;
    border-bottom: 0.03rem solid #D8D8D8;
    margin-bottom: 0.67rem;
}
.exc_btn{
    margin-top: 1.33rem;
    width: 100%;
    height: 3.2rem;
    line-height: 3.2rem;
    background: #99cfff;
    border-radius: 1.6rem;
    text-align: center;
    font-size: 1.07rem;
    color: #fff;
    font-weight: 500;
}
</style>