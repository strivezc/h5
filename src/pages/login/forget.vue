<template>
  <div class="forget">
    <nav-bar></nav-bar>

    <div class="forget_tit">忘记密码</div>

    <div class="input_area">
      <div class="input_box">
        <van-field
          v-model="form.phone"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
          class="_input"
        />
      </div>
      <div class="input_box">
        <div class="input_box">
          <van-field
            v-model="form.pictureCode"
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
          v-model="form.newPassword"
          type="password"
          placeholder="输入新密码"
          class="_input"
        />
      </div>
      <div class="input_box">
        <van-field
          v-model="form.confirmPassword"
          type="password"
          placeholder="确认新密码"
          class="_input"
        />
      </div>
    </div>

    <div class="btn_area">
      <div>
        <div
          class="btn_login"
          :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
          @click="submit"
        >
          提交
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {
  getPictureCode,
  sendSmsCodeByCaptcha,
  resetPassword,
} from "@/api/user";
import { validateMobile } from "@/utils/validate";

const TIME_COUNT = 60;
export default {
  name:'Forget',
  components: {
    navBar,
  },
  data() {
    return {
      proTag: false,
      countdown: 0,
      timer: null,
      imgBase64: "",
      form: {
        phone: "",
        captcha: "",
        pictureCode: "",
        newPassword: "",
        confirmPassword: "",
      },
      code:''
    };
  },
  created() {
    this.getBase64ImgCode();
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
      if (!this.form.pictureCode) {
        this.$toast("图形验证码不能为空!");
        return;
      }
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中..."
        });
        await sendSmsCodeByCaptcha({
          phone: this.form.phone,
          pictureCode: this.form.pictureCode,
          code:this.code,
        });
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
        await this.getBase64ImgCode();
      }
    },
    async submit() {
      if (this.disable) return;
      if (!validateMobile(this.form.phone)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      const reg = /(((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$)/;
      if (this.form.newPassword!==this.form.confirmPassword) {
        this.$toast("两次密码输入不一致!");
        return;
      }
      if (!reg.test(this.form.newPassword) || !reg.test(this.form.confirmPassword)) {
        this.$toast("密码只能由8到20位的字母、数字、@#$%^&*()等特殊字符组成!");
        return ;
      }
      try {
        await resetPassword(this.form);
        this.$toast.success("重置密码成功");
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      } catch (e) {
        this.countdown = 0;
        this.timer = null;
        console.log(e, "error");
      }
    },
  },
  computed: {
    disable() {
      return !(
        this.form.phone &&
        this.form.captcha &&
        this.form.pictureCode &&
        this.form.newPassword &&
        this.form.confirmPassword
      );
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.icon_left {
  width: 1.2rem;
  position: fixed;
  top: 0.87rem;
  left: 1.07rem;
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
.send_code {
  right: 0;
  width: 4.533rem;
  height: 2.467rem;
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
  background: #0087ff;
  border-radius: 1.6rem;
  font-size: 1.07rem;
  color: #fff;
  margin: 0 auto;
  margin-bottom: 1.33rem;
}

.reg_tips {
  width: 100%;
  text-align: left;
  font-size: 0.8rem;
  color: #999999;
  margin: 0 0 1.33rem 1.6rem;
}

.proto {
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

.forget_tit {
  font-size: 1.6rem;
  color: #333;
  font-weight: 500;
  margin: 4.33rem 0 0 1.6rem;
}
</style>
