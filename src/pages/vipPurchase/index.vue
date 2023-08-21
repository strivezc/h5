<template>
  <div class="groupOrder">
    <nav-bar title="支付订单" @backAction="backAction" :defaultBack="false"></nav-bar>
    <div class="OrderPay">
      <div class="mb-60">
        <div class="package">
          <div class="package_name">
            <span class="left">{{productInfo.memberPackageName?productInfo.memberPackageName:formatMemberType(productInfo.memberType)}}</span>
            <span class="right">x{{productInfo.buyNum?productInfo.buyNum:1}}</span>
          </div>
          <div class="package_price">
            <span class="left text">价格(元)</span>
            <div class="right">
              <span class="price">¥{{productInfo.currPrice}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pay_method" v-if="productInfo.currPrice!=0">
        <span class="title">选择支付方式</span>
        <van-radio-group v-model="payStatus">
          <van-cell-group>
            <van-cell clickable @click="payStatus =0" class="pay">
              <template #title>
                <img src="../../../static/images/invite/icon_alipay.png" alt=""/>
                <span class="title">支付宝</span>
              </template>
              <template #right-icon>
                <van-radio :name="0"/>
              </template>
            </van-cell>
            <van-cell clickable @click="payStatus = 1" class="pay">
              <template #title>
                <img src="../../../static/images/invite/icon_wechat.png" alt=""/>
                <span class="title">微信支付</span>
              </template>
              <template #right-icon>
                <van-radio :name="1"/>
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
          <span class="price">{{productInfo.currPrice}}元</span>
        </div>
        <div class="right" @click="buyGoods" :style="disable ? 'background:rgba(0,133,255,0.3)' : ''">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {setToken} from "@/utils/auth";
import {createMemberOrder,orderStatus} from '@/api'
import Cookies from 'js-cookie';
import {getMemberInfo,goBack} from "@/utils/appMethod";

//微信appId
// const appId = 'wxbea8f303aa7fc79d';
// const appId = 'wx1c0d57bcd9710bc2';
export default {
  name: "VipPurchase",
  components: {
    navBar
  },
  data() {
    return {
      payStatus: 0,
      productInfo: {},
      oid: null, // 订单Id
      // wxCode: '',
      disable:false,
    };
  },
  created() {
    if (this.$route.query.confirm==='y') {
      let productInfo = Cookies.get('productInfo');
      if (productInfo) {
        this.productInfo = JSON.parse(productInfo);
      }
      this.$store.commit('user/SET_TOKEN', this.productInfo.token);
      setToken(this.productInfo.token);
      this.oid = this.productInfo.oid;
      this.payStatus=1;
      setTimeout(()=>{
        this.$dialog.confirm({
          message: '请确认微信支付是否已完成',
          cancelButtonText:'已完成支付',
          cancelButtonColor:'#ee0a24',
          confirmButtonColor:'#8d8d8d',
          confirmButtonText:'支付遇到问题，重新支付',
          className:'vipConfirm'
        }).then(()=>{
          this.buyGoods();
        }).catch(()=>{
          this.checkOid();
        });
      })
    } else if (this.$route.query.isRepay==='y') {
      let productInfo = Cookies.get('productInfo');
      if (productInfo) {
        this.productInfo = JSON.parse(productInfo);
      }
      this.$store.commit('user/SET_TOKEN', this.productInfo.token);
      setToken(this.productInfo.token);
      this.oid = this.productInfo.oid;
    } else {
      window['getMemberInfo'] = (data) => {
        console.log(data, 'data');
        if (data) {
          this.productInfo = JSON.parse(data);

          console.log(this.productInfo, 'this.productInfo');
          this.$store.commit('user/SET_TOKEN', this.productInfo.token);
          setToken(this.productInfo.token);
        }
      }
      getMemberInfo();
    }
  },
  methods: {
    backAction() {
      goBack();
    },
    async buyGoods() {
      if (this.disable) return ;
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        let redirectUrl;
        if (this.payStatus === 0) {
          redirectUrl=`${window.location.origin}/h5/vipResult`;
        } else {
          redirectUrl=window.location.origin+window.location.pathname+'?confirm=y';
        }
        let params = {
          currPrice: this.productInfo.currPrice,
          oldPrice: this.productInfo.oldPrice,
          memberPackageId: this.productInfo.memberPackageId,
          memberType: this.productInfo.memberType,
          paymentType: 3,
          type: this.payStatus,
          buyNum: this.productInfo.buyNum ? this.productInfo.buyNum : 1,
          redirectUrl
        }
        const {resultData} = await createMemberOrder(params);
        this.$toast.clear();
        this.disable=false;
        this.oid=resultData.id;
        this.productInfo.oid=this.oid;
        Cookies.set('productInfo',JSON.stringify(this.productInfo));
        if (this.payStatus === 0) {
          let routerData = this.$router.resolve({	//打开新页面，将form表单传过去，在新窗口打开。
            path: '/alipay',
            query: {htmls: resultData.orderString}
          });
          window.open(routerData.href, '_self');
          // window.location.href=routerData.href;
        } else {
          // window.location.replace(resultData.mwebUrl);
          window.location.href=resultData.mwebUrl;
        }
      } catch (e) {
        this.disable=false;
        // this.$toast.clear();
        console.log(e, 'error');
      }
    },
    // 微信支付完查询订单状态是否已支付
    async checkOid(){
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      setTimeout(async ()=>{
        const { resultData } = await orderStatus(this.oid,2)
        this.$toast.clear();
        if (resultData && resultData.status===0) {
          this.$router.push("/vipResult");
        } else {
          this.$router.push({path:'/vipResult',query:{fail:'1'}});
        }
      },1000)
    },
    formatMemberType(val){
      if (val==1) {
        return '7天套餐';
      } else if (val==2) {
        return '半年套餐';
      } else if (val==3) {
        return '一年套餐';
      }
      return '';
    },
  }
}
</script>

<style>
  .vipConfirm .van-dialog__footer{
    display: block;
  }
  .vipConfirm .van-dialog__message{
    font-size: 34px;
  }
  .vipConfirm .van-dialog__cancel{
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
