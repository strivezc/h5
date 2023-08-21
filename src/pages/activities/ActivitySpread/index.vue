<template>
  <transition name="fade">
    <div class="invite">
      <div class="invite_head" v-if="showButton">
        <img class="head_img" :src="brandPromotionInfo.showPcImageUrl"/>
      </div>
      <register-wrap @submit="login" ref="registerWrap1"></register-wrap>
      <div class="static_area">
        <img v-if="brandPromotionInfo.showDetailImageUrl" :src="brandPromotionInfo.showDetailImageUrl"/>
        <img v-else src="../../../../static/images/invite/invite.jpg"/>
      </div>
      <register-wrap @submit="login"  ref="registerWrap2"></register-wrap>

<!--      <div class="pay_area" v-if="showButton">-->
<!--        <div class="pay_btn" @click.stop="popShow">-->
<!--           brandPromotionInfo.currPrice == 0 ? "立即领取" : "立即抢购" }}-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="pay_area" v-else-if="showRegister">-->
<!--        <div class="pay_btn" @click.stop="popShow">立即注册</div>-->
<!--      </div>-->


      <!-- 弹窗层 -->
<!--      <van-popup v-model="show" position="bottom" class="van_pop">-->
<!--        <div class="pop_area">-->
<!--          <img-->
<!--              src="../../../../static/images/invite/img_monkey.png"-->
<!--              class="pophead_img centerSP"-->
<!--          />-->
<!--          <div class="register_area">-->
<!--            <span class="re_tit">新用户注册</span>-->
<!--            <img-->
<!--                src="../../../../static/images/invite/icon_close.png"-->
<!--                class="icon_close"-->
<!--                @click.stop="popShow"-->
<!--            />-->
<!--            <div class="input_area">-->
<!--              <div class="input_box">-->
<!--                <van-field-->
<!--                    v-model="form.phone"-->
<!--                    type="number"-->
<!--                    placeholder="请输入您的手机号"-->
<!--                    maxlength="11"-->
<!--                    class="_input"-->
<!--                    style="width: 100%"-->
<!--                />-->
<!--              </div>-->
<!--              &lt;!&ndash;            <div class="phone_tip">该手机已注册，请输入未注册手机号码</div>&ndash;&gt;-->
<!--              <div class="input_box" v-if="centreMsg === 1">-->
<!--                <van-field-->
<!--                    v-model="pictureCode"-->
<!--                    placeholder="请输入图形验证码"-->
<!--                    maxlength="4"-->
<!--                    class="_input"-->
<!--                />-->
<!--                <span class="cut_off centerCZ"></span>-->
<!--                <img-->
<!--                    class="send_code centerCZ"-->
<!--                    :src="imgBase64"-->
<!--                    alt=""-->
<!--                    @click="getBase64ImgCode"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="input_box">-->
<!--                <van-field-->
<!--                    v-model="form.captcha"-->
<!--                    placeholder="请输入短信验证码"-->
<!--                    maxlength="6"-->
<!--                    class="_input"-->
<!--                />-->
<!--                <span class="cut_off centerCZ"></span>-->
<!--                <span-->
<!--                    class="send_txt centerCZ"-->
<!--                    @click="sendCode"-->
<!--                    v-show="countdown === 0"-->
<!--                >获取验证码</span-->
<!--                >-->
<!--                <span-->
<!--                    class="send_txt grey centerCZ"-->
<!--                    @click="sendCode"-->
<!--                    v-show="countdown > 0"-->
<!--                >{{ countdown }}S</span-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
<!--            <div-->
<!--                class="register_btn"-->
<!--                :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"-->
<!--                @click="login"-->
<!--            >-->
<!--              注册-->
<!--            </div>-->
<!--            <div class="tips" @click="changeProTag">-->
<!--              <van-checkbox-->
<!--                  v-model="proTag"-->
<!--                  icon-size="0.83rem"-->
<!--                  class="van_checkbox"-->
<!--              ></van-checkbox>-->
<!--              我已阅读并同意用户<span class="pro_txt" @click="toAgreement"-->
<!--            >《用户协议》</span-->
<!--            >与<span class="pro_txt" @click="toPrivacyPolicy">《隐私协议》</span>、<span class="pro_txt" @click="toJuveniles">《儿童隐私协议》</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </van-popup>-->
    </div>
  </transition>
</template>

<script>
import {getActivityPromotionInfo} from "@/api";
import {getPictureCode, sendSmsCodeByCaptcha, sendSmsCode, regForActivity} from "@/api/user";
import {validateMobile} from "@/utils/validate";
import { setToken, setUserId, setUserType } from "@/utils/auth";
import {wxShare} from '@/utils/wxShare';
import { Toast } from "vant";
import {mapGetters} from "vuex";
import RegisterWrap from "./components/RegisterWrap";

const TIME_COUNT = 60;
export default {
  name: "ActivitySpread",
  components: {RegisterWrap},
  data() {
    return {
      show: false,
      proTag: false,
      pauseFlag: true,
      countdown: 0,
      timer: null,
      imgBase64: "",
      brandPromotionInfo: {},
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
      code: "",
      showButton: false,
      showRegister: false,
      loading: false,
    };
  },

  created() {
    this.form.code = this.$route.params.id;
    this.getActivityPromotionInfo();
  },
  computed: {
    ...mapGetters(['centreMsg']),
    disable() {
      return !(this.form.phone && this.form.captcha && this.proTag);
    },
  },
  methods: {
    registerWxShare() {
      let link = window.location.href;
      let params = {
        title: '说客英语',
        desc: '找外教、练口语，就上"说客英语"',
        link,
        imgUrl: `${window.location.origin}/h5/static/images/common/shareIcon.png`,
      };
      wxShare(params);
    },
    changeProTag() {
      this.proTag = !this.proTag;
    },
    toAgreement() {
      this.$router.push('/complianceContent/34?platformType='+3)
    },
    toPrivacyPolicy() {
      this.$router.push('/complianceContent/35?platformType='+3)
    },
    toJuveniles() {
      this.$router.push('/complianceContent/36?platformType='+3)
    },
    async getActivityPromotionInfo() {
      try {
        const {resultData} = await getActivityPromotionInfo({
          userRecommendCode: this.form.code,
        });
        this.showButton = true;
        this.brandPromotionInfo = resultData;
        this.form.recommendCode = resultData.talkId;
        let params = {
          grouponInfo: this.brandPromotionInfo,
        };
        console.log(params, "params");
        this.$store.dispatch("content/setGroupData", params)
        this.registerWxShare();
        if (this.centreMsg === 1) {
          await this.getBase64ImgCode();
        }
      } catch (e) {
        // showRegister
        if (e.resultMessage.indexOf("结束") > -1) {
          this.showRegister = true;
        } else {
          this.$toast(e.resultMessage);
        }
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
      if (this.centreMsg === 1 && !this.pictureCode) {
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
        if (this.centreMsg === 1) {
          await sendSmsCodeByCaptcha({
            phone: this.form.phone,
            pictureCode: this.pictureCode,
            code: this.code,
          });
        } else {
          await sendSmsCode({phone: this.form.phone});
        }
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
        if (this.centreMsg === 1) {
          await this.getBase64ImgCode();
        }
      }
    },
    async login(phone,captcha) {
      if (this.loading) return;
      // if (this.disable || this.loading) return;
      // if (!validateMobile(this.form.phone)) {
      //   this.$toast("手机号码格式不正确!");
      //   return;
      // }
      try {
        this.loading = true;
        const params = {
          ...this.form,
          phone,
          captcha
        }
        const {resultData} = await regForActivity(params);
        const token = resultData.token;
        await this.$store.commit("user/SET_TOKEN", token);
        setToken(token);
        // this.$toast.success("注册成功");
        // setTimeout(() => {
        this.loading = false;
        if (this.showRegister) {
          setUserId(resultData.userId);
          setUserType(resultData.userType);
          window.location.href = process.env.STUDENT_LINK; // 学生端学习大厅
        } else {
          this.$router.push({path: "/activity-order"});
        }
        // }, 2000);
      } catch (e) {
        this.loading=false;
        // this.countdown = 0;
        // this.timer = null;
        this.$refs.registerWrap1.clearTimer();
        this.$refs.registerWrap2.clearTimer();
      }
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
    popShow() {
      if (this.centreMsg === 1) {
        this.getBase64ImgCode();
      }
      this.show = !this.show;
    },
    //播放视频
    playVideo() {
      if (this.$refs.targetVideo.paused) {
        this.$refs.targetVideo.play();
        this.videoFlag = true;
      } else {
        this.$refs.targetVideo.pause();
      }
      this.pauseFlag = !this.pauseFlag;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.invite {
  background: #FFFAF8;
  padding-bottom: 100px;
}

.head_img {
  width: 100%;
  z-index: 0;
  position: relative;
}

.course_info_area {
  width: 23.4rem;
  height: 5.33rem;
  background: #ffffff;
  border-radius: 0.67rem;
  margin: 0 auto;
  /*margin-top: -2.67rem;*/
  z-index: 1;
  position: relative;
}

.course_price {
  font-size: 2.4rem;
  color: #ff4874;
  font-weight: bold;
  left: 1.07rem;
}

.icon_rmb {
  font-size: 0.8rem;
}

.course_oldPrice {
  left: 5.43rem;
}

.underline {
  text-decoration: line-through;
  font-size: 0.8rem;
  font-weight: 400;
  color: #7f7f7f;
  line-height: 1.1rem;
}

.icon_tag {
  width: 3.93rem;
  display: block;
  margin-bottom: 0.13rem;
}

.video_area {
  text-align: center;
  position: relative;
}

.video_area img {
  width: 23.4rem;
}

.static_area {
  text-align: center;
  /*padding-bottom: 120px;*/
}

.static_area img {
  width: 100%;
}

.marginTop {
  margin-top: 2.3rem;
}

.mt-1 {
  margin-top: 1rem;
}

.pay_area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0px -0.33rem 0.66rem 0px rgba(231, 231, 231, 0.5);
}

.txt_box {
  left: 1.07rem;
  font-size: 0.73rem;
  color: #999999;
}

.txt2 {
  font-size: 0.93rem;
  color: #ff4874;
  font-weight: 500;
  margin-top: 0.4rem;
}

.pay_btn {
  right: 1.07rem;
  width: 21.8rem;
  height: 2.67rem;
  line-height: 2.67rem;
  background: #ff4874;
  border-radius: 1.53rem;
  text-align: center;
  font-size: 0.93rem;
  color: #fff;
  font-weight: 500;
}

.pop_area {
  text-align: center;
}

.pophead_img {
  height: 5.88rem;
  top: -5.88rem;
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

.phone_tip {
  font-size: 0.8rem;
  color: #ff4874;
  padding-left: 1.6rem;
  text-align: left;
  margin-top: 0.53rem;
}

.video_box {
  top: 25rem;
}

.video_style {
  width: 21.27rem;
}

.icon_play {
  width: 4rem !important;
}

.fade-enter-active {
  transition: opacity 0.8s;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

@keyframes one-in {
  from {
    padding-top: 100px;
    height: 0%;
  }
  to {
    padding-top: 0px;
    height: 100%;
  }
}
</style>
