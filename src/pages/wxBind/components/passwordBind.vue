<template>
  <div class="login">
    <div class="input_area">
      <div class="psw_box">
        <div class="input_box">
          <van-field
            v-model="form.account"
            placeholder="请输入手机号或talkId或邮箱"
            maxlength="50"
            class="_input"
          />
        </div>
        <div class="input_box">
          <van-field
            v-model="form.password"
            placeholder="请输入密码"
            class="_input"
          />
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
import { userWxBind } from "@/api";
import { validateMobile } from "@/utils/validate";

export default {
  data() {
    return {
      loading: false,
      form: {
        account: "",
        password: "",
        code: "",
      },
    };
  },
  created() {
    this.form.code = this.$route.query.code;
  },
  methods: {
    async bindWx() {
      if (this.disable || this.loading) return;
      // if (!validateMobile(this.form.account)) {
      //   this.$toast("手机号码格式不正确！");
      //   return;
      // }
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        this.loading = true;
        await userWxBind(this.form);
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
  },
  computed: {
    disable() {
      return !(this.form.account && this.form.password);
    },
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
</style>
