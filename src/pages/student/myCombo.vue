<template>

<div class="myCombo">
    
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    
    <div class="to_buy">购买套餐</div>

    <div class="combo_area">
        <div class="tabs">
            <div class="tab">
                <span class="tab_txt">已激活套餐</span>
                <span class="heng centerSP"></span>
            </div>
            <div class="tab">
                <span class="tab_txt">已激活套餐</span>
                <span class="heng centerSP"></span>
            </div>
        </div>
        <div class="combo_box">
            <div class="item">
                <img src="../../../static/images/student/card_1.png" class="item_img centerCZ"/>
                <div class="item_name">月卡套餐包</div>
                <div class="item_size">20课时</div>
                <div class="item_time">有效期：2022-08-04</div>
                <div class="item_btn centerCZ">当前默认</div>
            </div>
            <div class="item">
                <img src="../../../static/images/student/card_2.png" class="item_img centerCZ"/>
                <div class="item_name">月卡套餐包</div>
                <div class="item_size">20课时</div>
                <div class="item_time">有效期：2022-08-04</div>
                <div class="item_btn centerCZ">当前默认</div>
            </div>
            <div class="item">
                <img src="../../../static/images/student/card_3.png" class="item_img centerCZ"/>
                <div class="item_name">月卡套餐包</div>
                <div class="item_size">20课时</div>
                <div class="item_time">有效期：2022-08-04</div>
                <div class="item_btn">当前默认</div>
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
            headerTit: '我的套餐'
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
.tab{
    display: inline-block;
    margin-right: 3.43rem;
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
    height: 6.93rem;
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
    font-size: 1.07rem;
    color: #333;
    font-weight: 500;
    top: 0.8rem;
    left: 6.27rem;
}
.item_size{
    font-size: 0.93rem;
    color: #666;
    position: absolute;
    left: 6.27rem;
    top: 3rem;
}
.item_time{
    font-size: 0.93rem;
    color: #999;
    position: absolute;
    left: 6.27rem;
    bottom: 0.8rem;
}
.item_btn{
    width: 4.37rem;
    height: 1.47rem;
    background: #0084FF;
    border-radius: 0.73rem;
    border: 0.03rem solid #CCCCCC;
    line-height: 1.47rem;
    text-align: center;
    font-size: 0.73rem;
    color: #FFFFFF;
    right: 1.33rem;
}
</style>