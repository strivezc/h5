<template>
  <div class="login">
    <div class="input_area">
      <div class="psw_box">
        <div class="input_box">
          <van-field
            v-model="form.loginId"
            type="text"
            placeholder="请输入说客ID/邮箱/手机号码"
            class="_input"
          />
        </div>
        <div class="input_box">
          <van-field
            v-model="form.password"
            type="password"
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
          @click="login"
          :style="disable ? 'background:rgba(0,133,255,0.3)' : ''"
        >
          登录
        </div>
        <div class="forget" @click="forgetPassword"><span>忘记密码</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        loginId: "",
        password: "",
        isApp: 2,
        loginMode: 1,
      },
    };
  },
  methods: {
    async login() {
      if (this.disable) return;
      this.$store.dispatch("user/login", this.form).then((data) => {
        this.$emit("loginAction",data);
      });
    },
    forgetPassword() {
      this.$router.push("/forget");
    },
  },
  computed: {
    disable() {
      return !(this.form.loginId && this.form.password);
    },
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
}
.forget {
  margin: 1.33rem 0;
}
.forget span {
  padding: 1.33rem 0;
}
</style>
