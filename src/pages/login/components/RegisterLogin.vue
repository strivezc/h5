<template>
  <div class="login">
    <div class="input_area">
      <div class="psw_box">
        <div class="input_box">
          <van-field
            v-model="form.phone"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
            class="_input"
          />
        </div>
        <div class="input_box" v-if="centreMsg===1">
          <div class="input_box">
            <van-field
                v-model="pictureCode"
                placeholder="请输入图片验证码"
                maxlength="4"
                class="_input"
            />
          </div>
          <img
              class="send_code centerCZ"
              :src="imgBase64"
              alt=""
              @click="getBase64ImgCode"
          />
        </div>
        <div class="input_box">
          <div class="input_box">
            <van-field
              v-model="form.captcha"
              placeholder="请输入手机验证码"
              maxlength="6"
              class="_input"
              @blur="blurEvent"
            />
          </div>
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
        <div class="input_box">
          <van-field
            v-model="form.recommendCode"
            placeholder="选填，推荐人推荐码"
            class="_input"
            :disabled="recommendCodeFromUrl"
            @blur="blurEvent"
          />
        </div>
      </div>
    </div>

    <div class="btn_area">
      <div>
        <div class="reg_tips">未注册手机号，验证通过即可注册登录</div>
        <div
          class="btn_login"
          @click="login"
          :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
        >
          注册
        </div>
        <div class="proto">
          <van-checkbox v-model="proTag" icon-size="14px" class="van_checkbox">
          </van-checkbox>
          我已阅读并同意用户<span class="proto_txt" @click="toAgreement">《用户协议》</span
          >与<span class="proto_txt" @click="toPrivacyPolicy">《隐私协议》</span>、<span class="proto_txt" @click="toJuveniles">《儿童隐私协议》</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, sendSmsCodeByCaptcha,sendSmsCode, getPictureCode } from "@/api/user";
import { validateMobile } from "@/utils/validate";
import { setToken,setUserId,setUserType ,setUserName, setMobileArea,setUserPhone,setPeopleSign} from "@/utils/auth";
import {mapGetters} from "vuex";

const TIME_COUNT = 60;
export default {
  data() {
    return {
      countdown: 0,
      timer: null,
      proTag: false,
      loading: false,
      form: {
        phone: "",
        registerFrom: 6,
        isApp: 2,
        captcha: "", //验证码
        recommendCode: "",
        recommenderType: '',
      },
      imgBase64: "",
      pictureCode: '',
      code: '',
      isNormal: '',
      fromPage: '',
      //用户拼团数据
      headUserId: '', //拼团分享团长userId
      spellGroupId: '', //拼团活动id
      registerFrom:'',
      recommendCodeFromUrl:'',
    };
  },
  created() {
    if (this.centreMsg === 1) {
      this.getBase64ImgCode();
    }
    this.fromPage = this.$route.query.fromPage;
    this.isNormal = this.$route.query.isNormal;
    this.headUserId = this.$route.query.headUserId;
    this.spellGroupId = this.$route.query.spellGroupId;
    this.registerFrom = this.$route.query.registerFrom;
    this.recommendCodeFromUrl = this.$route.query.recommendCode;
    this.form.recommendCode=this.recommendCodeFromUrl;
    if (this.fromPage === "groupon") {
      // 团购注册
      this.form.registerFrom = "talk915Child";
    } else if (this.fromPage === "spellGroup") {
      // 用户拼团注册
      this.form.registerFrom = "spellgroupshare";
      this.form.recommenderType = 7;
    } else if (this.isNormal) {
      // 普通注册
      this.form.registerFrom = "talk915Child";
    } else if (this.registerFrom==='learnReport') {
      // 学习报告注册来源
      this.form.registerFrom = "learnReport";
      this.form.recommenderType = 9;
    } else {
      // 加盟校注册
      this.form.registerFrom = "agent";
      this.form.recommenderType = 4;
    }
  },
  methods: {
    async getBase64ImgCode() {
      try {
        const { resultData } = await getPictureCode();
        this.imgBase64 = resultData.picture;
        this.code = resultData.code;
      } catch (e) {
        console.log(e, "error");
      }
    },
    toAgreement(){
      this.$router.push('/complianceContent/34?platformType='+3)
    },
    toPrivacyPolicy(){
      this.$router.push('/complianceContent/35?platformType='+3)
    },
    toJuveniles(){
      this.$router.push('/complianceContent/36?platformType='+3)
    },
    blurEvent() {
      window.scrollTo(0, 0);
    },
    async login() {
      if (this.disable || this.loading) return;
      if (!validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      try {
        const params = {
          ...this.form,
          recommendCode: this.recommendCode
            ? this.recommendCode
            : this.form.recommendCode,
          // 拼团注册必填数据
          headUserId: this.fromPage === 'spellGroup' ? this.headUserId : null,
          spellGroupId: this.fromPage === 'spellGroup' ? this.spellGroupId : null,
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
        this.$toast.success("注册成功");
        setTimeout(() => {
          this.loading=false;
          this.$emit("loginAction",resultData);
        }, 2000);
      } catch (e) {
        this.loading=false;
        this.countdown = 0;
        this.timer = null;
      }
    },
    async sendCode() {
      if (this.timer) return;
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
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中..."
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
      } catch (e) {
        // this.$toast.clear();
        console.log(e, "error");
      }
    },
  },
  computed: {
    disable() {
      return !(this.form.phone && this.form.captcha && this.proTag);
    },
    ...mapGetters(['centreMsg','recommendCode']),
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.type_area span {
}

.input_area {
  margin-top: 1.63rem;
  padding: 0 1.6rem;
}

.input_box {
  height: 3.3rem;
  margin-bottom: 0.67rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #e4e4e4;
  padding-right: 4.6rem;
  position: relative;
}

._input {
  padding-left: 0 !important;
}

.send_txt {
  right: 0;
  font-size: 0.93rem;
  color: #0087ff;
}
.grey {
  color: #8d949b;
  padding-right: 1rem;
}

.btn_area {
  margin-top: 1.6rem;
  text-align: center;
  font-size: 0.93rem;
  color: #999999;
}

.btn_login {
  width: 21.8rem;
  height: 3.2rem;
  line-height: 3.2rem;
  text-align: center;
  border-radius: 1.6rem;
  background: #0087ff;
  font-size: 1.07rem;
  color: #fff;
  margin: 0 auto;
  margin-bottom: 1.33rem;
}
.send_code {
  right: 0;
  width: 4.533rem;
  height: 2.467rem;
}
.reg_tips {
  text-align: left;
  font-size: 0.8rem;
  color: #999999;
  margin: 0 0 1.33rem 1.6rem;
}

.proto {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  padding: 0 1.6rem;
  font-size: 0.8rem;
}

.proto_txt {
  color: #0087ff;
}

.van_checkbox {
  display: inline-block;
  vertical-align: top;
  margin-right: 0.67rem;
}
</style>
