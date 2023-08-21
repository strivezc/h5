<template>

<div class="exchangeRecord">
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    <div class="record_area">
        <div class="item">
            <div class="item_head">
                <span class="sign centerCZ"></span>
                <span class="num centerCZ">兑换码：1234567890123456</span>
                <span class="status centerCZ">兑换成功</span>
            </div>
            <div class="item_body">
                <div class="name">100课时（12个月有效）</div>
                <div class="time">2020-12-20 12:24:60</div>
            </div>
        </div>
        <div class="item">
            <div class="item_head">
                <span class="sign centerCZ"></span>
                <span class="num centerCZ">兑换码：1234567890123456</span>
                <span class="status centerCZ">兑换成功</span>
            </div>
            <div class="item_body">
                <div class="name">100课时（12个月有效）</div>
                <div class="time">2020-12-20 12:24:60</div>
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
            headerTit: '兑换记录'
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
.exchangeRecord{
    width: 100%;
    height: 100%;
    background: #F9F9F9;
}
.record_area{
    padding: 0.7rem 1.07rem;
}
.item{
    background: #FFFFFF;
    border-radius: 0.53rem;
    font-size: 0.8rem;
    margin-bottom: 0.67rem;
}
.item_head{
    height: 2.3rem;
    position: relative;
    border-bottom: 0.03rem solid #E4E4E4;
}
.sign{
    width: 0.2rem;
    height: 0.57rem;
    background: #0087FF;
    border-radius: 0.1rem;
    left: 1rem;
}
.num{
    color: #333;
    left: 1.53rem;
}
.status{
    color: #55D339;
    right: 1rem;
}
.item_body{
    padding: 1rem;
}
.name{
    color: #333;
    font-size: 1.07rem;
    font-weight: 500;
    margin-bottom: 0.67rem;
}
.time{
    color: #999999;
}
</style>