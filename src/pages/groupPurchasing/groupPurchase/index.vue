<template>
  <div class="groupOrder">
    <nav-bar title="支付订单"
             @backAction="backAction"
             :defaultBack="false"
             v-if="!isWeixin"></nav-bar>
    <div class="OrderPay"
         :style="isWeixin?'':'paddingTop: 1.6rem'">
      <div class="mb-60">
        <div class="package">
          <div class="package_name">
            <span class="left">{{grouponInfo.spellGroupTitle || grouponInfo.spellGroupProductName}}</span>
            <span class="right">x1</span>
          </div>
          <div class="package_price">
            <span class="left text">价格(元)</span>
            <div class="right">
              <span class="price">¥{{grouponInfo.currPrice}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pay_method"
           v-if="grouponInfo.currPrice!=0">
        <span class="title">选择支付方式</span>
        <van-radio-group v-model="payStatus">
          <van-cell-group>
            <van-cell clickable
                      @click="payStatus =0"
                      v-if="!isWeixin"
                      class="pay">
              <template #title>
                <img src="../../../../static/images/invite/icon_alipay.png"
                     alt="" />
                <span class="title">支付宝</span>
              </template>
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
            <van-cell clickable
                      @click="payStatus = 1"
                      class="pay">
              <template #title>
                <img src="../../../../static/images/invite/icon_wechat.png"
                     alt="" />
                <span class="title">微信支付</span>
              </template>
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <p class="text">
          温馨提示：如果您因为其它原因中断支付，可以在此页面重新支付。
        </p>
      </div>
    </div>

    <div class="footer-box">
      <div class="footer">
        <div class="left">
          <span class="text">实付款:</span>
          <span class="price">{{grouponInfo.currPrice}}元</span>
        </div>
        <div class="right"
             @click="buyGoods"
             :style="disable ? 'background:rgba(0,133,255,0.3)' : ''">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/NavBar';
import { setToken } from '@/utils/auth';
import { isWeixin, param2Obj } from '@/utils';
import {
  createSpellGroupOrder,
  orderStatus,
  wxPaymentApplication,
  aliWapPaymentApplication,
} from '@/api';
import Cookies from 'js-cookie';
import { grouponInfo, goBack } from '@/utils/appMethod';
import { wxpay } from '@/utils/wxpay';

//微信appId
const appId = 'wxbea8f303aa7fc79d';
// const appId = 'wx1c0d57bcd9710bc2';
export default {
  name: 'GroupPurchase',
  components: {
    navBar,
  },
  data() {
    return {
      payStatus: 0,
      grouponInfo: {},
      oid: null, // 订单Id
      mwebUrl: '',
      wxCode: '',
      isWeixin: isWeixin(),
      disable: false,
    };
  },
  created() {
    if (isWeixin()) {
      this.getWxCode();
    }
    if (this.$route.query.confirm === 'y') {
      let grouponInfo = Cookies.get('grouponInfo');
      if (grouponInfo) {
        this.grouponInfo = JSON.parse(grouponInfo);
      }
      this.$store.commit('user/SET_TOKEN', this.grouponInfo.token);
      setToken(this.grouponInfo.token);
      this.oid = this.grouponInfo.oid;
      this.payStatus = 1;
      setTimeout(() => {
        this.$dialog
          .confirm({
            message: '请确认微信支付是否已完成',
            cancelButtonText: '已完成支付',
            cancelButtonColor: '#ee0a24',
            confirmButtonColor: '#8d8d8d',
            confirmButtonText: '支付遇到问题，重新支付',
            className: 'vipConfirm',
          })
          .then(() => {
            this.checkOid(1);
          })
          .catch(() => {
            this.checkOid();
          });
      });
    } else if (
      this.$route.query.isRepay === 'y' ||
      this.$route.query.isH5 === 'y'
    ) {
      let grouponInfo = Cookies.get('grouponInfo');
      if (grouponInfo) {
        this.grouponInfo = JSON.parse(grouponInfo);
      }
      this.$store.commit('user/SET_TOKEN', this.grouponInfo.token);
      setToken(this.grouponInfo.token);
      this.oid = this.grouponInfo.oid;
    } else {
      window['grouponInfo'] = (data) => {
        console.log(data, 'grouponInfo');
        if (data) {
          this.grouponInfo = JSON.parse(data);
          console.log(this.grouponInfo, 'this.grouponInfo');
          this.$store.commit('user/SET_TOKEN', this.grouponInfo.token);
          setToken(this.grouponInfo.token);
        }
      };
      grouponInfo();
    }
  },
  methods: {
    backAction() {
      if (this.$route.query.isH5 === 'y') {
        this.$router.replace({
          path: '/participatoryGroup',
          query: {
            spellGroupId: this.grouponInfo.spellGroupId,
            headUserId: this.grouponInfo.headUserId,
            spellGroupSenderId: this.grouponInfo.spellGroupSenderId,
            invitedUserId: this.grouponInfo.invitedUserId,
          },
        });
      } else {
        goBack();
      }
    },
    async buyGoods() {
      const vm = this;
      if (this.disable) return;
      if (this.grouponInfo.oid) {
        this.handelPay();
        return;
      }
      try {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        let redirectUrl;
        if (this.payStatus === 0) {
          redirectUrl = `${window.location.origin}/h5/orderResult?isSuccess=1`;
        } else {
          redirectUrl =
            window.location.origin + window.location.pathname + '?confirm=y';
        }
        let params = {
          currPrice: this.grouponInfo.currPrice,
          spellGroupProductId: this.grouponInfo.spellGroupProductId,
          productType: this.grouponInfo.productType,
          paymentType: 3,
          buyType: this.grouponInfo.buyType,
          type: this.payStatus,
          spellGroupId: this.grouponInfo.spellGroupId,
          spellGroupSenderId: this.grouponInfo.spellGroupSenderId,
          spellGroupOrderId: this.grouponInfo.spellGroupOrderId,
          redirectUrl,
        };
        if (this.isWeixin) {
          //微信内支付参数
          params.paymentType = 4;
          params.code = this.wxCode;
        }
        this.disable=true;
        const { resultData } = await createSpellGroupOrder(params);
        console.log(resultData, 'createSpellGroupOrder_res');
        this.$toast.clear();
        this.disable = false;
        this.oid = resultData.id;
        this.grouponInfo.oid = this.oid;
        Cookies.set('grouponInfo', JSON.stringify(this.grouponInfo));
        if (this.payStatus === 0) {
          // 支付宝
          let routerData = this.$router.resolve({
            //打开新页面，将form表单传过去，在新窗口打开。
            path: '/alipay',
            query: { htmls: resultData.orderString },
          });
          window.open(routerData.href, '_self');
        } else {
          if (this.isWeixin) {
            //微信平台
            wxpay(resultData, function (res) {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                vm.$toast.success('支付成功!');
                setTimeout(() => {
                  vm.$router.push('/orderResult?isSuccess=1');
                }, 2000);
              } else {
                vm.$router.push('/orderResult');
              }
            });
          } else {
            //其他平台
            window.location.href = resultData.mwebUrl;
          }
        }
      } catch (e) {
        this.disable = false;
        console.log(e, 'error');
      }
    },
    async handelPay() {
      const vm = this;
      const redirectUrl = `${window.location.origin}/h5/orderResult?isSuccess=1`;
      Cookies.set('grouponInfo', JSON.stringify(this.grouponInfo));
      let params = {
        oid: this.grouponInfo.oid,
        subject: this.grouponInfo.spellGroupProductName,
        productId: this.grouponInfo.spellGroupProductId,
        payMoney: this.grouponInfo.currPrice,
        paymentType: 3,
        orderFrom: 3,
        redirectUrl,
      };
      if (this.payStatus === 0) {
        // 支付宝H5支付
        const { resultData } = await aliWapPaymentApplication(params);
        let routerData = this.$router.resolve({
          //打开新页面，将form表单传过去，在新窗口打开。
          path: '/alipay',
          query: { htmls: resultData.orderString },
        });
        window.open(routerData.href, '_self');
      } else {
        if (isWeixin()) {

          // 微信内支付
          params.paymentType = 4;
          params.code = this.wxCode;
          console.log('微信内支付', params);
          const { resultData } = await wxPaymentApplication(params);
          console.log(resultData, '支付_res');
          wxpay(resultData, function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              vm.$toast.success('支付成功!');
              setTimeout(() => {
                vm.$router.push('/orderResult?isSuccess=1');
              }, 2000);
            } else {
              vm.$router.push('/orderResult');
            }
          });
        } else {
          // 微信外支付
          if (this.mwebUrl) {
            window.location.href = this.mwebUrl;
          } else {
            params.redirectUrl =
              window.location.origin + window.location.pathname + '?confirm=y';
            const { resultData } = await wxPaymentApplication(params);
            this.mwebUrl = resultData.mwebUrl;
            window.location.href = this.mwebUrl;
          }
        }
      }
    },
    // 获取微信code
    getWxCode() {
      if (isWeixin()) {
        this.isWeixin = true;
        this.payStatus = 1;
        // 正式环境路径
        const url = window.location.href;
        let code = param2Obj(url)['code'];
        if (code) {
          this.wxCode = code;
          console.log(this.wxCode, 'this.wxCode');
          return;
        }
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
          url
        )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      }
    },
    // 微信支付完查询订单状态是否已支付 type=1 重新支付
    async checkOid(type) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      setTimeout(async () => {
        const { resultData } = await orderStatus(this.oid, 3);
        this.$toast.clear();
        if (resultData && resultData.status === 0) {
          this.$router.push({
            path: '/orderResult',
            query: { isSuccess: '1' },
          });
        } else {
          if (type===1) {
            this.buyGoods();
          } else {
            this.$router.push({ path: '/orderResult' });
          }
        }
      }, 1000);
    },
  },
};
</script>

<style>
.vipConfirm .van-dialog__footer {
  display: block;
}
.vipConfirm .van-dialog__message {
  font-size: 34px;
}
.vipConfirm .van-dialog__cancel {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
}
</style>

<style scoped lang="less">
.groupOrder {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.OrderPay {
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  .info {
    padding: 1.333rem 1.333rem;

    .title {
      font-size: 1.067rem;
      font-weight: 500;
      color: #222325;
      line-height: 1.467rem;
      margin-top: 1rem;
    }

    .input_box {
      height: 3.3rem;
      margin-bottom: 0.67rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #e4e4e4;
      padding-right: 4.6rem;
      position: relative;
    }
  }

  .package {
    padding: 1.333rem 1.333rem;
    box-shadow: 0px 0.333rem 1.333rem 0px rgba(69, 104, 124, 0.12);
    border-radius: 0.533rem;

    .package_name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.333rem;
      border-bottom: 1px solid #eeeeee;

      .left {
        max-width: 13.333rem;
        font-size: 1.067rem;
        font-weight: 500;
        color: #222325;
        line-height: 1.467rem;
      }

      .right {
        font-size: 1.067rem;
        font-weight: 400;
        color: #8d949b;
        line-height: 1.467rem;
      }
    }

    .package_price {
      margin-top: 1.333rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text {
        font-size: 1.067rem;
        font-weight: 400;
        color: #8d949b;
        line-height: 1.467rem;
      }

      .left {
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .underline {
          text-decoration: line-through;
          margin-right: 1.2rem;
        }

        .active_price {
          width: 2.8rem;
          height: 1.2rem;
          background: #ff4874;
          border-radius: 0.533rem;
          font-size: 0.667rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2rem;
          text-align: center;
          margin-right: 1.2rem;
        }

        .price {
          font-size: 1.067rem;
          font-weight: 500;
          color: #ff4874;
          line-height: 1.467rem;
        }
      }
    }
  }

  .mb-60 {
    margin-bottom: 2rem;
  }

  .pay_method {
    .pay {
      padding: 1.067rem 0.933rem;
      margin-bottom: 1.333rem;
      margin-top: 1.333rem;
      border-radius: 0.533rem;
      border: 0.5px solid #e4e4e4;
    }

    .title {
      font-size: 1.067rem;
      font-weight: 400;
      color: #222325;
      line-height: 1.467rem;
    }

    img {
      width: 1.867rem;
      height: 1.867rem;
      margin-right: 0.533rem;
    }

    .text {
      font-size: 0.8rem;
      font-weight: 400;
      color: #8d949b;
      line-height: 1.333rem;
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
    width: 654px;
    background: #ffffff;
    justify-content: space-between;
    height: 96px;
    border-radius: 48px;
    border: 2px solid #0087ff;

    .left {
      .text {
        padding-left: 1.333rem;
        font-size: 0.933rem;
        font-weight: 400;
        color: #222325;
        line-height: 1.333rem;
        margin-right: 0.133rem;
      }

      .price {
        font-size: 1.2rem;
        font-weight: 500;
        color: #ff4874;
        line-height: 1.667rem;
      }
    }

    .right {
      width: 260px;
      height: 96px;
      background: #0087ff;
      font-size: 1.067rem;
      font-weight: 500;
      color: #ffffff;
      line-height: 96px;
      text-align: center;
      border-radius: 0px 46px 46px 0px;
    }
  }
}
</style>
