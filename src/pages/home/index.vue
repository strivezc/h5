<template>
  <div class="index">
    <div class="head">
      <img src="../../../static/images/home/logo.png" class="logo centerCZ"/>
      <div class="btn_area centerCZ">
        <div class="reg_btn" @click="toCenter" v-if="token">个人中心</div>
        <template v-else>
          <div class="login_btn" @click="login">登录</div>
          <div class="reg_btn" @click="register">注册</div>
        </template>
      </div>
    </div>
    <div class="index_body">
      <div class="banner">
        <img src="../../../static/images/groupBuying/banner.png" class="banner_img"/>
        <img src="../../../static/images/invite/invite.jpg" class="banner_img"/>
      </div>
    </div>
    <div class="index_footer">
      <img class="tit_img" src="../../../static/images/home/10.png"/>
    </div>
    <div class="kf_area" @click="toCustomer">
      <img
          src="../../../static/images/student/kf_logo.png"
          class="kf_logo centerSPCZ"
      />
    </div>
    <div class="app_area">
      <img
          src="../../../static/images/home/logo_app.png"
          class="app_logo centerCZ"
      />
      <div class="app_btn centerCZ" @click="download">下载APP</div>
    </div>
  </div>
</template>

<script setup>
  import {getToken, getUserType, getTeacherInfo} from '@/utils/auth'
  import {computed} from 'vue'
  import {useStore, useRouter} from "@/utils/vueApi.js";

  const router = useRouter();
  const store = useStore();

  const token = getToken();
  const userType = getUserType();
  const teacherInfo = getTeacherInfo();
  const phone = computed(() => {
    return store.getters.phone
  });
  const name = computed(() => {
    return store.getters.name
  });
  const userId = computed(() => {
    return store.getters.userId
  });

  const login = () => {
    router.push('/login');
  }

  const register = () => {
    router.push({path: '/login', query: {pageType: 'RegisterLogin', isNormal: '1'}})
  }

  const toCenter = () => {
    if (userType == 3 || userType == 5 || userType == 9) {
      window.location.href = process.env.AGENT_LINK;
    } else if (userType == 0 || userType == 99) {
      window.location.href = process.env.ADMIN_LINK;
    } else if (userType == 1) {
      let teaLoginInfoRespDTO;
      if (teacherInfo) {
        teaLoginInfoRespDTO = JSON.parse(teacherInfo);
      }
      if (teaLoginInfoRespDTO.accountStatus === 2) {
        if (teaLoginInfoRespDTO.firstSign === 1) {
          //资料审核通过的老师非一次登录
          window.location.href = process.env.TEACHER_LINK;
        } else if (teaLoginInfoRespDTO.firstSign === 0) {
          window.location.href = process.env.TEACHER_CONTRACT;
        }
      } else if (
        teaLoginInfoRespDTO.accountStatus === 0 ||
        teaLoginInfoRespDTO.accountStatus === 1
      ) {
        window.location.href = process.env.TEACHER_MODIFY_LINK;
      }
    } else if (userType == 8) {
      window.location.href = process.env.TEACHER_AGT_LINK;
    } else {
      window.location.href = process.env.STUDENT_LINK; // 学生端学习大厅
    }
  }

  const download = () => {
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.chindle.talk915&fromcase=40003'
  }

  const toCustomer = () => {
    if (getToken()) {
      window.location.href = `${process.env.IM_LINK}?platformType=0&platformUserId=${userId.value}&platformUserType=7&platformPhone=${phone.value}&platformNickName=${name.value}&platformTerminalType=1`;
    } else {
      window.location.href = `${process.env.IM_LINK}?platformType=0&platformUserId=&platformUserType=7&platformPhone=&platformNickName=&platformTerminalType=1`
    }
  }
</script>

<style scoped>
  .index {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .head {
    position: relative;
    height: 4rem;
    background: #0589ff;
  }

  .logo {
    width: 196px;
    left: 62px;
  }

  .btn_area {
    right: 1.33rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .login_btn {
    display: inline-block;
    box-sizing: border-box;
    width: 4.4rem;
    height: 1.87rem;
    border-radius: 0.93rem;
    border: 0.03rem solid #ffffff;
    line-height: 1.87rem;
    text-align: center;
    color: #fff;
  }

  .reg_btn {
    display: inline-block;
    width: 4.4rem;
    height: 1.87rem;
    background: #ffffff;
    border-radius: 0.93rem;
    border: 0.03rem solid #ffffff;
    line-height: 1.87rem;
    text-align: center;
    color: #0087ff;
    margin-left: 0.8rem;
  }

  .index_body {
    font-size: 0;
  }

  .banner_img {
    width: 100%;
  }

  .tit_img {
    width: 100%;
  }

  .introduce_img {
    width: 100%;
  }

  .why_area {
    padding-top: 1.1rem;
    background: #e6f5ff;
    padding-bottom: 3.3rem;
  }

  .why_box {
    width: 100%;
    border-radius: 0.53rem;
    overflow: hidden;
  }

  .swiper1 {
    width: 100%;
  }

  .sw_img {
    width: 100%;
  }

  .slide {
    width: 17.33rem;
  }

  .why_txt {
    background: #fff;
    height: 3.73rem;
    line-height: 3.73rem;
    font-size: 0.93rem;
    color: #222325;
    padding-left: 0.93rem;
  }

  /* .swiper-slide{
      width: 80%!important;
      margin: 0 10%;
  }
  .swiper-slide-prev{
      right:-15%;
  }
  .swiper-slide-next{
      left:-15%;
  } */
  .swiper-slide {
    width: 70%;
    padding: 0 1rem !important;
  }

  .system_img {
    height: 34.1rem;
  }

  .scroll_area {
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
  }

  .diy_img {
    height: 18.8rem;
  }

  .honor_box {
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    white-space: nowrap;
    margin-top: 0.8rem;
  }

  .medal {
    display: inline-block;
  }

  .medal {
    text-align: center;
    color: #222325;
    font-size: 0.8rem;
    margin: 0 2rem;
  }

  .medal_img {
    width: 11.33rem;
  }

  .medal_txt {
    margin-top: 0.8rem;
    line-height: 1.2rem;
  }

  .index_footer {
    margin-top: 3.33rem;
    margin-bottom: 3.333rem;
  }

  .kf_area {
    position: fixed;
    z-index: 999;
    width: 3.2rem;
    height: 3.2rem;
    background: #ffffff;
    box-shadow: 0rem 0.27rem 0.73rem 0rem rgba(39, 72, 100, 0.3);
    right: 0.67rem;
    bottom: 5.56rem;
    border-radius: 50%;
  }

  .kf_logo {
    width: 1.6rem;
  }

  .app_area {
    width: 100%;
    position: fixed;
    z-index: 999;
    height: 3.33rem;
    background: rgba(255, 255, 255, 0.9);
    bottom: 0;
    left: 0;
  }

  .app_logo {
    width: 160px;
    left: 36px;
  }

  .app_btn {
    width: 5.33rem;
    height: 2rem;
    background: #0087ff;
    border-radius: 1rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.8rem;
    color: #fff;
    font-weight: 600;
    right: 1.33rem;
  }
</style>
