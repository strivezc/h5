<template>

<div class="myOrder">

    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>

    <div class="order">
        <div class="item">
            <div class="item_head">
                <span class="name">次卡新用户限购-限购1次文字文字限购1次文字文字</span>
                <span class="status">等待付款</span>
            </div>
            <div class="item_body">
                <div class="order_txt">订单编号：123456</div>
                <div class="order_txt">下单时间：1616465656</div>
                <div class="">优惠券： $00</div>
                <div class="order_price">应付金额： <span style="color:#FF5E01">$99999</span></div>
            </div>
            <div class="btm_area">
                <div class="cancel_btn">取消</div>
                <div class="pay_btn">立即支付</div>
            </div>
        </div>
        <div class="item">
            <div class="item_head">
                <span class="name">次卡新用户限购-限购1次文字文字限购1次文字文字</span>
                <span class="status">等待付款</span>
            </div>
            <div class="item_body">
                <div class="order_txt">订单编号：123456</div>
                <div class="order_txt">下单时间：1616465656</div>
                <div class="">优惠券： $00</div>
                <div class="order_price">应付金额： <span style="color:#FF5E01">$99999</span></div>
            </div>
            <div class="btm_area">
                <div class="cancel_btn">取消</div>
                <div class="pay_btn">立即支付</div>
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
            headerType: 2,
            headerTit: '我的订单'
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
.myOrder{
    width: 100%;
    height: 100%;
    background: #F9F9F9;
    box-sizing: border-box;
    padding: 0 1rem;
}
.order{
    margin-top: 0.67rem;
}
.item{
    width: 100%;
    padding: 1.13rem 1rem 0.73rem 1rem;
    background: #FFFFFF;
    box-shadow: 0rem 0.2rem 1.07rem 0rem rgba(69, 104, 124, 0.04);
    border-radius: 0.53rem;
    margin-bottom: 0.67rem;
    box-sizing: border-box;
}
.item_head{
    display: flex;
    justify-content: space-between;
}
.name{
    width: 17.1rem;
    font-size: 1.07rem;
    color: #333;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.status{
    font-size: 0.8rem;
    color: #FF5E01;
}
.item_body{
    margin-top: 0.77rem;
    padding: 0.7rem 0;
    position: relative;
    font-size: 0.8rem;
    color: #999999;
    border-top: 0.03rem #EEEEEF solid;
}
.order_txt{
    margin-bottom: 0.33rem;
}
.order_price{
    position: absolute;
    bottom: 0.7rem;
    right: 0;
    color: #333300;
}
.btm_area{
    padding-top: 0.77rem;
    border-top: 0.03rem #EEEEEF solid;
    font-size: 0.8rem;
    text-align: right;
}
.cancel_btn{
    display: inline-block;
    width: 5.2rem;
    height: 1.87rem;
    border-radius: 0.27rem;
    border: 0.03rem solid #0087FF;
    line-height: 1.87rem;
    text-align: center;
    color: #0087FF;
}
.pay_btn{
    display: inline-block;
    width: 5.2rem;
    height: 1.87rem;
    background: #0087FF;
    border-radius: 0.27rem;
    line-height: 1.87rem;
    text-align: center;
    color: #fff;
    margin-left: 0.67rem;
}
</style>