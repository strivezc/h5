<template>

<div class="personal">
    <div class="head">
        <openApp></openApp>
        <div class="info_area">
            <img class="bg" src="../../../static/images/student/bg.png"/>
            <div class="info_box">
                <img src="../../../static/images/student/avatar.png" class="avatar" @click.stop="toOther('personalData')"/>
                <span class="user_name">Leo Knight</span>
            </div>
            <img src="../../../static/images/student/set.png" class="set" @click.stop="toOther('set')"/>
            <div class="tab_area">
                <div class="tab_box">
                    <div class="tab">
                        <div class="tab_txt1">0</div>
                        <div class="tab_txt2">已约课程</div>
                    </div>
                    <div class="line"></div>
                    <div class="tab">
                        <div class="tab_txt1">0</div>
                        <div class="tab_txt2">学习记录</div>
                    </div>
                    <div class="line"></div>
                    <div class="tab" @click.stop="toOther('myTeacher')">
                        <div class="tab_txt1">0</div>
                        <div class="tab_txt2">我的老师</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="share_area">
            <div class="share_tit">分享有礼</div>
            <div class="tab_area2">
                <div class="tab_box">
                    <div class="tab">
                        <img src="../../../static/images/student/share_gift.png" class="tab_logo"/>
                        <div class="tab_txt3">邀请有礼</div>
                    </div>
                    <div class="line"></div>
                    <div class="tab">
                        <img src="../../../static/images/student/share_record.png" class="tab_logo"/>
                        <div class="tab_txt3">邀请记录</div>
                    </div>
                    <div class="line"></div>
                    <div class="tab">
                        <img src="../../../static/images/student/shopping.png" class="tab_logo"/>
                        <div class="tab_txt3">积分商城</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="share_area">
        <div class="share_tit">学习服务</div>
        <div class="tab_area2">
            <div class="tab_box">
                <div class="tab">
                    <img src="../../../static/images/student/vip.png" class="tab_logo"/>
                    <div class="tab_txt3">VIP课表</div>
                </div>
                <div class="line"></div>
                <div class="tab" @click.stop="toOther('myOrder')">
                    <img src="../../../static/images/student/order.png" class="tab_logo"/>
                    <div class="tab_txt3">我的订单</div>
                </div>
                <div class="line"></div>
                <div class="tab" @click.stop="toOther('myCombo')">
                    <img src="../../../static/images/student/combo.png" class="tab_logo"/>
                    <div class="tab_txt3">我的套餐</div>
                </div>
            </div>
        </div>
        <div class="tab_area2 tab_area3">
            <div class="tab_box">
                <div class="tab">
                    <img src="../../../static/images/student/teacher.png" class="tab_logo"/>
                    <div class="tab_txt3">教师信息</div>
                </div>
                <div class="line"></div>
                <div class="tab" @click.stop="toOther('exchange')">
                    <img src="../../../static/images/student/exchange.png" class="tab_logo"/>
                    <div class="tab_txt3">兑换课时</div>
                </div>
                <div class="line"></div>
                <div class="tab2">

                </div>
            </div>
        </div>
    </div>
    <div class="share_area share_area2">
        <div class="share_tit">咨询</div>
        <div class="tab_area2">
            <div class="tab_box">
                <div class="tab" @click.stop="toOther('callCenter')">
                    <img src="../../../static/images/student/kf.png" class="tab_logo"/>
                    <div class="tab_txt3">客服中心</div>
                </div>
                <div class="line"></div>
                <div class="tab">
                    <img src="../../../static/images/student/kf_vip.png" class="tab_logo"/>
                    <div class="tab_txt3">专属客服</div>
                </div>
                <div class="line"></div>
                <div class="tab">
                    <img src="../../../static/images/student/cart.png" class="tab_logo"/>
                    <div class="tab_txt3">购买套餐</div>
                </div>
            </div>
        </div>
    </div>

    <navigation :pagenum='3'></navigation>

</div>

</template>

<script>

import navigation from './components/navigation'
import openApp from '@/components/OpenApp'
import {getWxinShareInfo} from "@/api/user";
import {wxShare} from "@/utils/wxShare";

export default {

    data(){
        return{

        }
    },

    mounted(){
      let params = {
        title : '拼团特惠期仅1元 | 拼团标题测20字以内拼团标题测20字以内',
        desc : '原价299元，拼团特惠期仅1元，优惠价格不容错过，赶紧来和我一起参团吧！',
        link : `https://test.talk915.com/h5/participatoryGroup?spellGroupId=&headUserId=&spellGroupSenderId=&invitedUserId=`,
        imgUrl : `${process.env.API_ROOT}/h5/static/images/common/shareIcon.png`,
      }
      wxShare(params)
    },

    methods:{

        toOther(name){
            switch(name){
                case 'set':
                    this.$router.push({path:'/student/set'});
                    break;
                case 'myTeacher':
                    this.$router.push({path:'/student/myTeacher'});
                    break;
                case 'personalData':
                    this.$router.push({path:'/student/personalData'});
                    break;
                case 'myOrder':
                    this.$router.push({path:'/student/myOrder'});
                    break;
                case 'myCombo':
                    this.$router.push({path:'/student/myCombo'});
                    break;
                case 'exchange':
                    this.$router.push({path:'/student/exchange'});
                    break;
                case 'callCenter':
                    this.$router.push({path:'/student/callCenter'});
                    break;
            }
        }

    },

    components:{
        navigation,
        openApp
    }

}

</script>

<style scoped>
.personal{
    width: 100%;
    height: 100%;
    background: #F9F9F9;
    padding-bottom: 3rem;
}
.head{
    background: #ffffff;
    position: relative;
}
.bg{
    width: 100%;
    position: relative;
}
.info_area{
    position: relative;
}
.info_box{
    position: absolute;
    left: 1.7rem;
    top: 4.23rem;
    height: 4rem;
    line-height: 4rem;
    color: #F9F9F9;
    font-size: 1.2rem;
}
.avatar{
    width: 4rem;
    margin-right: 1rem;
}
.set{
    position: absolute;
    width: 1.37rem;
    top: 1.6rem;
    right: 1.6rem;
}
.tab_area{
    position: relative;
    width: 22.87rem;
    height: 5.53rem;
    background: #FFFFFF;
    box-shadow: 0rem 0rem 0.67rem 0rem rgba(217, 217, 217, 0.5);
    border-radius: 0.53rem;
    margin: 0 auto;
    margin-top: -1.44rem;
    z-index: 1;
    padding: 1.1rem 1.87rem;
    box-sizing: border-box;
}
.tab_box{
    display: flex;
    justify-content: space-between;
}
.tab{
    text-align: center;
}
.tab_txt1{
    color: #333;
    font-size: 1.33rem;
}
.tab_txt2{
    color: #999999;
    font-size: 0.8rem;
    margin-top: 0.57rem;
}
.share_area{
    margin-top: 0.67rem;
    padding: 1.03rem 1.07rem 1.43rem 1.07rem;
    background: #fff;
}
.share_tit{
    font-size: 1.07rem;
    color: #666666;
    font-weight: 500;
    margin-bottom: 1.3rem;
}
.tab_area2{
    padding: 0 1.8rem;
}
.tab_logo{
    width: 1.6rem;
}
.tab_txt3{
    color: #666666;
    font-size: 0.93rem;
    margin-top: 0.57rem;
}
.tab2{
    width: 4.0rem;
}
.tab_area3{
    margin-top: 2rem;
}
.share_area2{
    margin-top: 0;
}
.line{
    width: 0.03rem;
    height: 3.37rem;
    background: #E1E1E1;
}
</style>
