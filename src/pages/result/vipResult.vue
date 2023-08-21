<template>
  <div class="result">
    <nav-bar title="支付结果" @backAction="backAction" :defaultBack="false"></nav-bar>
    <template v-if="fail">
      <div class="box-fail">
        <img
            src="../../../static/images/result/failIcon.png"
            class="result-icon"
            alt=""
        />
      </div>
      <p class="text">购买失败</p>
      <p class="text-fail" @click="repay">重新支付</p>
    </template>
    <template v-else>
      <div class="box">
        <img
            src="../../../static/images/result/success.png"
            class="result-icon"
            alt=""
        />
      </div>
      <p class="text">恭喜你，购买成功</p>
      <p class="text2" @click="goPurchaseRecord">点击查看交易记录>></p>
    </template>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {goPurchaseRecord, goBack} from "@/utils/appMethod";

export default {
  name: "Result",
  components: {
    navBar,
  },
  data() {
    return {
      showMask: false,
      fail: false,
    };
  },
  created() {
    this.fail = this.$route.query.fail;
  },
  methods: {
    backAction() {
      goBack();
    },
    repay() {
      this.$router.push({path: '/vipPurchase', query: {isRepay: 'y'}});
    },
    goPurchaseRecord() {
      goPurchaseRecord()
    },
  },
};
</script>

<style scoped lang="less">
  .result {
    margin-top: 3rem;

    .box {
      margin-top: 4.6rem;
      text-align: center;

      .result-icon {
        width: 4.633rem;
        height: 4.633rem;
      }
    }

    .box-fail {
      margin-top: 4.6rem;
      text-align: center;

      .result-icon {
        width: 140px;
        height: 140px;
      }
    }

    .text {
      font-size: 1.333rem;
      text-align: center;
      font-weight: 500;
      color: #333333;
      line-height: 1.867rem;
      margin-top: 0.833rem;
    }

    .text2 {
      margin-top: 20px;
      font-size: 28px;
      line-height: 36px;
      text-align: center;
      font-weight: 500;
      color: #333333;
    }

    .text-fail {
      width: 300px;
      height: 88px;
      background: #FE575B;
      border-radius: 44px;
      text-align: center;
      margin: auto;
      margin-top: 1.2rem;
      font-size: 32px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 88px;
    }
  }
</style>
