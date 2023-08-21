<template>
  <div>
    <van-popup v-model="showPopup" position="bottom" class="van_pop" :close-on-click-overlay="false"
               @click-overlay="popShow">
      <div class="pop_area">
        <img
            src="../../../static/images/invite/img_monkey.png"
            class="pophead_img centerSP"
        />
        <div class="register_area">
          <span class="re_tit" v-if="isLoginAction">账户登录</span>
          <span class="re_tit" v-else>新用户注册</span>
          <img
              src="../../../static/images/invite/icon_close.png"
              class="icon_close"
              @click.stop="popShow"
          />
          <div class="type_area" v-if="isLoginAction">
          <span
              class="type_txt1"
              :class="{ active: currentPage === 'CodeLogin' }"
              @click="switchTo('CodeLogin')"
          >验证码登录</span>
            <span class="gap"></span>
            <span
                class="type_txt2"
                :class="{ active: currentPage === 'PasswordLogin' }"
                @click="switchTo('PasswordLogin')"
            >密码登录</span
            >
          </div>
          <div class="input_area">
            <div class="input_box" v-if="isLoginAction && currentPage==='PasswordLogin'">
              <van-field
                  v-model="form.phone"
                  type="text"
                  placeholder="请输入说客ID/邮箱/手机号码"
                  class="_input"
                  style="width: 100%"
              />
            </div>
            <div class="input_box" v-else>
              <van-field
                  v-model="form.phone"
                  type="tel"
                  placeholder="请输入您的手机号"
                  maxlength="11"
                  class="_input"
                  style="width: 100%"
              />
            </div>
            <!--            <div class="phone_tip">该手机已注册，请输入未注册手机号码</div>-->
            <div class="input_box" v-if="(isLoginAction && currentPage === 'CodeLogin') || !isLoginAction">
              <van-field
                  v-model="pictureCode"
                  placeholder="请输入图形验证码"
                  maxlength="4"
                  type="number"
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
            <div class="input_box" v-if="!isLoginAction || currentPage === 'CodeLogin'">
              <van-field
                  v-model="form.captcha"
                  placeholder="请输入短信验证码"
                  maxlength="6"
                  type="number"
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
            <div class="input_box" v-if="isLoginAction && currentPage === 'PasswordLogin'">
              <van-field
                  v-model="form.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  class="_input"
              />
              <img src="@/assets/img/eye_close.png" class="eye_icon centerCZ" alt="" v-show="!showPassword"
                   @click="changePasswordType">
              <img src="@/assets/img/eye_open.png" class="eye_icon centerCZ" alt="" v-show="showPassword"
                   @click="changePasswordType">
            </div>
          </div>
          <div class="tips" @click="changeProTag" v-if="!isLoginAction">
            <van-checkbox
                v-model="proTag"
                icon-size="0.83rem"
                class="van_checkbox"
            ></van-checkbox>
            我已阅读并同意用户<span class="pro_txt" @click="toAgreement"
          >《用户协议》</span
          >与<span class="pro_txt" @click="toPrivacyPolicy">《隐私协议》</span></div>
          <div
              v-if="isLoginAction"
              class="register_btn"
              :style="disableLogin ? 'background:rgba(0,133,255,0.3)' : ''"
              @click="login"
          >
            登录
          </div>
          <div
              v-else
              class="register_btn"
              :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
              @click="register"
          >
            注册
          </div>
          <p class="to_login" v-if="isLoginAction" @click="toRegister">还没有账号？去注册</p>
          <p class="to_login" v-else @click="toLogin">已有账号？去登录</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {getPictureCode, sendSmsCodeByCaptcha, register, login} from "@/api/user";
import {validateMobile} from "@/utils/validate";
import { setToken,setUserId,setUserType ,setUserName, setMobileArea,setUserPhone,setPeopleSign} from "@/utils/auth";

const TIME_COUNT = 60;
export default {
  name: "index",
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    isLoginAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: "PasswordLogin",
      show: false,
      showPassword: false,
      imgBase64: "",
      code: "",
      pictureCode: "", // 图形验证码
      timer: null,
      countdown: 0,
      proTag: false,
      loading: false,
      form: {
        //验证码注册
        phone: "",
        captcha: "",
        // recommendCode: "", // 推荐码
        registerFrom: "talk915Child",
        isApp: 2,

        //密码登录
        // loginId:'',
        password:'',
        // loginMode: 1,
        // isApp: 2,

        //验证码登录
        // loginMode: 3,
        // isApp: 2,
        // loginId: '',
        // captcha: '',
      },
      passwordType: 'password'
    };
  },
  computed: {
    disable() {
      return !(this.form.phone && this.form.captcha && this.proTag);
    },
    disableLogin() {
      if (this.currentPage === 'PasswordLogin') {
        return !(this.form.phone && this.form.password);
      } else {
        return !(this.form.phone && this.form.captcha);
      }
    },
  },
  watch:{
    showPopup(val) {
      if (val) {
        this.getBase64ImgCode();
      }
    },
  },
  methods: {
    changePasswordType() {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    toRegister() {
      this.$emit('update:isLoginAction', false);
      this.getBase64ImgCode();
    },
    toLogin() {
      this.$emit('update:isLoginAction', true);
    },
    switchTo(pageName) {
      if (pageName==='CodeLogin') {
        this.getBase64ImgCode();
      }
      this.currentPage = pageName;
    },
    changeProTag() {
      this.proTag = !this.proTag;
    },
    toAgreement() {
      this.$router.push('/complianceContent/34?platformType=' + 3)
    },
    toPrivacyPolicy() {
      this.$router.push('/complianceContent/35?platformType=' + 3)
    },
    toJuveniles() {
      this.$router.push('/complianceContent/36?platformType=' + 3)
    },
    popShow() {
      // this.getBase64ImgCode();
      this.$emit('update:showPopup', !this.showPopup);

    },
    async getBase64ImgCode() {
      try {
        const {resultData} = await getPictureCode();
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
          duration: 0,
          forbidClick: true,
        });
        await sendSmsCodeByCaptcha({
          phone: this.form.phone,
          pictureCode: this.pictureCode,
          code: this.code,
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
      if (this.disableLogin || this.loading) return;
      if (this.currentPage === 'CodeLogin' && !validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      try {
        this.loading = true;
        let params = {};
        if (this.currentPage === 'CodeLogin') { // 验证码登录
          params = {
            isApp: 2,
            loginId: this.form.phone,
            loginMode: 3,
            captcha: this.form.captcha,
          }
        } else { // 密码登录
          params = {
            loginId: this.form.phone,
            password:this.form.password,
            isApp: 2,
            loginMode: 1,
          }
        }
        const {resultData} = await login(params);
        const token = resultData.token;
        await this.$store.commit("user/SET_TOKEN", token);
        setToken(token);
        setUserId(resultData.userId);
        setUserType(resultData.userType);
        setUserName(resultData.userName);
        setMobileArea(resultData.mobileArea);
        setUserPhone(resultData.phone);
        setPeopleSign(resultData.peopleSign);
        this.$emit('handleLogin');
        this.loading = false;
        this.popShow();
      } catch (e) {
        this.loading = false;
        this.countdown = 0;
        this.timer = null;
      }
    },
    async register() {
      if (this.disable || this.loading) return;
      if (!validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      try {
        const params = {
          phone: this.form.phone,
          captcha: this.form.captcha,
          registerFrom: "talk915Child",
          isApp: 2,
        };
        this.loading=true;
        const { resultData } = await register(params);
        const token = resultData.token;
        await this.$store.commit("user/SET_TOKEN", token);
        setToken(token);
        setUserId(resultData.userId);
        setUserType(resultData.userType);
        setUserName(resultData.userName);
        setMobileArea(resultData.mobileArea);
        setUserPhone(resultData.phone);
        setPeopleSign(0);
        this.$emit('handleRegister');
        this.$toast.success("注册成功");
        this.loading=false;
        this.popShow();
      } catch (e) {
        this.loading=false;
        this.countdown = 0;
        this.timer = null;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style scoped lang="less">
  .van_pop {
    border-radius: 20px 20px 0px 0px;
    overflow-y: unset !important;
  }

  .pophead_img {
    height: 5.88rem;
    top: -5.88rem;
  }

  .pop_area {
    text-align: center;
  }

  .register_area {
    padding: 40px 48px 62px 48px;
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
    border: 0.5px solid #e4e4e4;
    margin-top: 1.07rem;
    overflow: hidden;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 1.6rem;
    position: relative;
  }

  .van-cell::after {
    border-bottom: none;
  }
  /deep/ .van-field__control{
    line-height: 60px;
  }
  /deep/ .van-field{
    margin-bottom: 0!important;
  }

  input::-webkit-input-placeholder {
    color: #c0c0c0;
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
    margin-bottom: 0!important;
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

  .eye_icon {
    right: 25px;
    width: 36px;
    height: 28px;
    padding: 15px;
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
    margin-top: 30px;
  }

  .tips {
    margin-top: 30px;
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

  .to_login {
    margin-top: 30px;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    color: #0087FF;
    line-height: 38px;
  }

  .type_area {
    height: 2.3rem;
    margin-top: 76px;
    font-size: 48px;
    color: #999999;
    padding: 0 2.37rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gap {
    width: 0.03rem;
    height: 1.27rem;
    background: #cecece;
    display: inline-block;
  }

  .type_txt1 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #999999;
    line-height: 2.233rem;
  }

  .type_txt2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #999999;
    line-height: 2.233rem;
  }

  .active {
    color: #333333;
  }
</style>
