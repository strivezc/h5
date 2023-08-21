<template>
  <div class="groupOrder">
    <nav-bar title="支付订单"></nav-bar>
    <div class="OrderPay">
      <template v-if="grouponInfo.productType != 5">
        <div class="mb-60">
          <div class="package">
            <div class="package_name">
              <span class="left ellipsis">{{ grouponInfo.productName }}</span>
              <span class="right">x1</span>
            </div>
            <div class="package_price">
              <span class="left text">价格(元)</span>
              <div class="right">
                <!--                <span class="underline text">{{grouponInfo.productPrice || grouponInfo.originalPrice}}</span>-->
                <!--                <span class="active_price">活动价</span>-->
                <span class="price">¥{{ grouponInfo.price }}</span>
              </div>
            </div>
          </div>

          <div class="package mt-20" v-if="giveProductMap">
            <div class="package_name">
              <span class="left ellipsis">{{
                giveProductMap.productName
              }}</span>
              <span class="right">x1</span>
            </div>
            <div class="package_price">
              <span class="left text">价格(元)</span>
              <div class="right">
                <span class="underline text">{{
                  giveProductMap.oldPrice
                }}</span>
                <span class="price">免费赠送</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template
        v-if="
          grouponInfo.productType == 5 && grouponInfo.needShippingAddress == 1
        "
      >
        <div class="info">
          <p>完善收货信息</p>
          <div class="input_box">
            <van-field
              v-model="infoMap.receiverName"
              type="text"
              placeholder="请输入收件人"
            />
          </div>
          <div class="input_box">
            <van-field
              v-model="infoMap.receiverPhone"
              type="number"
              placeholder="收货手机号"
              maxlength="11"
            />
          </div>
          <div class="input_box">
            <van-field
              v-model="infoMap.receiverAddress"
              type="number"
              placeholder="收货地址"
              maxlength="11"
            />
          </div>
        </div>
        <div class="package">
          <div class="package_name">
            <span class="left ellipsis">{{ grouponInfo.productName }}</span>
            <span class="right">x1</span>
          </div>
          <div class="package_price">
            <span class="left text">价格(元)</span>
            <div class="right">
              <span class="price">¥{{ grouponInfo.price }}</span>
            </div>
          </div>
        </div>
        <div class="package mt-20" v-if="giveProductMap">
          <div class="package_name">
            <span class="left ellipsis">{{ giveProductMap.productName }}</span>
            <span class="right">x1</span>
          </div>
          <div class="package_price">
            <span class="left text">价格(元)</span>
            <div class="right">
              <span class="underline text">{{ giveProductMap.oldPrice }}</span>
              <span class="price">免费赠送</span>
            </div>
          </div>
        </div>
      </template>

      <div class="pay_method" v-if="grouponInfo.price != 0">
        <span class="title">选择支付方式</span>
        <van-radio-group v-model="payStatus">
          <van-cell-group>
            <van-cell
              clickable
              @click="payStatus = 1"
              class="pay"
              v-if="!isWeixin"
            >
              <template #title>
                <img
                  src="../../../../static/images/invite/icon_alipay.png"
                  alt=""
                />
                <span class="title">支付宝</span>
              </template>
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell clickable @click="payStatus = 2" class="pay">
              <template #title>
                <img
                  src="../../../../static/images/invite/icon_wechat.png"
                  alt=""
                />
                <span class="title">微信支付</span>
              </template>
              <template #right-icon>
                <van-radio :name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <p class="text">
          温馨提示：如果您因为其它原因中断支付，后续可以在
          “官网登录账号-套餐中心-我的订单” 继续支付
        </p>
      </div>
    </div>

    <div class="footer-box">
      <div class="footer">
        <div class="left">
          <span class="text">实付款:</span>
          <span class="price">{{ grouponInfo.price }}元</span>
        </div>
        <div class="right" @click="buyGoods" :style="disable ? 'background:rgba(0,133,255,0.3)' : ''">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from "js-cookie";
import navBar from "@/components/NavBar";
import { isWeixin, isAndroid, param2Obj } from "@/utils";
import { wxPaymentApplication, aliWapPaymentApplication,orderStatus } from "@/api";
import { buyGoods,spreadOrder } from "@/api/group";
// import {mapGetters} from "vuex";
import { wxpay } from "@/utils/wxpay";

//微信appId
const appId = 'wxbea8f303aa7fc79d'; //生产环境
// const appId = "wx1c0d57bcd9710bc2";
export default {
  name: "groupOrder",
  components: {
    navBar,
  },
  data() {
    return {
      payStatus: 1,
      grouponInfo: {},
      infoMap: {
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
      },
      giveProductMap: null,
      oid: null, // 订单Id
      promotionType: "",
      wxCode: "",
      isWeixin: false,
      disable: false,
      mwebUrl: '',
      clickId: ''
    };
  },
  created() {
    this.clickId = Cookies.get('clickId');
    console.log(this.clickId,'this.clickId ');
    let groupData = sessionStorage.getItem("groupData");
    if (groupData) {
      groupData = JSON.parse(groupData);
    }
    this.grouponInfo = groupData.grouponInfo;
    this.giveProductMap = groupData.giveProductMap;
    this.oid = groupData.oid;
    this.promotionType = this.$route.query.promotionType;

    if (isWeixin()) {
      this.getWxCode();
    } else {
      if (!this.oid) {
        this.creatOrder();
      }
    }
    if (this.$route.query.confirm === 'y') {
      this.payStatus = Number(this.$route.query.payStatus);
      this.oid = this.$route.query.oid;
      this.grouponInfo.productName = this.$route.query.productName;
      this.grouponInfo.price = this.$route.query.price;
      setTimeout(() => {
        this.$dialog.confirm({
          message: '请确认支付是否已完成',
          cancelButtonText: '已完成支付',
          cancelButtonColor: '#ee0a24',
          confirmButtonColor: '#8d8d8d',
          confirmButtonText: '支付遇到问题，重新支付',
          className: 'groupConfirm'
        }).then(() => {
          this.checkOid(1);
        }).catch(() => {
          this.checkOid();
        });
      })
    }
  },
  // computed: {
  //   ...mapGetters(['groupData'])
  // },
  methods: {
    async creatOrder() {
      if (this.grouponInfo.price == 0 && this.promotionType == 2) {
        //品牌推广0元不用调下订单接口，直接跳结果页
        // this.$router.push({ path: "/result" });
        return;
      }
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "加载中...",
        });
        let params = {
          id: this.grouponInfo.id,
          payStatus: this.payStatus,
          oid: this.oid,
          promotionType: this.promotionType ? this.promotionType : 1,
          ...this.infoMap,
        };
        let resultData=null;
        if (this.promotionType == 2) {
          if (this.clickId && this.clickId !=='undefined') {
            params.adCallId = this.clickId;
          }
          const res = await spreadOrder(params);
          resultData=res.resultData;
          this.grouponInfo.id=resultData.groupProductId;
          this.grouponInfo.groupProductId=resultData.groupProductId;
          this.grouponInfo.productName=resultData.productName;
          this.grouponInfo.price=resultData.price;
        } else {
          const res = await buyGoods(params);
          resultData=res.resultData;
        }
        if (resultData.checkStatus === 0) {
          this.disable = false;
          this.oid = resultData.oid;
        } else if (resultData.checkStatus === 2) {
          window.location.href = process.env.STUDENT_LINK; // 学生端学习大厅
        }
        this.$toast.clear();
      } catch (e) {
        this.$toast.clear();
        this.disable = false;
        console.log(e, "error");
      }
    },
    async buyGoods() {
      if (this.grouponInfo.price == 0 && this.promotionType == 2) {
        //品牌推广0元不用调下订单接口，直接跳结果页
        this.$router.push({path: "/result"});
        return;
      }
      if (this.oid) {
        this.handelPay();
      } else {
        if (this.disable) return;
        if (this.grouponInfo.price == 0 && this.promotionType == 2) {
          //品牌推广0元不用调下订单接口，直接跳结果页
          this.$router.push({path: "/result"});
          return;
        }
        this.disable=true;
        try {
          let params = {
            id: this.grouponInfo.id,
            payStatus: this.payStatus,
            oid: this.oid,
            promotionType: this.promotionType ? this.promotionType : 1,
            ...this.infoMap,
          };
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "加载中..."
          });
          let resultData=null;
          if (this.promotionType == 2) {
            if (this.clickId && this.clickId !=='undefined') {
              params.adCallId = this.clickId;
            }
            console.log(params,'params');
            const res = await spreadOrder(params);
            resultData=res.resultData;
            this.grouponInfo.id=resultData.groupProductId;
            this.grouponInfo.groupProductId=resultData.groupProductId;
            this.grouponInfo.productName=resultData.productName;
            this.grouponInfo.price=resultData.price;
          } else {
            const res = await buyGoods(params);
            resultData=res.resultData;
          }
          this.$toast.clear();
          if (resultData.checkStatus === 0) {
            this.disable = false;
            this.oid = resultData.oid;
            this.handelPay();
          } else if (resultData.checkStatus === 2) {
            console.log(resultData.checkStatus,'resultData.checkStatus');
            window.location.href = process.env.STUDENT_LINK; // 学生端学习大厅
          }
        } catch (e) {
          this.disable = false;
          // this.$toast.clear();
          console.log(e, "error");
        }
      }
    },
    async handelPay() {
      const vm = this;
      const redirectUrl = window.location.origin+window.location.pathname+'?confirm=y&payStatus='+this.payStatus+'&oid='+this.oid+'&productName='+this.grouponInfo.productName+'&price='+this.grouponInfo.price;
      let params = {
        oid: this.oid,
        subject: this.grouponInfo.productName,
        productId:
          this.grouponInfo.productId || this.grouponInfo.groupProductId,
        payMoney: this.grouponInfo.price,
        paymentType: 3,
        redirectUrl,
      };
      if (this.payStatus === 1) {
        // 支付宝H5支付
        const { resultData } = await aliWapPaymentApplication(params);
        let routerData = this.$router.resolve({
          //打开新页面，将form表单传过去，在新窗口打开。
          path: "/alipay",
          query: { htmls: resultData.orderString },
        });
        window.open(routerData.href, "_self");
      } else {
        if (isWeixin()) {
          // 微信内支付
          params.paymentType = 4;
          params.code = this.wxCode;
          console.log("微信内支付", params);
          const { resultData } = await wxPaymentApplication(params);
          console.log(resultData, "支付_res");
          wxpay(resultData, function (res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
              vm.$toast.success("支付成功!");
              setTimeout(() => {
                vm.$router.push("/result");
              }, 2000);
            } else {
              vm.$toast.fail("支付失败!");
            }
          });
        } else {
          // 微信外支付
          if (this.mwebUrl) {
            window.location.replace(this.mwebUrl);
          } else {
            // params.redirectUrl=window.location.origin+window.location.pathname+'?confirm=y';
            const { resultData } = await wxPaymentApplication(params);
            this.mwebUrl=resultData.mwebUrl;
            window.location.replace(this.mwebUrl);
          }
        }
      }
    },
    // 微信支付完查询订单状态是否已支付
    checkOid(type){
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      setTimeout(async ()=>{
        const { resultData } = await orderStatus(this.oid,0)
          this.$toast.clear();
        if (resultData && resultData.status===0) {
          this.$router.push("/result");
        } else {
          if (type===1) {
            this.buyGoods();
          } else {
            this.$router.push({path:'/result',query:{fail:'1'}});
          }
        }
      },1000)
    },
    // 获取微信code
    getWxCode() {
      this.isWeixin = true;
      this.payStatus = 2;
      // 正式环境路径
      const url = window.location.href;
      let code = param2Obj(url)["code"];
      if (code) {
        // 微信内等获取到wxCode再去获取订单id，以免刷新后重复请求
        this.wxCode = code;
        if (!this.oid) {
          this.creatOrder();
        }
        console.log(this.wxCode, "this.wxCode");
        return;
      }
      // 还未获取到wxCode先loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
      });
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    },
  },
};
</script>

<style>
  .groupConfirm .van-dialog__footer{
    display: block;
  }
  .groupConfirm .van-dialog__message{
    font-size: 34px;
  }
  .groupConfirm .van-dialog__cancel{
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
