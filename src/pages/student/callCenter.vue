<template>
  
<div class="callCenter">
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    <img class="banner" src="../../../static/images/student/kf_banner.png"/>
    <div class="btn_area">
        <div class="btn_box">
            <img src="../../../static/images/student/kf_logo.png" class="btn_logo"/>
            <span class="btn_txt">在线客服</span>
        </div>
        <div class="btn_box">
            <img src="../../../static/images/student/phone.png" class="btn_logo"/>
            <span class="btn_txt">专属客服</span>
        </div>
    </div>
    <div class="problem_area">
        <div class="item">
            <div class="p_tit">常见问题</div>
            <div class="line"></div>
        </div>
        <div class="item">
            <div class="p_txt">如何查看课程顾问联系方式</div>
            <div class="line"></div>
            <img src="../../../static/images/common/icon_right.png" class="icon_right">
        </div>
        <div class="item">
            <div class="p_txt">如何查看课程顾问联系方式</div>
            <div class="line"></div>
            <img src="../../../static/images/common/icon_right.png" class="icon_right">
        </div>
        <div class="item">
            <div class="p_txt">如何查看课程顾问联系方式</div>
            <div class="line"></div>
            <img src="../../../static/images/common/icon_right.png" class="icon_right">
        </div>
        <div class="item">
            <div class="p_txt">如何查看课程顾问联系方式</div>
            <div class="line"></div>
            <img src="../../../static/images/common/icon_right.png" class="icon_right">
        </div>
    </div>
</div>

</template>

<script>

import Sheader from './components/s-header'

export default {

    data(){
        return{
            headerType: 2,
            headerTit: '客服中心'
        }
    },

    components:{
       Sheader 
    }

}

</script>

<style scoped>
.banner{
    width: 100%;
}
.btn_area{
    padding: 1.33rem 1rem;
    display: flex;
    justify-content: space-between;
}
.btn_box{
    width: 10.67rem;
    height: 3.33rem;
    line-height: 3.33rem;
    background: #F4F5F7;
    border-radius: 0.53rem;
    text-align: center;
}
.btn_logo{
    width: 1.33rem;
    margin-right: 0.63rem;
}
.btn_txt{
    font-size: 1.07rem;
    color: #333333;
    font-weight: 500;
}
.problem_area{
    margin-top: 1rem;
}
.item{
    height: 3.33rem;
    padding: 0 1.2rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.icon_right{
    width: 0.46rem;
}
.line{
    width: 100%;
    position: absolute;
    left: 1.2rem;
    height: 0.03rem;
    background: #EEEEEF;
    bottom:0;
}
.p_tit{
    font-size: 1.2rem;
    color: #333333;
    font-weight: 500;
}
</style>