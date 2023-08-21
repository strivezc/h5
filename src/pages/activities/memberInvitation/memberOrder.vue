<template>
  <div class="groupOrder">
    <nav-bar title="支付订单" @backAction="backAction" :defaultBack="false"></nav-bar>
    <div class="OrderPay">
      <div class="mb-60">
        <div class="package">
          <div class="package_name">
            <span class="left ellipsis">{{grouponInfo.productName}}</span>
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

      <div class="pay_method" v-if="grouponInfo.currPrice!=0">
        <span class="title">选择支付方式</span>
        <van-radio-group v-model="payStatus">
          <van-cell-group>
            <van-cell clickable @click="payStatus =1" class="pay" v-if="!isWeixin">
              <template #title>
                <img src="../../../../static/images/invite/icon_alipay.png" alt=""/>
                <span class="title">支付宝</span>
              </template>
              <template #right-icon>
                <van-radio :name="1"/>
              </template>
            </van-cell>
            <van-cell clickable @click="payStatus = 2" class="pay">
              <template #title>
                <img src="../../../../static/images/invite/icon_wechat.png" alt=""/>
                <span class="title">微信支付</span>
              </template>
              <template #right-icon>
                <van-radio :name="2"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <p class="text">
          温馨提示：如果您因为其它原因中断支付，后续可以在 “官网登录账号-套餐中心-我的订单” 继续支付
        </p>
      </div>
    </div>

    <div class="footer-box">
      <div class="footer">
        <div class="left">
          <span class="text">实付款:</span>
          <span class="price">{{grouponInfo.currPrice}}元</span>
        </div>
        <div class="right" @click="buyGoods" :style="disable ? 'background:rgba(0,133,255,0.3)' : ''">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {isWeixin, isAndroid, param2Obj} from "@/utils";
import {wxPaymentApplication, aliWapPaymentApplication, createMemberActivityOrder, orderStatus} from '@/api'
import {wxpay} from "@/utils/wxpay";
import Cookies from 'js-cookie';
import {setToken} from "@/utils/auth";
import {getMemberInviteInfo, goBack} from "@/utils/appMethod";

//微信appId
const appId = 'wxbea8f303aa7fc79d';
// const appId = 'wx1c0d57bcd9710bc2';
export default {
  name: "MemberOrder",
  components: {
    navBar
  },
  data() {
    return {
      payStatus: 1,
      grouponInfo: {},
      oid: null, // 订单Id
      wxCode: '',
      isWeixin: false,
      disable: false,
      mwebUrl: ''
    };
  },
  created() {
    this.getMemberInviteInfo();
    if (this.$route.query.isH5 === 'y') {
      if (!this.grouponInfo.oid) {
        this.creatOrder();
      }
      this.getWxCode();
    } else if (this.$route.query.confirm === 'y') {
      this.payStatus = 2;
      setTimeout(() => {
        this.$dialog.confirm({
          message: '请确认微信支付是否已完成',
          cancelButtonText: '已完成支付',
          cancelButtonColor: '#ee0a24',
          confirmButtonColor: '#8d8d8d',
          confirmButtonText: '支付遇到问题，重新支付',
          className: 'activityConfirm'
        }).then(() => {
          this.checkOid(1);
        }).catch(() => {
          this.checkOid();
        });
      })
    }
  },
  methods: {
    backAction() {
      if ( Cookies.get('inApp') === 'y') {
        goBack();
      } else {
        this.$router.go(-1);
      }
    },
    getMemberInviteInfo() {
      if (this.$route.query.isH5 === 'y' || this.$route.query.confirm === 'y' || this.$route.query.isRepay === 'y') { // 不在说客App内
        let grouponInfo = Cookies.get('memberInviteInfo');
        if (grouponInfo) {
          this.grouponInfo = JSON.parse(grouponInfo);
        }
        this.$store.commit('user/SET_TOKEN', this.grouponInfo.token);
        setToken(this.grouponInfo.token);
      } else { // 说客App内
        window['getMemberInviteInfo'] = (data) => {
          console.log(data, 'data');
          if (data) {
            this.grouponInfo = JSON.parse(data);
            Cookies.set('inApp', 'y');
            console.log(this.grouponInfo, 'memberInviteInfo---data');
            this.$store.commit('user/SET_TOKEN', this.grouponInfo.token);
            setToken(this.grouponInfo.token);
          }
        }
        getMemberInviteInfo();
      }
    },
    async creatOrder() {
      if (this.disable) return;
      try {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        this.disable = true;
        const {resultData} = await createMemberActivityOrder({code: this.grouponInfo.code});
        this.$toast.clear();
        if (resultData.checkStatus === 0) {
          this.disable = false;
          this.grouponInfo.oid = resultData.oid;
          Cookies.set('memberInviteInfo', JSON.stringify(this.grouponInfo));
          if (this.grouponInfo.currPrice == 0) {
            this.$router.push({path: "/result"});
          }
        }
      } catch (e) {
        this.disable = false;
        console.log(e, 'error');
      }
    },
    async buyGoods() {
      if (this.grouponInfo.oid) {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
        });
        this.handelPay();
      } else {
        if (this.disable) return;
        try {
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
          });
          this.disable = true;
          const {resultData} = await createMemberActivityOrder({code:this.grouponInfo.code});
          this.$toast.clear();
          if (resultData.checkStatus === 0) {
            this.disable = false;
            this.grouponInfo.oid = resultData.oid;
            Cookies.set('memberInviteInfo', JSON.stringify(this.grouponInfo));
            if (this.grouponInfo.currPrice == 0) {
              this.$router.push({path: "/result"});
              return;
            }
            this.handelPay();
          }
        } catch (e) {
          this.disable = false;
          // this.$toast.clear();
          console.log(e, 'error');
        }
      }

    },
    async handelPay() {
      const vm = this;
      const redirectUrl = `${window.location.origin}/h5/result`;
      let params = {
        oid: this.grouponInfo.oid,
        subject: this.grouponInfo.productName,
        productId: this.grouponInfo.productId,
        payMoney: this.grouponInfo.currPrice,
        paymentType: 3,
        redirectUrl
      }
      if (this.payStatus === 1) { // 支付宝H5支付
        const {resultData} = await aliWapPaymentApplication(params)
        let routerData = this.$router.resolve({	//打开新页面，将form表单传过去，在新窗口打开。
          path: '/alipay',
          query: {htmls: resultData.orderString}
        });
        window.open(routerData.href, '_self');
      } else {
        if (isWeixin()) {
          // 微信内支付
          params.paymentType = 4;
          params.code = this.wxCode;
          console.log('微信内支付', params);
          const {resultData} = await wxPaymentApplication(params)
          console.log(resultData, '支付_res');
          wxpay(resultData, function (res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
              vm.$toast.success("支付成功!");
              setTimeout(() => {
                vm.$router.push('/result');
              }, 2000);
            } else {
              vm.$toast.fail("支付失败!");
            }
          })
        } else {
          // 微信外支付
          if (this.mwebUrl) {
            window.location.href = this.mwebUrl;
          } else {
            params.redirectUrl = window.location.origin + window.location.pathname + '?confirm=y';
            const {resultData} = await wxPaymentApplication(params);
            this.mwebUrl = resultData.mwebUrl;
            window.location.href = this.mwebUrl;
          }
        }
      }
    },
    // 微信支付完查询订单状态是否已支付
    async checkOid(type) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      setTimeout(async () => {
        const {resultData} = await orderStatus(this.grouponInfo.oid, 0)
        this.$toast.clear();
        if (resultData && resultData.status === 0) {
          this.$router.push("/result");
        } else {
          if (type===1) {
            this.buyGoods();
          } else {
            this.$router.push({path: '/result', query: {fail: '1', fromPage: 'memberInvitation'}});
          }
        }
      }, 1000)
    },
    // 获取微信code
    getWxCode() {
      if (isWeixin()) {
        this.isWeixin = true;
        this.payStatus = 2;
        // 正式环境路径
        const url = window.location.href;
        let code = param2Obj(url)['code'];
        if (code) {
          this.wxCode = code;
          console.log(this.wxCode, 'this.wxCode')
          return;
        }
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      }
    },
  }
}
</script>

<style>
  .activityConfirm .van-dialog__footer {
    display: block;
  }

  .activityConfirm .van-dialog__message {
    font-size: 34px;
  }

  .activityConfirm .van-dialog__cancel {
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
    padding: 1.6rem;

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
        border: .5px solid #E4E4E4;
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
    /*position: fixed;*/
    /*bottom: 0;*/
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
