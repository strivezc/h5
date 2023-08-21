<template>
  <div class="check-order">
    <nav-bar title="支付订单"
             v-if="!isWeixin"></nav-bar>
    <div class="content" :style="isWeixin?'':'paddingTop: 3rem'">
      <p class="tip" v-if="grouponInfo.oid">您已下单本商品，可继续完成支付</p>
      <div class="goods-info">
        <course-detail :isShowBtn="false"
                       :showPrice="false"
                       :grouponInfo="grouponInfo"></course-detail>
      </div>
      <div class="footer-box" v-if="grouponInfo.oid">
        <div class="footer">
          <div class="left" @click="repay">
            <span class="text">重新下单</span>
          </div>
          <div class="right" @click="continuePay"
          >继续支付：<span class="price">￥{{grouponInfo.memberPrice}}</span></div>
        </div>
      </div>
      <div class="button-block" v-else>
        <div>￥{{grouponInfo.memberPrice}}</div>
        <button class="pay"
                @click="pay">立即支付
        </button>
      </div>

    </div>
  </div>
</template>
<script>
import navBar from '@/components/NavBar';
import CourseDetail from '../components/CourseDetail.vue';
import Cookies from 'js-cookie';
import {spellGroupPayStatusDetails, existSpellGroupOrder} from '@/api/group';
import {isWeixin} from '@/utils';

export default {
  data() {
    return {
      isShowBtn: true,
      grouponInfo: {},
      spellGroupSenderId: '',
      invitedUserId: '',
      isWeixin: isWeixin(),
    };
  },
  components: {
    navBar,
    CourseDetail,
  },
  created() {
    this.existSpellGroupOrder();
  },
  methods: {
    async existSpellGroupOrder() {
      try {
        const spellGroupId = this.$route.query.spellGroupId;
        const {resultData} = await existSpellGroupOrder(1,spellGroupId);
        this.spellGroupSenderId = this.$route.query.spellGroupSenderId;
        this.invitedUserId = this.$route.query.invitedUserId;
        let grouponInfo = Cookies.get('grouponInfo');
        if (grouponInfo) {
          this.grouponInfo = JSON.parse(grouponInfo);
        }
        if (resultData) {
          this.grouponInfo.spellGroupOrderId = resultData.spellGroupOrderId; // 重新下单时/createSpellGroupOrder接口需要传
          this.grouponInfo.oid = resultData.spellGroupOrderId;
        }
      } catch (e) {
        console.log(e, 'error');
      }
    },
    repay() {
      this.grouponInfo.oid = null;
      this.pay();
    },
    continuePay() {
      this.grouponInfo.spellGroupOrderId = null;
      this.pay();
    },
    pay() {
      spellGroupPayStatusDetails(
        this.spellGroupSenderId,
        this.invitedUserId
      ).then((res) => {
        const resultData = res.resultData;
        this.grouponInfo.currPrice = this.grouponInfo.memberPrice;
        this.grouponInfo.buyType = 1;
        this.grouponInfo.spellGroupId = resultData.spellGroupId;
        this.grouponInfo.spellGroupSenderId = resultData.spellGroupSenderId;
        if (!this.grouponInfo.token) {
          this.grouponInfo.token = Cookies.get('token');
        }
        this.grouponInfo.isH5 = true;
        console.log(this.grouponInfo, 'grouponInfo');
        Cookies.set('grouponInfo', JSON.stringify(this.grouponInfo));
        this.$router.push({ path: '/groupPurchase', query: { isH5: 'y' } });
      });
    },
  },
};
</script>
<style scoped lang="less">
.check-order {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #f6f7f9;
  .order-title {
    position: relative;
    background: #fff;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
    img {
      position: absolute;
      width: 36px;
      left: 30px;
      top: 50%;
      margin-top: -18px;
    }
  }

  &.addPadding {
    padding-top: 20px;
  }

  .content {
    .tip {
      height: 60px;
      background: #FFEECD;
      font-size: 28px;
      font-weight: 500;
      color: #FF5C01;
      line-height: 60px;
      text-align: center;
    }

    .goods-info {
      box-sizing: border-box;
      background: #fff;
      display: flex;
      margin-bottom: 30px;
      height: 280px;
      padding: 30px;

      img {
        background: #eee;
        flex-shrink: 0;
        width: 220px;
        height: 220px;
        border-radius: 16px;
        margin-right: 24px;
      }

      .goods-msg {
        display: flex;
        flex-direction: column;

        flex: 1;

        .label {
          flex-shrink: 0;
          width: 140px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: 1px solid #ff5c01;
          font-size: 24px;
          color: #f9452c;
          background: none;
          border-radius: 0 20px 20px 20px;
        }

        .subject {
          width: 100%;
          flex-shrink: 0;
          height: 80px;
          text-align: left;
          font-size: 32px;
          line-height: 40px;
          font-weight: 500;
          color: #303133;
          margin: 16px 0 40px 0;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price {
          flex-shrink: 0;
          display: flex;
          color: #ff5c01;
          justify-content: space-between;
          align-items: center;
          height: 45px;

          .money-num {
            padding: 0;
            font-size: 56px;
            font-weight: 500;

            span {
              font-size: 40px;
            }
          }

          .people-num {
            font-size: 36px;
          }
        }
      }
    }

    .button-block {
      background: #f9452c;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      background: #ffffff;
      box-shadow: 0px -10px 20px 1px rgba(231, 231, 231, 0.5);

      div {
        width: 50%;
        height: 100%;
        line-height: 100px;
        padding-left: 30px;
        font-size: 56px;
        font-weight: 500;
        color: #ff5c01;
      }

      button {
        font-size: 28px;
        width: 50%;
        height: 100%;
        background: linear-gradient(90deg, #ff5c01 0%, #fe7700 100%);
        color: #fff;
      }
    }
  }

  .footer-box {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.533rem;
    width: 100%;

    .footer {
      display: flex;
      align-items: center;
      width: 680px;
      background: #ffffff;
      justify-content: space-between;
      height: 44Px;
      border-radius: 24Px;
      border: 1Px solid #FF5C01;

      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 340px;

        .text {
          font-size: 28px;
          font-weight: 400;
          color: #ED702E;
          line-height: 44Px;
          text-align: center;
        }
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 340px;
        height: 44Px;
        background: linear-gradient(90deg, #FF5C01 0%, #FE7700 100%);
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
        border-top-right-radius: 24Px;
        border-bottom-right-radius: 24Px;

        .price {
          font-size: 40px;
          line-height: 44Px;
        }
      }
    }
  }
}
</style>
