<template>
  <div>
    <div class="kf_area" @click="showContact">
      <img
          src="../../../../static/images/student/kf_logo.png"
          class="kf_logo centerSPCZ"
      />
    </div>

    <van-overlay :show="show" @click="show = false">
      <div class="code-wrap" @click.stop v-if="inApp">
        <img src="@/assets/img/lottery/code.png" alt="" class="bg bg-inApp">
        <img :src="detailData.createrWxCode" alt="" class="qrcode qrcode-inApp">
        <div class="phone-wrap phone-wrap-inApp" @click="callPhone">
          <img src="@/assets/img/lottery/phone.png" alt="" class="icon icon-inApp" >
          <span class="text">{{detailData.createrPhone}}</span>
        </div>
        <img src="@/assets/img/lottery/close.png" alt="" class="close close-inApp centerSP" @click="close">
        <div class="saveBtn centerSP" @click="saveQrcode">保存二维码到相册</div>
      </div>

      <div class="code-wrap" @click.stop v-else>
        <img src="@/assets/img/lottery/code.png" alt="" class="bg">
        <img :src="detailData.createrWxCode" alt="" class="qrcode">
        <div class="phone-wrap" @click="callPhone">
          <img src="@/assets/img/lottery/phone.png" alt="" class="icon" >
          <span class="text">{{detailData.createrPhone}}</span>
        </div>
        <img src="@/assets/img/lottery/close.png" alt="" class="close centerSP" @click="close">
      </div>
    </van-overlay>
  </div>
</template>

<script>
import {callPhone,saveImageByLink} from "@/utils/appMethod";

export default {
  name: "teacherContact",
  props: {
    inApp: {
      type: String,
    },
    detailData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    saveQrcode(){
      saveImageByLink({url:this.detailData.createrWxCode});
      this.close();
    },
    callPhone() {
      if (this.inApp) {
        callPhone(this.detailData.createrPhone);
      } else {
        this.$copyText(this.detailData.createrPhone).then(
          (res) => {
            this.$toast("手机号复制成功");
            this.shareShow();
          },
          (err) => {
            this.$toast("手机号复制失败");
          }
        );
      }
    },
    showContact() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style scoped lang="less">
  .code-wrap {
    position: relative;

    .bg {
      position: absolute;
      left: 50%;
      top: 280px;
      transform: translateX(-50%);
      width: 477px;
      height: 697px;
    }
    .bg-inApp{
      top: 188px;
    }
    .qrcode{
      position: absolute;
      top: 462px;
      left: 50%;
      transform: translateX(-50%);
      width: 350px;
      height: 350px;
    }
    .qrcode-inApp{
      top: 385px;
    }
    .saveBtn {
      position: absolute;
      top: 914px;
      width: 477px;
      text-align: center;
      height: 88px;
      background: #FFFFFF;
      border-radius: 64px 64px 64px 64px;
      font-size: 32px;
      color: #0087FF;
      line-height: 88px;
    }
    .phone-wrap {
      position: absolute;
      top: 850px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      margin-left: -14px;
      .icon {
        padding: 15px;
        width: 42px;
        height: 42px;
      }

      .text {
        font-size: 36px;
        color: #FFFFFF;
        line-height: 42px;
      }
    }
    .phone-wrap-inApp{
      top: 758px;
    }

    .close{
      width: 44px;
      height: 44px;
      position: absolute;
      top: 1011px;
      left: 50%;
    }
    .close-inApp{
      top: 1070px;
    }
  }

  .kf_area {
    position: fixed;
    z-index: 2;
    width: 3.2rem;
    height: 3.2rem;
    background: #ffffff;
    box-shadow: 0rem 0.27rem 0.73rem 0rem rgba(39, 72, 100, 0.3);
    right: 0.67rem;
    bottom: 5.56rem;
    border-radius: 50%;
  }

  .kf_logo {
    width: 1.6rem;
  }
</style>
