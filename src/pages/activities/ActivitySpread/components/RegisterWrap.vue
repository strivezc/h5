<template>
  <div class="wrapper">
<!--    <p class="title">免费获取</p>-->
    <p class="text">全面激发学员外语逻辑能力的方法</p>
    <div class="input_box">
      <van-field
          v-model="state.phonenum"
          type="phone"
          placeholder="请输入您的手机"
          maxlength="13"
          class="_input"
          style="width: 100%"
      />
    </div>
    <div class="input_box">
      <van-field
          v-model="state.form.captcha"
          placeholder="请输入验证码"
          maxlength="6"
          class="_input"
      />
      <span
          class="send_txt centerCZ"
          @click="sendCode"
          v-show="state.countdown === 0"
      >获取验证码</span
      >
      <span
          class="send_txt grey centerCZ"
          @click="sendCode"
          v-show="state.countdown > 0"
      >({{ state.countdown }}S)</span
      >
    </div>
    <div
        class="register_btn"
        @click="submit"
    >
      <span class="btn-text">领取课程权益</span>
    </div>
  </div>
</template>

<script setup>
  import {defineEmits, reactive, watch, computed,onUnmounted,defineExpose} from "vue";
  import {Toast} from 'vant';
  import {validateMobile} from "@/utils/validate";
  import {getPictureCode, sendSmsCodeByCaptcha, sendSmsCode} from "@/api/user";
  import {useStore} from "@/utils/vueApi.js";

  const store = useStore();
  const emits = defineEmits(['submit'])
  let sendDisable = null;
  let timer = null;
  const TIME_COUNT = 60;

  const state = reactive({
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
    code: "",
    phonenum: "",
  })

  watch(
    () => state.phonenum,
    (newvalue, oldvalue) => {
      state.phonenum = newvalue.length > oldvalue.length ? newvalue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : state.phonenum.trim();
      if (state.phonenum.length === 13) {
        state.form.phone = state.phonenum.replace(/\s/g, '')
      }

    }
  )
  const centreMsg = computed(() => {
    return store.getters.centreMsg
  });
  const disable = computed(() => {
    return !(state.form.phone && state.form.captcha);
  });

  const submit = () => {
    // if (disable.value) return;
    if (!state.form.phone) {
      Toast("请输入手机号码!");
      return;
    }
    if (!validateMobile(state.form.phone)) {
      Toast("手机号码格式不正确!");
      return;
    }
    if (!state.form.captcha) {
      Toast("请输入验证码!");
      return;
    }
    emits('submit',state.form.phone,state.form.captcha);
  }

  const sendCode = async () => {
    if (timer || sendDisable) return;
    if (!state.form.phone) {
      Toast("手机号码不能为空!");
      return;
    }
    if (!validateMobile(state.form.phone)) {
      Toast("手机号码格式不正确!");
      return;
    }
    if (centreMsg.value === 1 && !state.pictureCode) {
      Toast("图形验证码不能为空!");
      return;
    }
    try {
      sendDisable = true;
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
      });
      if (centreMsg.value === 1) {
        await sendSmsCodeByCaptcha({
          phone: state.form.phone,
          pictureCode: state.pictureCode,
          code: state.code,
        });
      } else {
        await sendSmsCode({phone: state.form.phone});
      }
      Toast.clear();
      state.countdown = TIME_COUNT; // 短信验证码倒数
      timer = setInterval(() => {
        if (state.countdown > 0 && state.countdown <= TIME_COUNT) {
          state.countdown--;
        } else {
          clearTimer();
          timer = null;
        }
      }, 1000);
      sendDisable = false;
    } catch (e) {
      sendDisable = false;
      if (centreMsg.value === 1) {
        // await getBase64ImgCode();
      }
    }
  }

  const clearTimer=()=>{
    state.countdown = 0;
    clearInterval(timer);
    timer=null;
  }
  defineExpose({
    clearTimer
  })
  onUnmounted(()=>{
    clearTimer();
  })
</script>

<style scoped lang="less">
  .wrapper {
    width: 690px;
    /*height: 553px;*/
    background: #FFFFFF;
    box-shadow: 0px 4px 25px 0px rgba(255, 108, 29, 0.15);
    border-radius: 20px 20px 20px 20px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    padding-bottom: 40px;

    .title {
      font-weight: bold;
      font-size: 48px;
      text-align: center;
      line-height: 56px;
      margin-top: 23px;
      background-image: linear-gradient(180deg, #FF9B66 0%, #FF6C1D 100%);
      -webkit-background-clip: text;
      letter-spacing: 1px;
      color: transparent;
      padding-top: 28px;
    }

    .text {
      font-size: 28px;
      font-weight: 400;
      color: #777777;
      line-height: 33px;
      text-align: center;
      padding-bottom: 10px;
      padding-top: 30px;
      margin-top: 6px;
    }

    .input_box {
      width: 591px;
      height: 92px;
      line-height: 3.2rem;
      border-radius: 60px 60px 60px 60px;
      background: #FFF5F0;
      border: 1px solid #D7D7D7;
      margin: auto;
      margin-top: 30px;
      overflow: hidden;
      text-align: left;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0 48px;
      position: relative;
    }

    input::-webkit-input-placeholder {
      color: #999999;
      font-size: 1.07rem;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999999;
      font-size: 1.07rem;
    }

    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999999;
      font-size: 1.07rem;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #999999;
      font-size: 1.07rem;
    }

    ._input {
      width: 12.17rem;
      font-size: 32px;
      padding-left: 0;
      padding-right: 0;
      background: #FFF5F0;
    }

    .send_txt {
      display: block;
      text-align: center;
      width: 206px;
      height: 94px;
      right: 0;
      font-size: 30px;
      color: #ffffff;
      background: linear-gradient(180deg, #FF9B66 0%, #FF6C1D 100%);
      border-radius: 0px 60px 60px 0px;
    }

    .grey {
      background: #D9D9D9;
    }

    .send_code {
      right: 1.8rem;
      width: 4.667rem;
      height: 2rem;
    }

    .register_btn {
      margin: auto;
      margin-top: 30px;
      width: 591px;
      height: 92px;
      border-radius: 60px 60px 60px 60px;
      opacity: 1;
      border: 1px solid #E0E0E0;
      background-image: linear-gradient(180deg, #FF9B66 0%, #FF6C1D 100%);

      .btn-text {
        display: block;
        color: #ffffff;
        font-size: 30px;
        font-weight: 500;
        line-height: 92px;
        text-align: center;
      }
    }
  }
</style>
