<template>

<div class="personalData">
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>
    <div class="set_area">
        <div class="tabs">
            <div class="tab">
                <div class="tab_tit centerCZ">头像</div>
                <img class="avatar centerCZ" src="../../../static/images/student/avatar.png"/>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
            </div>
        </div>
        <div style="height:1.07rem;background:#ffffff"></div>
        <div style="height:0.67rem;background:#F2F6FC"></div>
        <div class="tabs">
            <div class="tab">
                <div class="tab_tit centerCZ">英文名</div>
                <div class="content centerCZ">Mike</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
            </div>
            <div class="tab">
                <div class="tab_tit centerCZ">性别</div>
                <div class="content centerCZ">男</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
            </div>
            <div class="tab">
                <div class="tab_tit centerCZ">生日</div>
                <div class="content centerCZ">2000-02-12</div>
                <img src="../../../static/images/common/icon_right.png" class="icon_right centerCZ"/>
                <div class="line"></div>
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
            headerTit: '个人资料'
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
    margin-top: 2.03rem;
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
.content{
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
.avatar{
    width: 4rem;
    height: 4rem;
    box-sizing: border-box;
    right: 3.07rem;
    border-radius: 50%;
    border: 1px solid #979797
}
</style>