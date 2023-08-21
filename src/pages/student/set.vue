<template>

<div class="set">
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    <div class="set_area">
        <div class="tabs">
            <div class="tab">
                <div class="tab_tit centerCZ">修改手机号</div>
                <div class="phone centerCZ">18986543580</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
            </div>
            <div class="tab">
                <div class="tab_tit centerCZ">修改密码</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
            </div>
        </div>
        <div style="height:0.67rem;background:#F2F6FC"></div>
        <div class="tabs">
            <div class="tab">
                <div class="tab_tit centerCZ">用户协议</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
            </div>
            <div class="tab">
                <div class="tab_tit centerCZ">隐私条款</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
            </div>
        </div>
        <div class="centerSP logout_btn">退出登录</div>
    </div>
</div>
  
</template>

<script>

import Sheader from './components/s-header'

export default {

    data(){
        return{
            headerType: 1,
            headerTit: '设置'
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
.set_area{
    margin-top: 3.2rem;
}
.tab{
    height: 4rem;
    position: relative;
    font-size: 1.07rem;
}
.tab_tit{
    left: 1.07rem;
    color: #333333;
}
.phone{
    right: 3.07rem;
    color: #888888;
}
.icon_right{
    width: 0.53rem;
    right: 1.4rem;
}
.line{
    width: 100%;
    height: 1px;
    background: #C7C7CC;
    position: absolute;
    left: 1.07rem;
    bottom: 0;
}
.logout_btn{
    width: 22.33rem;
    height: 2.93rem;
    line-height: 2.93rem;
    border-radius: 0.53rem;
    border: 0.03rem solid #FF5E01;
    position: fixed;
    bottom: 2.23rem;
    text-align: center;
    color: #FF5E01;
    font-size: 1.07rem;
}
</style>