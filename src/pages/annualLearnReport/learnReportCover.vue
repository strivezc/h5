<template>
  <div style="height: 100%">
    <transition name="fade">
      <div class="content" v-show="show">
        <nav-bar @backAction="backAction" :defaultBack="false"></nav-bar>
<!--        <img src="../../../static/images/learnReport/2.png" class="banner" alt="">-->
        <div>
          <div class="flex-center text centerSP">
            <!--            <span class="circular" v-show="!isChecked"></span>-->
            <!--            <img class="select" src="../../../static/images/learnReport/select.png" alt="" v-show="isChecked">-->
            开启表示同意授权本报告查询并统计您在说客英语的数据
          </div>
          <img class="button centerSP" @click="pushLearnReport" src="../../../static/images/learnReport/3.png" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import navBar from "./components/NavBar";
import {goBack} from "@/utils/appMethod";
import {isWeixin} from "@/utils";
import Cookies from 'js-cookie';
import {setToken} from "@/utils/auth";
import {getReportDetail} from "@/api";
import {mapGetters} from "vuex";

export default {
  name: "LearnReportCover",
  components: {navBar},
  data() {
    return {
      isChecked: true,
      show: false,
      recommendCode: ''
    };
  },
  created() {
    this.recommendCode = this.$route.query.recommendCode;
    Cookies.set('curPage', 'userType');
    let flag = null;
    if (this.isApp === 'y') {
      flag = 'y';
    } else {
      flag = this.$route.query.isApp;
    }
    this.$store.commit('user/SET_isApp', flag);
    if (this.isApp) {
      window['getToken'] = (data) => {
        console.log(data, 'Token');
        this.$store.commit('user/SET_TOKEN', data);
        setToken(data);
      }
    }
    this.$nextTick(() => {
      this.show = true
    })
  },
  computed: {
    ...mapGetters(['isApp']),
  },
  methods: {
    async pushLearnReport() {
      if (!this.isChecked) {
        this.$toast("请勾选授权查询和统计数据!");
        return;
      }
      try {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        const {resultData} = await getReportDetail();
        this.$bus.$emit('switchAudio', true);
        let params = {};
        if (resultData.status == 0) { // 新注册
          params = {newStu: true, tagType: resultData.status, userDistributorCode: resultData.userDistributorCode}
        } else if (resultData.studyDay == 0) {  // 当年没有学习数据
          params = {noData: true, tagType: 1, userDistributorCode: resultData.userDistributorCode}
        } else {
          params = {...resultData}
        }
        Cookies.set('reportData', JSON.stringify(params))
        this.$toast.clear();
        this.$router.replace("/annualLearnReport");
      } catch (e) {
        if (e.resultCode === -1) {
          this.$toast('登录已失效,请重新登录');
          setTimeout(() => {
            this.$router.replace({
              path: '/login',
              query: {registerFrom: 'learnReport', recommendCode: this.recommendCode}
            })
            // window.location.href=process.env.H5_LOGIN
          }, 2000)
        } else {
          this.$toast(e.resultMessage);
        }
      }
    },
    backAction() {
      if (this.isApp) {
        this.$bus.$emit('switchAudio', false);
        goBack();
      } else if (isWeixin() && WeixinJSBridge) {
        WeixinJSBridge.call('closeWindow');
      } else {
        //
      }
    },
  }
}
</script>

<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .content {
    width: 100%;
    height: 100vh;
    background: url(../../../static/images/learnReport/1.png) center no-repeat;
    background-size: cover;
    text-align: center;
  }

  .text {
    width: 100%;
    bottom: 220px;
    font-size: 24px;
    font-weight: 400;
    color: #FFFEFE;
    line-height: 40px;
    padding: 15px 0;
  }

  .button {
    bottom: 125px;
    width: 100%;
  }

  .circular {
    border-radius: 50%;
    width: 13Px;
    height: 13Px;
    margin-right: 20px;
    border: 0.5Px solid #FFFFFF;
  }

  .select {
    display: inline-block;
    width: 14Px;
    height: 14Px;
    margin-right: 20px;
  }

  .flex-center {
    position: fixed;
    bottom: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .banner {
    width: 100%;
    margin-top: 150px;
  }
</style>
