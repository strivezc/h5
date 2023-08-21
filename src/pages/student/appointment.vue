<template>

<div class="appointment">

    <div class="a_tit">请选择约课类型</div>

    <div class="tips">
        <div class="tips_txt1">成人上课时间：06:00-22:55</div>
        <div class="tips_txt2">如果您是学生，请选择学生约课</div>
        <img src="../../../static/images/student/allow.png" class="allow centerCZ">
    </div>

    <div class="tab_area">
        <div class="tab">
            <div class="tab_txt">自由预约</div>
            <img src="../../../static/images/student/a_1.png" class="tab_img"/>
        </div>
        <div class="tab">
            <div class="tab_txt">VIP预约</div>
            <img src="../../../static/images/student/a_2.png" class="tab_img"/>
        </div>
        <div class="tab">
            <div class="tab_txt">口语课测评</div>
            <img src="../../../static/images/student/a_3.png" class="tab_img"/>
        </div>
        <div class="tab">
            <div class="tab_txt">公开课预约</div>
            <img src="../../../static/images/student/a_4.png" class="tab_img"/>
        </div>
    </div>

    <navigation :pagenum='2'></navigation>

</div>

</template>

<script>

import navigation from './components/navigation'
import openApp from '@/components/OpenApp'

export default {

    data(){
        return{

        }
    },

    mounted(){

    },

    methods:{

    },

    components:{
        navigation,
        openApp
    }

}

</script>

<style scoped>
.appointment{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 3.6rem 1.33rem 3.27rem 1.33rem;
}
.a_tit{
    font-size: 1.47rem;
    color: #333;
    font-weight: 500;
}
.tips{
    width: 100%;
    height: 4rem;
    position: relative;
    background: #FFF8EC;
    border-radius: 0.53rem;
    margin: 1.33rem 0 1rem 0;
}
.tips_txt1{
    position: absolute;
    top: 0.6rem;
    left: 1rem;
    font-size: 1.07rem;
    color: #FF9723;
}
.tips_txt2{
    position: absolute;
    bottom: 0.43rem;
    left: 1rem;
    font-size: 0.8rem;
    color: #FF9723;
}
.allow{
    width: 0.46rem;
    right: 0.93rem;
}
.tab_area{

}
.tab{
    display: inline-block;
    width: 10.27rem;
    height: 10rem;
    border-radius: 0.67rem;
    border: 0.07rem solid #E9E9E9;
    margin-right: 1.1rem;
    text-align: center;
    margin-bottom: 1.33rem;
}
.tab_area .tab:nth-child(2n){
    margin-right: 0
}
.tab_img{
    width: 6.67rem;
}
.tab_txt{
    font-size: 1.2rem;
    color: #333;
    margin-top: 1rem;
}
</style>
