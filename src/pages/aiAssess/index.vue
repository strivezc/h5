<template>
  <div class="aiAssess-wrap">
    <div class="header">
      <img src="@/assets/img/aiAssess/logo.png" class="left" alt="">
      <div class="right" @click="popShow">注册体验</div>
    </div>
    <img src="@/assets/img/aiAssess/05.png" class="banner" alt="">
    <h3 class="title">为什么选择<span class="blue">Ai英语测评</span></h3>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="@/assets/img/aiAssess/frame2.png" class="swiper-img" alt=""></div>
        <div class="swiper-slide"><img src="@/assets/img/aiAssess/frame3.png" class="swiper-img" alt=""></div>

        <div class="swiper-slide"><img src="@/assets/img/aiAssess/frame1.png" class="swiper-img" alt=""></div>
      </div>
    </div>
    <div class="content">
      <h3 class="title">了解Ai英语测评分级</h3>
      <img src="@/assets/img/aiAssess/level.png" alt="">
      <h3 class="title">专为中国学员研发的<br>英语学习解决方案</h3>
      <img src="@/assets/img/aiAssess/01.png" alt="">
      <div class="tip-wrap">对标美国 CCSS 核心州立标准研发</div>
      <img src="@/assets/img/aiAssess/02.png" alt="">
      <div class="tip-wrap">覆盖生活、职场、多场景</div>
      <img src="@/assets/img/aiAssess/03.png" alt="">
      <div class="tip-wrap">沉浸式学习环境</div>
      <div class="copyright">Copyright © 深圳青豆教育科技有限公司 粤ICP备15077651号</div>
    </div>
    <div class="button-wrap">
      <div class="button" @click="popShow">立即注册体验</div>
    </div>

    <!-- 弹窗层 -->
    <van-popup v-model="show" position="bottom" class="van_pop">
      <div class="pop_area">
<!--        <img-->
<!--            src="../../../static/images/invite/img_monkey.png"-->
<!--            class="pophead_img centerSP"-->
<!--        />-->
        <div class="register_area">
          <span class="re_tit">新用户注册</span>
          <img
              src="../../../static/images/invite/icon_close.png"
              class="icon_close"
              @click.stop="popShow"
          />
          <div class="input_area">
            <div class="input_box">
              <van-field
                  v-model="form.phone"
                  type="number"
                  placeholder="请输入您的手机号"
                  maxlength="11"
                  class="_input"
                  style="width: 100%"
              />
            </div>
            <!--            <div class="phone_tip">该手机已注册，请输入未注册手机号码</div>-->
            <div class="input_box">
              <van-field
                  v-model="pictureCode"
                  placeholder="请输入图形验证码"
                  maxlength="4"
                  class="_input"
              />
              <span class="cut_off centerCZ"></span>
              <img
                  class="send_code centerCZ"
                  :src="imgBase64"
                  alt=""
                  @click="getBase64ImgCode"
              />
            </div>
            <div class="input_box">
              <van-field
                  v-model="form.captcha"
                  placeholder="请输入短信验证码"
                  maxlength="6"
                  class="_input"
              />
              <span class="cut_off centerCZ"></span>
              <span
                  class="send_txt centerCZ"
                  @click="sendCode"
                  v-show="countdown === 0"
              >获取验证码</span
              >
              <span
                  class="send_txt grey centerCZ"
                  @click="sendCode"
                  v-show="countdown > 0"
              >{{ countdown }}S</span
              >
            </div>
          </div>
          <div
              class="register_btn"
              :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
              @click="login"
          >
            注册
          </div>
          <div class="tips" @click="changeProTag">
            <van-checkbox
                v-model="proTag"
                icon-size="0.83rem"
                class="van_checkbox"
            ></van-checkbox>
            注册表示您已同意<span class="pro_txt" @click="toAgreement"
          >《用户协议》</span>与<span class="pro_txt" @click="toPrivacyPolicy">《隐私协议》</span></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Swiper from "swiper";
import { getActivityPromotionInfo } from "@/api";
import { getPictureCode, sendSmsCodeByCaptcha, register } from "@/api/user";
import { validateMobile } from "@/utils/validate";

export default {
  name: "index",
  data() {
    return {
      show: false,
      proTag: false,
      form: {
        phone: "",
        code: "", //活动码
        captcha: "",
        recommendCode: "", // 推荐码
        registerFrom: "wxshare",
        recommenderType: 6,
        isApp: 2,
      },
      pictureCode: "", // 图形验证码
      countdown: 0,
      timer: null,
      imgBase64: "",
    };
  },
  computed: {
    disable() {
      return !(this.form.phone && this.form.captcha && this.proTag);
    },
  },
  created() {
    this.$nextTick(() => {
      this.initSwiper();

    })
  },
  methods: {
    initSwiper() {
      new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 120,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });
    },
    changeProTag() {
      this.proTag = !this.proTag;
    },
    toAgreement() {
      this.$router.push('/complianceContent/34?platformType='+7)
    },
    toPrivacyPolicy() {
      this.$router.push('/complianceContent/35?platformType='+7)
    },
    popShow() {
      this.getBase64ImgCode();
      this.show = !this.show;
    },
    async getBase64ImgCode() {
      try {
        const { resultData } = await getPictureCode();
        this.imgBase64 = resultData.picture;
        this.code = resultData.code;
      } catch (e) {
        console.log(e, "error");
      }
    },
    async sendCode() {
      if (this.timer || this.sendDisable) return;
      if (!this.form.phone) {
        this.$toast("手机号码不能为空!");
        return;
      }
      if (!validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      if (!this.pictureCode) {
        this.$toast("图形验证码不能为空!");
        return;
      }
      try {
        this.sendDisable = true;
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中...",
        });
        await sendSmsCodeByCaptcha({
          phone: this.form.phone,
          pictureCode: this.pictureCode,
          code:this.code,
        });
        // this.$toast("短信验证码已发送!");
        this.$toast.clear();
        this.countdown = TIME_COUNT; // 短信验证码倒数
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
            this.countdown--;
          } else {
            clearInterval(this.timer);
            this.countdown = 0;
            this.timer = null;
          }
        }, 1000);
        this.sendDisable = false;
      } catch (e) {
        // this.$toast.clear();
        this.sendDisable = false;
        await this.getBase64ImgCode();
      }
    },
    async login() {
      if (this.disable || this.loading) return;
      if (!validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      try {
        this.loading=true;
        const { resultData } = await register(this.form);
        this.$toast.success("注册成功");
        setTimeout(() => {

        }, 2000);
      } catch (e) {
        this.loading=false;
        this.countdown = 0;
        this.timer = null;
      }
    },
  }
}
</script>

<style scoped lang="less">
  .aiAssess-wrap {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 102px;
      padding: 0 30px;

      .left {
        width: 254px;
        height: 52px;
      }

      .right {
        width: 240px;
        height: 56px;
        background: #0087FF;
        border-radius: 609px 609px 609px 609px;
        color: #ffffff;
        line-height: 56px;
        text-align: center;
        font-size: 28px;
      }
    }

    .banner {
      width: 100%;
    }

    .title {
      margin: 50px 0 40px 0;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      color: #333333;
      line-height: 47px;
    }

    .title2 {
      margin-top: 80px;
      margin-bottom: 20px;
    }

    .blue {
      color: #0087FF;
    }

    .content {
      padding: 0 30px;
      padding-bottom: 180px;
      img {
        width: 100%;
      }

      .tip-wrap {
        width: 750px;
        height: 69px;
        background: #FFF6E2;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        color: #FFA74F;
        line-height: 69px;
        margin-left: -30px;
        margin-right: -30px;
      }

      .copyright {
        text-align: center;
        height: 60px;
        font-size: 22px;
        color: #666666;
        line-height: 60px;
      }
    }

    .button-wrap {
      position: fixed;
      z-index: 99;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      width: 100%;
      background: #ffffff;
      .button {
        width: 686px;
        height: 100px;
        background: #0087FF;
        border-radius: 60px 60px 60px 60px;
        font-size: 32px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 100px;
        text-align: center;
      }
    }

    .swiper-container {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
    }

    .swiper-slide-active, .swiper-slide-duplicate-active {
      transform: scale(1);
    }
    .swiper-img{
      width: 560px;
      height: 442px;
    }
    .van_pop {
      border-radius: 20px 20px 0px 0px;
      overflow-y: unset !important;
    }
    .pop_area {
      text-align: center;
    }
    .register_area {
      padding: 1.33rem 1.6rem 2rem 1.6rem;
      position: relative;
      border-radius: 0.67rem 0.67rem 0rem 0rem;
    }

    .van_pop {
      border-radius: 20px 20px 0px 0px;
      overflow-y: unset !important;
    }

    .re_tit {
      color: #0087ff;
      font-size: 1.33rem;
      font-weight: 600;
    }

    .icon_close {
      position: absolute;
      width: 1.6rem;
      top: 1.33rem;
      right: 1.6rem;
    }

    .input_area {
      margin-top: 1.33rem;
    }

    .input_box {
      height: 3.2rem;
      line-height: 3.2rem;
      border-radius: 1.6rem;
      border: 1px solid #e4e4e4;
      margin-top: 1.07rem;
      overflow: hidden;
      text-align: left;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0 1.6rem;
      position: relative;
    }

    input::-webkit-input-placeholder {
      color: #c0c0c0;
      font-size: 1.07rem;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c0c0c0;
      font-size: 1.07rem;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c0c0c0;
      font-size: 1.07rem;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #c0c0c0;
      font-size: 1.07rem;
    }

    ._input {
      width: 12.17rem;
      font-size: 1.07rem;
    }

    .cut_off {
      width: 1px;
      height: 1.33em;
      background: #e4e4e4;
      right: 8rem;
    }

    .send_txt {
      right: 1.8rem;
      font-size: 0.93rem;
      color: #0087ff;
    }

    .grey {
      color: #8d949b;
      padding-right: 1rem;
    }

    .send_code {
      right: 1.8rem;
      width: 4.667rem;
      height: 2rem;
    }

    .register_btn {
      height: 3.2rem;
      line-height: 3.2rem;
      background: #0087ff;
      text-align: center;
      font-size: 1.07rem;
      color: #fff;
      font-weight: 500;
      border-radius: 1.6rem;
      margin-top: 1.6rem;
    }

    .tips {
      margin-top: 1.07rem;
      font-size: 0.8rem;
      color: #8d949b;
    }

    .pro_txt {
      color: #0087ff;
    }

    .van_checkbox {
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.13rem;
    }
  }
</style>
