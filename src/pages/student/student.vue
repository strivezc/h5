<template>

<div class="student">

    <openApp></openApp>

    <div class="stu_body">
        <div class="swipe_area">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img src="../../../static/images/student/banner.png" class="banner_img"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../../static/images/student/banner.png" class="banner_img"/>
                </van-swipe-item>
                <van-swipe-item>
                    <img src="../../../static/images/student/banner.png" class="banner_img"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="tab_area">
            <div class="tab">
                <img src="../../../static/images/student/tab_1.png" class="tab_img"/>
                <div class="tab_txt">去约课</div>
            </div>
            <div class="tab">
                <img src="../../../static/images/student/tab_2.png" class="tab_img"/>
                <div class="tab_txt">去上课</div>
            </div>
            <div class="tab">
                <img src="../../../static/images/student/tab_3.png" class="tab_img"/>
                <div class="tab_txt">智能测评</div>
            </div>
            <div class="tab">
                <img src="../../../static/images/student/tab_4.png" class="tab_img"/>
                <div class="tab_txt">客服中心</div>
            </div>
        </div>
        <div class="course_area">
            <div class="_tit">即将开始课程</div>
            <div class="c_box">
                <div class="box_head">
                    <img src="../../../static/images/student/time.png" class="time_logo">
                    <span class="time">2020-08-20 星期日 17:00</span>
                </div>
                <div class="c_info">
                    <img src="../../../static/images/student/book.png" class="book"/>
                    <span class="c_txt1">Magic Growth 新版</span>
                    <span class="c_txt2">Pre Starter-Unit9 Lesson4 My family</span>
                    <img class="t_avatar" src="../../../static/images/student/avatar.png"/>
                    <span class="t_name">Dora Tate</span>
                </div>
            </div>
        </div>
        <div class="_area">
            <div class="_tit">了解说客英语</div>
            <div class="heng">
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_1.png" class="learn_img"/>
                    <div class="learn_txt">国民品牌</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_2.png" class="learn_img"/>
                    <div class="learn_txt">自研教材</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_3.png" class="learn_img"/>
                    <div class="learn_txt">固定老师</div>
                </div>
            </div>
        </div>
        <div class="_area">
            <div class="_tit">优秀外教</div>
            <div class="heng">
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_1.png" class="learn_img"/>
                    <div class="learn_txt">Herc</div>
                    <div class="learn_txt2">8年教学经验 CELTA资格证</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_2.png" class="learn_img"/>
                    <div class="learn_txt">Jamie Lee</div>
                    <div class="learn_txt2">3年教学经验 TEFL资格证</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_3.png" class="learn_img"/>
                    <div class="learn_txt">Bougin</div>
                    <div class="learn_txt2">3年教学经验 TEFL资格证</div>
                </div>
            </div>
        </div>
        <div class="_area">
            <div class="_tit">优秀学员</div>
            <div class="heng">
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_1.png" class="learn_img"/>
                    <div class="learn_txt">Aiden</div>
                    <div class="learn_txt2">钢琴王子</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_2.png" class="learn_img"/>
                    <div class="learn_txt">Angela</div>
                    <div class="learn_txt2">你知道什么是B吗～</div>
                </div>
                <div class="learn_box">
                    <img src="../../../static/images/student/learn_3.png" class="learn_img"/>
                    <div class="learn_txt">层Cherry</div>
                    <div class="learn_txt2">十足主播范</div>
                </div>
            </div>
        </div>
        <van-divider class="bb">
            <img src="../../../static/images/student/bottom_logo.png" class="bottom_logo"/>
        </van-divider>
    </div>

    <navigation :pagenum='1'></navigation>

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
.student{
    width: 100%;
    height: 100%;
    background: #fff;
}
.stu_body{
    padding: 1.27rem 1.07rem 3.27rem 1.07rem;
}
.my-swipe{
    height: 10.11rem;
}
.banner_img{
    width: 22.87rem;
    height: 10.11rem;
    border-radius: 0.5rem;
}
.tab_area{
    margin-top: 1.63rem;
    display: flex;
    justify-content: space-between;
}
.tab{
    width: 3.2rem;
    text-align: center;
}
.tab_txt{
    font-size: 0.8rem;
    color: #033300;
    margin-top: 0.4rem;
}
.tab_img{
    width: 3.2rem;
}
.course_area{
    margin-top: 1.63rem;
}
._tit{
    font-size: 1.2rem;
    color: #333333;
    font-weight: 500;
    margin-bottom: 1rem;
}
.c_box{
    width: 100%;
    height: 9.4rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0.67rem 0rem rgba(209, 209, 209, 0.5);
    border-radius: 0.53rem;
    position: relative;
    box-sizing: border-box;
    padding: 0rem 1.33rem 0 1.33rem;
}
.box_head{
    height: 3.07rem;
    line-height: 3.07rem;
    border-bottom: 0.03rem solid #DEDEDE;
}
.c_info{
    position: relative;
}
.book{
    position: absolute;
    width: 4.4rem;
    left: 0;
    top: 0.77rem;
}
.c_txt1{
    position: absolute;
    left: 5.03rem;
    top: 0.67rem;
    color: #333;
    font-size: 0.93rem;
    font-weight: 500;
}
.c_txt2{
    position: absolute;
    left: 5.03rem;
    top: 1.97rem;
    color: #666;
    font-size: 0.8rem;
}
.t_avatar{
    position: absolute;
    width: 2rem;
    left: 5.03rem;
    top: 3.43rem;
    border-radius: 50%;
}
.t_name{
    position: absolute;
    left: 7.53rem;
    top: 3.9rem;
    color: #666;
    font-size: 0.8rem;
}
._area{
    margin-top: 2rem;
}
.heng{
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    white-space: nowrap;
}
.learn_box{
    display: inline-block;
    width: 10rem;
    margin-right: 0.7rem;
}
.learn_img{
    width: 10rem;
    height: 6rem;
}
.learn_txt{
    margin-top: 0.53rem;
    font-size: 1.07rem;
    color: #333;
}
.learn_txt2{
    margin-top: 0.57rem;
    font-size: 0.8rem;
    color: #999;
}
.bb{
    margin-top: 2.27rem;
    margin-bottom: 3.37rem;
}
.bottom_logo{
    width: 5rem;
}
.time_logo{
    width: 0.93rem;
}
</style>
