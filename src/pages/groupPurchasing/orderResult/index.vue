<template>
  <div class="order-result">
    <nav-bar title="支付订单"
             @backAction="backAction"
             :showBack="false"
             :defaultBack="false"
             v-if="!isWeixin"></nav-bar>
    <div class="wrap">
      <div v-if="isSuccess"
           class="main-content"
           :class="isWeixin?'addPadding':''">
        <img src="@/assets/img/success_img.png"
             alt="" />
        <p>支付成功</p>
        <button class="success-btn"
                @click="watchGrouponOrder">{{grouponInfo.buyType==2?'查看订单':'查看拼团'}}</button>
      </div>
      <div v-else
           class="main-content"
           :class="isWeixin?'addPadding':''">
        <img src="@/assets/img/failure_img.png"
             alt="" />
        <p>支付失败</p>
        <button @click="repay">再次支付</button>
      </div>
      <divider :msg="'购买须知'"></divider>
      <div class="server">
        <p>关注<span class="server-name">说客英语微信服务号</span></p>
        <p>及时了解课程相关信息</p>
        <img class="code-img"
             src="@/assets/img/code_img.png"
             alt="">
        <p class="follow-tip"><img src="@/assets/img/top_arrow.png"
               alt="">
          扫描二维码关注
          <img src="@/assets/img/top_arrow.png"
               alt="">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { watchGrouponOrder, goBack, watchOrder } from '@/utils/appMethod';
import navBar from '@/components/NavBar';
import divider from '../components/Divider.vue';
import Cookies from 'js-cookie';
import { mySpellGroupOrderDetails } from '@/api/group';
import { isWeixin } from '@/utils';

export default {
  data() {
    return {
      isSuccess: null,
      spellGroupSenderId: null,
      isH5: false,
      disabled: false,
      grouponInfo: {},
      isWeixin: isWeixin(),
    };
  },
  components: {
    navBar,
    divider,
  },
  created() {
    let grouponInfo = Cookies.get('grouponInfo');
    if (grouponInfo) {
      this.grouponInfo = JSON.parse(grouponInfo);
    }
    console.log(this.grouponInfo, 'this.grouponInfo');
    this.isSuccess = this.$route.query.isSuccess;
  },
  methods: {
    backAction() {
      goBack();
    },
    async watchGrouponOrder() {
      if (this.grouponInfo.isH5) {
        this.$router.push({
          path: '/participateStatus',
          query: {
            spellGroupId: this.grouponInfo.spellGroupId,
            headUserId: this.grouponInfo.headUserId,
            spellGroupSenderId: this.grouponInfo.spellGroupSenderId,
            invitedUserId: this.grouponInfo.invitedUserId,
          },
        });
      } else {
        if (this.grouponInfo.buyType == 2) {
          watchOrder();
        } else {
          if (this.disabled) return;
          try {
            this.disabled = true;
            const { resultData } = await mySpellGroupOrderDetails(
              this.grouponInfo.oid
            );
            this.disabled = false;
            console.log(resultData, 'resultData');
            this.grouponInfo.spellGroupSenderId = resultData.spellGroupSenderId;
            console.log(
              this.grouponInfo.spellGroupSenderId,
              'spellGroupSenderId'
            );
            watchGrouponOrder(this.grouponInfo.spellGroupSenderId);
          } catch (e) {
            this.disabled = false;
            console.log(e, 'error');
          }
        }
      }
    },
    repay() {
      this.$router.push({ path: '/groupPurchase', query: { isRepay: 'y' } });
    },
  },
};
</script>
<style scoped lang="less">
.order-result {
  .wrap {
    box-sizing: border-box;
    width: 100%;
    padding: 0 40px;

    .main-content {
      margin: 270px 0 80px 0;
      width: 100%;
      text-align: center;
      &.addPadding {
        margin-top: 200px;
      }
      img {
        width: 180px;
      }
      p {
        font-size: 40px;
        font-weight: 500;
        color: #333333;
        margin: 25px 0 60px 0;
      }
      button {
        width: 670px;
        height: 88px;
        background: #0087ff;
        border-radius: 60px;
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
        &.success-btn {
          color: #0087ff;
          background: #ffffff;
          border: 1px solid #0087ff;
        }
      }
    }
    .server {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      .server-name {
        color: #ff5c01;
        margin-left: 5px;
      }
      .code-img {
        margin: 20px 0;
        width: 340px;
      }
    }
    .follow-tip {
      font-size: 24px;
      font-weight: 400;
      color: #666666;
      img {
        width: 15px;
        height: 17px;
      }
    }
  }
}
</style>
