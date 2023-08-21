<template>
  <div class="login">
    <div class="input_area">
      <div class="psw_box">
        <div class="input_box">
          <van-field
            v-model="form.account"
            type="number"
            placeholder="请输入手机号"
            maxlength="11"
            class="_input"
          />
        </div>
        <div class="input_box">
            <van-field
                v-model="pictureCode"
                placeholder="请输入图片验证码"
                maxlength="4"
                class="_input"
            />
          <img
              class="code_img centerCZ"
              :src="imgBase64"
              alt=""
              @click="getBase64ImgCode"
          />
        </div>
        <div class="input_box">
            <van-field
              v-model="form.password"
              placeholder="请输入手机验证码"
              maxlength="6"
              class="_input"
            />
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
    </div>

    <div class="btn_area">
      <div>
        <div
          class="btn_login"
          @click="bindWx"
          :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
        >
          绑定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSmsCodeByCaptcha,getPictureCode } from "@/api/user";
import { userWxBindBySms } from "@/api";
import { validateMobile } from "@/utils/validate";

const TIME_COUNT = 60;
export default {
  data() {
    return {
      countdown: 0,
      timer: null,
      loading: false,
      form: {
        account: "",
        password: "",
        code: "",
      },
      imgBase64: "",
      pictureCode: "",
      code: "",
    };
  },
  created() {
    this.form.code = this.$route.query.code;
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
    async bindWx() {
      if (this.disable || this.loading) return;
      if (!validateMobile(this.form.account)) {
        this.$toast("手机号码格式不正确！");
        return;
      }
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        this.loading = true;
        await userWxBindBySms(this.form);
        this.$toast.clear();
        this.$toast.success("操作成功!");
        this.$emit('refresh')
        this.loading = false;
        setTimeout(()=>{
          if (WeixinJSBridge) {
            WeixinJSBridge.call('closeWindow');
          }
        },2000)
      } catch (e) {
        this.loading = false;
        console.log(e, "error");
      }
    },
    async sendCode() {
      if (this.timer) return;
      if (!this.form.account) {
        this.$toast("手机号码不能为空!");
        return;
      }
      if (!validateMobile(this.form.account)) {
        this.$toast("手机号码格式不正确!");
        return;
      }
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        await sendSmsCodeByCaptcha({ phone: this.form.account,pictureCode:this.pictureCode,code:this.code });
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
      return !(this.form.account && this.form.password);
    },
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
  padding: 0 32px;
}

.input_box {
  height: 96px;
  margin-bottom: 0.67rem;
  font-size: 1.2rem;
  position: relative;
}

._input {
  padding-left: 36px;
  border-radius: 48px;
  border: 1Px solid #E4E4E4;
}

.send_txt {
  margin-right: 50px;
  right: 0;
  font-size: 0.93rem;
  color: #0087ff;
}
.code_img {
  margin-right: 50px;
  right: 0;
  width: 4.533rem;
  height: 2.467rem;
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

.reg_tips {
  width: 100%;
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
