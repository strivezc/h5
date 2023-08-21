<template>

<div class="myCombo">
    
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    
    <div class="to_buy">购买帮助</div>

    <div class="combo_area">
        <div class="tabs">
            <div class="tab">
                <span class="tab_txt">次卡套餐</span>
                <span class="heng centerSP"></span>
            </div>
            <div class="tab">
                <span class="tab_txt">周卡套餐</span>
                <span class="heng centerSP"></span>
            </div>
            <div class="tab">
                <span class="tab_txt">月卡套餐</span>
                <span class="heng centerSP"></span>
            </div>
        </div>
        <div class="combo_box">
            <div class="tips">次卡：自由学习时间，使用更灵活</div>
            <div class="item">
                <img src="../../../static/images/student/card_1.png" class="item_img centerCZ"/>
                <div class="item_name">40课时次卡（90天有效）</div>
                <div class="item_size">原价：5000元</div>
                <div class="item_time">现价：3850.0元</div>
                <div class="item_btn">立即购买</div>
            </div>
            <div class="item">
                <img src="../../../static/images/student/card_2.png" class="item_img centerCZ"/>
                <div class="item_name">40课时次卡（90天有效）</div>
                <div class="item_size">原价：5000元</div>
                <div class="item_time">现价：3850.0元</div>
                <div class="item_btn">立即购买</div>
            </div>
            <div class="item">
                <img src="../../../static/images/student/card_3.png" class="item_img centerCZ"/>
                <div class="item_name">40课时次卡（90天有效）</div>
                <div class="item_size">原价：5000元</div>
                <div class="item_time">现价：3850.0元</div>
                <div class="item_btn">立即购买</div>
            </div>
        </div>
    </div>

</div>

</template>

<script>

import Sheader from './components/s-header'

export default {

    data(){
        return{
            headerType: 1,
            headerTit: '套餐商城'
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
.myCombo{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0 1.07rem;
    box-sizing: border-box;
}
.to_buy{
    font-size: 0.93rem;
    color: #0087FF;
    position: fixed;
    top: 1.2rem;
    right: 1.33rem;
}
.tabs{
    display: flex;
    justify-content: space-between;
}
.tab{
    display: inline-block;
    height: 3.33rem;
    line-height: 3.33rem;
    position: relative;
    font-size: 1.07rem;
    color: #303133;
}
.heng{
    bottom: 0;
    display: inline-block;
    width: 2.13rem;
    height: 0.27rem;
    background: #0087FF;
    border-radius: 0.13rem;
}
.combo_box{
    margin-top: 1.47rem;
}
.item{
    width: 100%;
    height: 8rem;
    background: #FFFFFF;
    box-shadow: 0rem 0.17rem 0.67rem 0rem rgba(219, 219, 219, 0.5);
    border-radius: 0.53rem;
    margin-bottom: 0.83rem;
    position: relative;
}
.item_img{
    width: 4.67rem;
    height: 5.33rem;
    border-radius: 0.53rem;
    left: 0.8rem;
}
.item_name{
    position: absolute;
    font-size: 1.2rem;
    color: #333;
    font-weight: 500;
    top: 1.33rem;
    left: 6.53rem;
}
.item_size{
    font-size: 0.8rem;
    color: #cccccc;
    position: absolute;
    left: 6.53rem;
    top: 4.23rem;
    text-decoration: line-through;
}
.item_time{
    font-size: 1.07rem;
    color: #FF5E01;
    position: absolute;
    left: 6.53rem;
    bottom: 1.33rem;
    font-weight: 500;
}
.item_btn{
    width: 6.67rem;
    height: 2rem;  
    background: #FF5E01;
    border-radius: 1.23rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1.07rem;
    color: #FFFFFF;
    right: 1.33rem;
    position: absolute;
    bottom: 1.33rem;
    right: 0.8rem;
}
.tips{
    font-size: 0.8rem;
    color: #999;
    margin: 0.8rem 0 0.67rem 0;
}
</style>