<template>
  <div class="button-block">
    <!-- 加入此团 -->
    <button class="join-btn"
            @click="participate()"
            v-if="btnName == 'joinWaiting'">
      <span>￥{{memberPrice}}</span>加入此团
    </button>

    <!-- 已参团，待成团 -->
    <div v-if="btnName == 'joinAlready'"
         class="share-block">
      <div class="share-text">
        <p class="already">您已参团</p>
        <p>还差<span class="num">{{enoughNum}}</span>人成团</p>
      </div>
      <button @click="shareToBro()"
              class="share-btn">转发好友</button>
    </div>

    <!-- 拼团失败 -->
    <button class="download-btn"
            @click="openApp()"
            v-if="btnName == 'joinFailure'">
      <span>请下载说客英语App，参与或发起拼团</span>
    </button>

    <!-- 订单未支付 -->
    <div class="share-block"
         v-if="btnName == 'joinPay'">
      <div class="share-text">
        <p class="not-yet">您的拼团订单尚未付款</p>
        <p>剩余支付时间:<span class="time">28分15秒</span></p>
      </div>
      <button @click="payNow()"
              class="share-btn">立即支付</button>
    </div>

    <!-- 拼团成功 -->
    <button class="join-btn-success"
            @click="openApp()"
            v-if="btnName == 'joinSuccess'">
      <span>请下载说客英语App，使用已购买课程</span>
    </button>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      isShowGuidance: false,
    };
  },
  mounted() {
    this.isShowGuidance = false;
  },
  props: ['btnName', 'enoughNum', 'memberPrice'],
  methods: {
    openApp() {
      window.location.href =
        'https://a.app.qq.com/o/simple.jsp?pkgname=com.chindle.talk915&fromcase=40003';
    },
    shareToBro() {
      this.isShowGuidance = true;
      this.$emit('shareToBro', this.isShowGuidance);
    },
    participate() {
      if (getToken()) {
        this.$router.push({
          path: '/checkOrder',
          query: {
            spellGroupId: this.$route.query.spellGroupId,
            headUserId: this.$route.query.headUserId,
            spellGroupSenderId: this.$route.query.spellGroupSenderId,
            invitedUserId: this.$route.query.invitedUserId,
          },
        });
      } else {
        this.$router.push({
          path: '/login',
          query: {
            spellGroupId: this.$route.query.spellGroupId,
            headUserId: this.$route.query.headUserId,
            spellGroupSenderId: this.$route.query.spellGroupSenderId,
            invitedUserId: this.$route.query.invitedUserId,
            fromPage: 'spellGroup',
            pageType: 'RegisterLogin',
          },
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.button-block {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  border: none;
  background: #fff;

  button {
    background: linear-gradient(90deg, #ff5c01 0%, #fe7700 100%);
    border-radius: 50px;
    font-size: 40px;
    font-weight: 500;
    color: #ffffff;
    height: 88px;
    line-height: 88px;
    margin-right: 2px;
  }

  .join-btn {
    width: 680px;
    span {
      margin-right: 5px;
      display: inline-block;
    }
  }

  .download-btn {
    width: 680px;
    font-size: 32px;
    background: #0087ff;
  }

  .share-block {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share-text {
      line-height: 28px;
      color: #333;
      font-size: 28px;

      .already {
        font-size: 36px;
        margin-bottom: 18px;
      }

      .num {
        color: #ff5c01;
      }
    }

    .share-btn {
      width: 343px;
      font-size: 32px;
    }
  }
  .join-btn-success {
    width: 680px;
    font-size: 32px;
    background: #0087ff;
  }
  .share-block {
    .share-text {
      line-height: 28px;
      color: #333;
      font-size: 28px;
      .not-yet {
        color: #ff5c01;
        margin-bottom: 18px;
      }
      .time {
        margin-left: 10px;
      }
    }
    .share-btn {
      width: 300px;
      font-size: 40px;
    }
  }
}
</style>
