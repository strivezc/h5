<template>
  <van-overlay :show="showResult" @click="close">
    <div class="wrapper" @click.stop>
      <template v-if="status">
        <div class="success-wrap">
          <img src="@/assets/img/lottery/frame.png" class="frame" alt="">
          <img src="@/assets/img/lottery/winPprize.png" class="prize centerSP" alt="">
          <img :src="productIcon" class="prizeIcon centerSP" alt="">
          <p class="prizeName centerSP">{{productName}}</p>
          <div class="btn-group">
            <div class="left" @click="goBack(106106101)">返回抽奖首页</div>
            <div class="right" @click="openRecord">查看奖品</div>
          </div>
          <p class="text centerSP">课时奖品系统将在7个工作日内自动发放 实物奖品平台将在7个工作日通过快递发放 可联系客服或学习顾问沟通信息</p>
        </div>
      </template>
      <template v-else>
        <img src="@/assets/img/lottery/noPrize.png" class="noPrize centerSP" alt="">
        <div class="goBack centerSP" @click="goBack(106105101)">返回抽奖首页</div>
      </template>
    </div>
  </van-overlay>
</template>

<script>
import {addMarkedPointUserClickRecord} from '@/api';
export default {
  name: "result",
  props: {
    showResult: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
      default: '',
    },
    productIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      if (!this.status) {
        addMarkedPointUserClickRecord(106105102);
      }
      this.$emit('update:showResult', !this.showResult);
    },
    goBack(value) {
      this.close();
      addMarkedPointUserClickRecord(value);
    },
    openRecord() {
      addMarkedPointUserClickRecord(106106102);
      this.close();
      this.$emit('openRecord', !this.showResult)
    },
  }
}
</script>

<style scoped lang="less">
  .wrapper {
    position: relative;
    .noPrize {
      position: absolute;
      top: 430px;
      width: 410px;
      height: 377px;
    }

    .goBack {
      position: absolute;
      top: 848px;
      width: 377px;
      height: 60px;
      background: #FFFFFF;
      border-radius: 30px 30px 30px 30px;
      border: 1px solid #FFFFFF;
      text-align: center;
      font-size: 28px;
      color: #0087FF;
      line-height: 60px;
    }

    .success-wrap {
      position: absolute;
      top: 260px;

      .frame {
        width: 730px;
        height: 740px;
        -webkit-animation:changeright 8s linear infinite;
      }

      .prize {
        position: absolute;
        top: 82px;
        width: 500px;
        height: 500px;
      }

      .prizeIcon {
        position: absolute;
        top: 241px;
        width: 192px;
        height: 192px;
      }

      .prizeName {
        position: absolute;
        top: 450px;
        font-size: 36px;
        line-height: 51px;
        font-weight: 500;
        color: #FFFFFF;
        word-wrap: break-word;
        text-align: center;
      }

      .btn-group {
        position: absolute;
        top: 612px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        .left {
          padding: 0 26px;
          height: 60px;
          background: #FFFFFF;
          border-radius: 30px 30px 30px 30px;
          border: 1px solid #FFFFFF;
          font-size: 28px;
          color: #0087FF;
          line-height: 60px;
        }

        .right {
          padding: 0 38px;
          margin-left: 24px;
          height: 60px;
          background: #0087FF;
          border-radius: 30px 30px 30px 30px;
          font-size: 28px;
          color: #FFFFFF;
          line-height: 60px;
        }
      }
      .text{
        position: absolute;
        top: 712px;
        text-align: center;
        width: 450px;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 40px;
      }
    }

    @-webkit-keyframes changeright {

      0% {
        -webkit-transform: rotate(0deg);
      }

      50% {
        -webkit-transform: rotate(180deg);
      }

      100% {
        -webkit-transform: rotate(360deg);
      }
    }


  }
</style>
