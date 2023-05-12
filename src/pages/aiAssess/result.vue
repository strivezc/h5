<template>
  <div class="result">
    <nav-bar title="注册结果" @backAction="backAction" :defaultBack="false"></nav-bar>
    <div class="box">
      <img
          src="../../../static/images/result/success.png"
          class="result-icon"
          alt=""
      />
    </div>
    <p class="text">注册成功</p>
    <p class="title">课前准备</p>
    <ul class="timeline">
      <li class="timeline-item">
        <span class="timeline-item__tail"></span>
        <span class="timeline-item__node">1</span>
        <div class="timeline-item__wrapper">
          <span class="title">下载“AI英语测评”APP</span>
          <div class="content">
            <div class="icon-box">
              <div class="icon">
                <img src="@/assets/img/aiAssess/icon1.png" alt=""/>
                <span>AI智能测评</span>
              </div>
              <div class="icon">
                <img src="@/assets/img/aiAssess/icon2.png" alt=""/>
                <span>随时随地</span>
              </div>
              <div class="icon">
                <img src="@/assets/img/aiAssess/icon3.png" alt=""/>
                <span>活动福利</span>
              </div>
            </div>
            <div class="button" @click="openApp" v-if="!inApp">下载/打开APP</div>
          </div>
        </div>
      </li>
      <li class="timeline-item">
        <span class="timeline-item__node">2</span>
        <div class="timeline-item__wrapper">
          <span class="title">填写测评信息即可</span>
          <div class="content">
            <div class="content-text">
              <p class="content-text-title">完善信息测评更准确</p>
              <p class="gray-text">在开始测评前，请根据要求如实填写测评信息，系统将根据该内容来调整测评的难度。</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="mask" v-show="showMask" @click="showMask = false">
      <img src="../../../static/images/result/row.png" class="icon" alt=""/>
      <div class="mask-text">
        <p>请点击右上角...</p>
        <p>点击使用浏览器打开</p>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {isWeixin, isAndroid, isIOS} from "@/utils";
import Cookies from "js-cookie";
import {goBack} from "@/utils/appMethod";

export default {
  name: "aiAssessRegisterResult",
  components: {
    navBar,
  },
  data() {
    return {
      showMask: false,
      inApp: Cookies.get('inApp') === 'y'
    };
  },
  created() {
    console.log(Cookies.get('inApp'), ' Cookies.get(\'inApp\')');
  },
  methods: {
    backAction() {
      if (this.inApp) {
        goBack();
      } else {
        this.$router.go(-1);
      }
    },
    openApp() {
      // if (isWeixin() && isAndroid()) {
      //   this.showMask = true;
      // } else {
      //   if (isAndroid()) {
      //     window.location.href = 'shuoke://www.abc.com'
      //   } else {
      //     //
      //   }
      //   setTimeout(() => {
      //     window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.chindle.talk915&fromcase=40003'
      //   }, 3000);
      // }
    },
  },
};
</script>

<style scoped lang="less">
  .result {
    margin-top: 3rem;

    /*.box {*/
    /*  position: relative;*/
    /*  margin: auto;*/
    /*  margin-top: 4.6rem;*/
    /*  width: 6rem;*/
    /*  height: 6rem;*/
    /*  background: linear-gradient(94deg, #78e361 0%, #1fd161 100%);*/
    /*  background: rgba(84, 211, 58, 0.2);*/
    /*  border-radius: 50%;*/
    /*  .result-icon {*/
    /*    position: absolute;*/
    /*    top: 50%;*/
    /*    left: 50%;*/
    /*    transform: translate(-50%, -50%);*/
    /*    width: 4.633rem;*/
    /*    height: 4.633rem;*/
    /*    z-index: 1;*/
    /*  }*/
    /*}*/

    .box {
      margin-top: 4.6rem;
      text-align: center;

      .result-icon {
        width: 4.633rem;
        height: 4.633rem;
      }
    }

    .box-fail {
      margin-top: 4.6rem;
      text-align: center;

      .result-icon {
        width: 140px;
        height: 140px;
      }
    }

    .text {
      font-size: 1.333rem;
      text-align: center;
      font-weight: 500;
      color: #333333;
      line-height: 1.867rem;
      margin-top: 0.833rem;
      padding-bottom: 45px;
      margin-left:32px;
      margin-right:32px;
      border-bottom: 1px solid #EEEEEF;
    }

    .text-fail {
      width: 300px;
      height: 88px;
      background: #FE575B;
      border-radius: 44px;
      text-align: center;
      margin: auto;
      margin-top: 1.2rem;
      font-size: 32px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 88px;
    }

    .title {
      margin-left: 1.067rem;
      margin-top: 50px;
      font-size: 1.2rem;
      font-weight: 500;
      color: #333333;
      line-height: 0.933rem;

      span {
        font-size: 0.8rem;
        font-weight: 400;
        color: #999999;
        line-height: 1.867rem;
        margin-left: 0.667rem;
      }
    }

    .timeline {
      margin-top: 1.8rem;
      margin-bottom: 2rem;
      padding-left: 1.067rem;

      .timeline-item {
        position: relative;

        .timeline-item__tail {
          position: absolute;
          left: 0.6rem;
          height: 100%;
          border-left: 0.1rem solid #0087ff;
          opacity: 0.56;
        }

        .timeline-item__node {
          width: 1.2rem;
          height: 1.2rem;
          position: absolute;
          background: #0087ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.6rem;
          font-weight: 500;
          color: #ffffff;
        }

        .timeline-item__wrapper {
          padding-left: 1.8rem;

          .title {
            font-size: 0.933rem;
            font-weight: 500;
            color: #0087ff;
            line-height: 0.933rem;
            padding-bottom: 0.667rem;
          }

          .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 1rem;
            padding: 1rem 1rem 2rem;

            .icon-box {
              padding-top: 1rem;
              display: flex;
              align-items: center;
              justify-content: space-around;
              width: 100%;

              .icon {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                  width: 2.133rem;
                  height: 2.133rem;
                  margin-bottom: 0.467rem;
                }

                .text {
                  font-size: 0.8rem;
                  font-weight: 400;
                  color: #666666;
                  line-height: 1.1rem;
                }
              }
            }

            .button {
              margin-top: 1rem;
              width: 17rem;
              height: 2.667rem;
              background: #0084ff;
              border-radius: 1.467rem;
              font-size: 1.067rem;
              font-weight: 500;
              color: #ffffff;
              line-height: 2.667rem;
              text-align: center;
            }

            .content-text {
              .content-text-title {
                margin-top: 1rem;
                font-size: 0.933rem;
                font-weight: 400;
                color: #333333;
                line-height: 1.333rem;
                margin-bottom: 0.267rem;
              }

              .gray-text {
                font-size: 0.8rem;
                font-weight: 400;
                color: #999999;
                line-height: 1.1rem;
              }

              .blue {
                color: #0087ff;
              }
            }
          }
        }
      }
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      z-index: 99;
      background: rgba(0, 0, 0, 0.6);

      .icon {
        position: absolute;
        top: 2.667rem;
        right: 2.667rem;
        width: 3.967rem;
        height: 4.6rem;
      }

      .mask-text {
        position: absolute;
        top: 8rem;
        right: 4.167rem;
        font-size: 1.2rem;
        font-weight: 500;
        color: #ffffff;
        line-height: 1.667rem;
      }
    }
  }
</style>
