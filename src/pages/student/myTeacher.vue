<template>

<div class="myTeacher">
    
    <Sheader :headerType='headerType' :headerTit='headerTit'></Sheader>

    <div class="tabs">
        <van-dropdown-menu class="test">
            <van-dropdown-item v-model="value1"  :options="option1" />
            <van-dropdown-item v-model="value2"  :options="option2" />
            <van-dropdown-item v-model="value3"  :options="option3" />
        </van-dropdown-menu>
    </div>

    <div class="teachers">
        <div class="t_item">
            <img src="../../../static/images/student/avatar.png" class="t_avatar"/>
            <div class="t_name">Erikia S</div>
            <div class="tags">
                <div class="tag">欧美</div>
                <div class="tag">2课时/节</div>
            </div>
            <div class="t_sign">签名：Erikia S老师是一个帅气且幽默的老师，有3年的在线教学经验，获有TESOL证书，为人</div>
            <div class="t_btn">取消收藏</div>
            <div class="line"></div>
        </div>
        <div class="t_item">
            <img src="../../../static/images/student/avatar.png" class="t_avatar"/>
            <div class="t_name">层Erikia S</div>
            <div class="tags">
                <div class="tag">欧美</div>
                <div class="tag">2课时/节</div>
            </div>
            <div class="t_sign">签名：Erikia S老师是一个帅气且幽默的老师，有3年的在线教学经验，获有TESOL证书，为人</div>
            <div class="t_btn">取消收藏</div>
            <div class="line"></div>
        </div>
        <div class="t_item">
            <img src="../../../static/images/student/avatar.png" class="t_avatar"/>
            <div class="t_name">层Erikia S</div>
            <div class="tags">
                <div class="tag">欧美</div>
                <div class="tag">2课时/节</div>
            </div>
            <div class="t_sign">签名：Erikia S老师是一个帅气且幽默的老师，有3年的在线教学经验，获有TESOL证书，为人</div>
            <div class="t_btn">取消收藏</div>
            <div class="line"></div>
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
            headerTit: '我的老师',
            value1: 0,
            value2: 'a',
            value3: 'ab',
            option1: [
                { text: '老师地域', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 },
            ],
            option2: [
                { text: '授课课程', value: 'a' },
                { text: '好评排序', value: 'b' },
                { text: '销量排序', value: 'c' },
            ],
            option3: [
                { text: '授课类型', value: 'ab' },
                { text: '好评排序', value: 'bb' },
                { text: '销量排序', value: 'cb' },
            ],
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
.teachers{

}
.t_item{
    position: relative;
    height: 8.8rem;
}
.t_avatar{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    position: absolute;
    left: 1.07rem;
    top: 1.33rem;
}
.t_name{
    position: absolute;
    top: 1.33rem;
    left: 6.43rem;
    font-size: 1.07rem;
    color: #333;
    font-weight: 500;
}
.tags{
    position: absolute;
    top: 3.2rem;
    left: 6.43rem;
    font-size: 0.73rem;
    color: #666;
}
.tag{
    display: inline-block;
    padding: 0.3rem 0.53rem;
    margin-right: 0.53rem;
    border-radius: 0.27rem;
    border: 0.03rem solid #D4D4D4;
}
.t_sign{
    font-size: 0.8rem;
    color: #999;
    width: 17rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    position: absolute;
    left: 6.43rem;
    bottom: 1.37rem;
}
.t_btn{
    position: absolute;
    top: 1.4rem;
    right: 1.77rem;
    width: 5.3rem;
    height: 1.6rem;
    border-radius: 0.8rem;
    border: 0.03rem solid #E4E4E4;  
    line-height: 1.6rem;
    text-align: center;
    font-size: 0.8rem;
    color: #8D949B;
}
.line{
    width: 100%;
    height: 0.03rem;
    background: #EEEEEF;
    position: absolute;
    bottom: 0;
    left: 1.6rem;
}
</style>