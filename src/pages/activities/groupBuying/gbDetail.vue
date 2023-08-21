<template>
  <div class="gbDetail">
    <div class="gb_head">
      <img :src="grouponInfo.groupImgPath" class="banner" />
      <div class="strip_area" v-if="activeStatus === 2 || activeStatus === 4">
        <img
          class="bg"
          v-if="activeStatus === 2"
          src="../../../../static/images/groupBuying/bg.png"
        />
        <img
          class="bg"
          v-else-if="activeStatus === 4"
          src="../../../../static/images/groupBuying/bg.png"
        />
        <div class="time_tips">限时特价</div>
        <div class="time">
          截止日期：{{ grouponInfo.endTimeStr }}
        </div>
        <div class="price centerCZ">
          <span class="icon_rmb">¥</span>{{ grouponInfo.price }}
        </div>
      </div>

      <div class="strip_area" v-else>
        <img
          class="bg"
          src="../../../../static/images/groupBuying/bg_gray.png"
        />
        <template v-if="activeStatus === 1">
          <div class="time_tips not-started">活动未开始</div>
          <div class="time">售卖开始时间：{{ grouponInfo.beginTime }}</div>
        </template>
        <template v-else-if="activeStatus === 0">
          <div class="time_tips not-started">活动已结束</div>
          <div class="time">
            截止日期：{{ grouponInfo.beginTime }} -
            {{ grouponInfo.endTimeStr }}
          </div>
        </template>
        <div class="price centerCZ">
          <span class="icon_rmb">¥</span>{{ grouponInfo.price }}
        </div>
      </div>

      <div class="unpaid" v-if="message == 1">
        <span class="left">您还有未支付订单，请支付订单。</span>
        <span class="right" @click="payment">立即支付></span>
      </div>
      <div class="unpaid" v-else-if="message">
        <span class="left" v-html="message">{{ message }}</span>
      </div>

      <div class="course_info">
        <div class="price_area">
          <span class="now_price">¥{{ grouponInfo.price }}</span>
          <span class="group_logo">团购</span>
          <span class="old_price" v-if="grouponInfo.productType != 5"
            >原价¥{{ grouponInfo.productPrice }}</span
          >
          <span class="limit" v-if="grouponInfo.limitType == 1"
            >售卖限额数：{{ grouponInfo.limitCount }}</span
          >
        </div>
        <div class="course_name">{{ grouponInfo.title }}</div>
        <div class="course_msg" v-if="centreMsg">{{ centreMsg }}</div>
      </div>
    </div>

    <div class="content_area">
      <div class="content_title">团购内容</div>
      <p class="content_text" v-if="grouponInfo.phoneSubtitle">
        {{ grouponInfo.phoneSubtitle }}
      </p>
      <p class="content_text" v-else>{{ grouponInfo.subtitle }}</p>
    </div>
    <div class="invite_area">
      <div class="content_title">团购详情</div>
      <div class="invite">
        <p v-html="grouponInfo.detail">{{ grouponInfo.detail }}</p>
      </div>
    </div>

    <div class="btn_area">
      <div class="count_down" v-if="activeStatus === 2 || activeStatus === 4">
        <img
          src="../../../../static/images/groupBuying/icon_cd.png"
          class="icon_cd"
        />
        <div class="count_down_time">
          距离本期结束仅剩
          <van-count-down :time="countDownTime" @finish="finishCountDown">
            <template #default="timeData">
              <span class="time-text">{{
                `${timeData.days}天 ${timeData.hours}:${timeData.minutes}:${timeData.seconds}`
              }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="btn_box">
        <div class="share_box centerCZ" @click.stop="shareShow">
          <img
            src="../../../../static/images/groupBuying/icon_share.png"
            class="icon_share"
          />
          <div class="share_txt">分享</div>
        </div>
        <div
          class="go_btn centerCZ"
          v-if="activeStatus === 2"
          @click="checkLogin"
        >
          立即抢购
        </div>
        <div
          class="not_started_btn go_btn centerCZ"
          v-else-if="activeStatus === 1"
        >
          活动未开始
        </div>
        <div
          class="not_started_btn go_btn centerCZ"
          v-else-if="activeStatus === 0"
        >
          活动已结束
        </div>
        <div
          class="not_started_btn go_btn centerCZ"
          v-else-if="activeStatus === 4"
        >
          立即抢购
        </div>
      </div>
    </div>
    <share ref="share" @clickAction="clickAction"></share>
  </div>
</template>

<script>
import share from "../share";
import { getGrouponPromotionInfo } from "@/api/group";
import { parseTime } from "@/utils";

export default {
  components: {
    share,
  },
  data() {
    return {
      grouponInfo: {},
      giveProductMap: {},
      code: "", // 团购码
      centreMsg: "",
      oid: "", // 订单号
      grouponId: "", // id
      message: "", // 提示语
      activeStatus: null, //活动状态 0-已结束 1未开始 2开始 4置灰
      countDownTime: null,
      timer: null,
      servercurdatetime: "", //服务器时间
      timerServer: null,
      loginStatus: null, // 登录状态
    };
  },
  created() {
    /* 在 iOS 系统上倒计时不生效？
   如果你遇到了在 iOS 上倒计时不生效的问题，请确认在创建 Date 对象时没有使用new Date('2020-01-01')这样的写法，
     iOS 不支持以中划线分隔的日期格式，正确写法是new Date('2020/01/01')。*/
    this.code = this.$route.params.id;
    this.getGrouponPromotionInfo();
  },
  methods: {
    async getGrouponPromotionInfo() {
      try {
        const { resultData } = await getGrouponPromotionInfo({
          code: this.code,
        });
        this.clearTimer();
        this.grouponInfo = resultData.grouponInfo;
        this.giveProductMap = resultData.giveProductMap;
        this.oid = resultData.oid;
        this.centreMsg = resultData.centreMsg;
        this.message = resultData.message;
        this.loginStatus = resultData.loginStatus;
        this.btnStatus = resultData.btnStatus;
        this.servercurdatetime = resultData.grouponInfo.servercurdatetime;
        this.$store.dispatch('user/setRecommendCode', this.grouponInfo.agentTalkId); //推荐码
        this.timerServer = setInterval(() => {
          //服务器时间同步
          this.servercurdatetime += 1000;
        }, 1000);
        this.checkActive();
        this.grouponInfo.endTimeStr = parseTime(
          this.grouponInfo.endTime,
          "{y}-{m}-{d} {h}:{i}:{s}"
        );
      } catch (e) {
        console.log(e, "error");
      }
    },
    //查看活动状态
    checkActive() {
      const that = this;
      const beginTime=this.grouponInfo.beginTime.replace(/-/g, '/')
      const endTime=this.grouponInfo.endTime.replace(/-/g, '/')
      const timestamp1 = new Date(beginTime).getTime();
      const timestamp2 = endTime;
      if (this.servercurdatetime - timestamp1 < 0) {
        // 当前时间小于活动开始时间，活动未开始
        this.activeStatus = 1;
        activeStartCountdown();
      } else if (this.servercurdatetime - timestamp2 > 0) {
        // 当前时间大于活动结束时间，活动已结束
        this.activeStatus = 1;
      } else if (
        this.servercurdatetime - timestamp1 > 0 &&
        this.servercurdatetime - timestamp2 < 0
      ) {
        // 活动进行中,计算活动剩余时长
        this.countDownTime = this.grouponInfo.endTime - this.servercurdatetime;
        /*btnStatus-1、可预约  2、预约置灰  3、可购买  4、购买置灰*/
        if (this.btnStatus == 3) {
          this.activeStatus = 2;
        } else {
          this.activeStatus = 4;
        }
      }

      //离活动开始倒计时
      function activeStartCountdown() {
        that.timer = setTimeout(() => {
          const timestamp1 = new Date(that.grouponInfo.beginTime).getTime();
          const timestamp = that.servercurdatetime - timestamp1;
          if (timestamp >= 0) {
            // 活动开始
            that.getGrouponPromotionInfo();
            // clearTimeout(that.timer)
          } else {
            activeStartCountdown();
          }
        }, 1000);
      }
    },
    checkLogin() {
      const params = {
        grouponInfo: this.grouponInfo,
        giveProductMap: this.giveProductMap,
        oid: this.oid,
      };
      this.$store.dispatch("content/setGroupData", params).then(() => {
        if (this.loginStatus) {
          this.$router.push({ path: "/group-order" });
        } else {
          this.$router.push({ path: "/login", query: { fromPage: "groupon",code:this.code } });
        }
      });
    },
    payment() {
      const params = {
        grouponInfo: this.grouponInfo,
        giveProductMap: this.giveProductMap,
        oid: this.oid,
      };
      this.$store.dispatch("content/setGroupData", params).then(() => {
        this.$router.push({ path: "/group-order" });
      });
    },
    shareShow() {
      this.$refs.share.popShow();
    },
    clickAction() {
      const shareUrl = window.location.href;
      this.$copyText(shareUrl).then(
        (res) => {
          this.$toast("链接复制成功");
          this.shareShow();
        },
        (err) => {
          this.$toast("复制失败");
        }
      );
    },
    finishCountDown() {
      this.activeStatus = 0;
      console.log("活动已结束");
    },
    clearTimer() {
      clearInterval(this.timerServer);
      clearTimeout(this.timer);
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
};
</script>

<style>
  .gbDetail img{
    max-width: 100%;
    height: auto;
  }
</style>

<style scoped lang="less">
.gbDetail {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  padding-bottom: 4rem;
}

.gb_head {
  font-size: 0;
}

.banner {
  width: 100%;
}

.unpaid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.333rem 1.1rem;
  min-height: 2.933rem;
  font-size: 0.8rem;
  font-weight: 400;
  margin-bottom: 0.667rem;
  background: #ffffff;

  .left {
    color: #fe6604;
  }

  .right {
    color: #0087ff;
  }
}

.bg {
  width: 100%;
}

.strip_area {
  font-size: 0.8rem;
  position: relative;
}

.time_tips {
  color: #ff9209;
  font-weight: 500;
  background: #fff;
  padding: 0.03rem 0.3rem;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  border-radius: 0.27rem;
}

.not-started {
  color: #999999;
}

.time {
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
  color: #ffffff;
}

.price {
  right: 0.67rem;
  font-size: 2rem;
  color: #fff;
  font-weight: 500;
}

.icon_rmb {
  font-size: 1.33rem;
}

.course_info {
  background: #fff;
  padding: 0.8rem 1rem 1.67rem 1rem;
}

.price_area {
  position: relative;
  display: flex;
  align-items: center;
  height: 2.6rem;
}

.now_price {
  font-size: 1.87rem;
  font-weight: 500;
  color: #333333;
}

.group_logo {
  height: 1.333rem;
  font-size: 0.8rem;
  color: #fe6604;
  font-weight: 500;
  background: #ffddc7;
  padding: 0.1rem 0.4rem;
  border-radius: 0.37rem;
  margin: 0 0.7rem;
}

.old_price {
  font-size: 0.8rem;
  color: #999999;
  text-decoration: line-through;
}

.limit {
  position: absolute;
  right: 0;
  font-size: 0.8rem;
  color: #999999;
}

.course_name {
  font-size: 1.33rem;
  color: #333333;
  font-weight: 500;
  margin-top: 0.87rem;
}

.course_msg {
  font-size: 1rem;
  color: #fe6604;
  font-weight: 500;
  margin-top: 0.333rem;
}

.content_area {
  background: #fff;
  padding: 0.7rem 1.2rem 1.33rem 1.2rem;
  color: #333333;
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 0.67rem;
}

.content_title {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333333;
  line-height: 1.667rem;
}

.content_text {
  margin: 0;
  white-space: pre-wrap;
  background: #ffffff;
  font-size: 1.067rem;
  line-height: 1.267rem;
  font-weight: 400;
  color: #666666;
}

.content_area img {
  width: 100%;
  margin-top: 1.17rem;
}

.invite_area {
  padding: 0.7rem 1rem 3rem;
  margin-top: 0.7rem;
  background: #ffffff;

  .invite {
    margin-top: 1rem;
    /*padding: 0.833rem 0.667rem;*/

    img {
      margin-top: 0.833rem;
      max-width: 100%;
    }
  }
}

.btn_area {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.count_down {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fce377;
  height: 1.87rem;
  line-height: 1.87rem;
  text-align: center;
  color: #fe6604;
  font-size: 0.8rem;

  .count_down_time {
    display: flex;
    align-items: center;
    margin-left: 0.333rem;
  }

  .time-text {
    color: #fe6604;
    font-size: 0.8rem;
    line-height: 1.867rem;
    margin-left: 0.333rem;
  }
}

.icon_cd {
  width: 0.8rem;
}

.btn_box {
  position: relative;
  height: 4rem;
  background: #ffffff;
}

.icon_share {
  width: 1.2rem;
}

.share_txt {
  font-size: 0.67rem;
  color: #333333;
  margin-top: 0.27rem;
}

.share_box {
  width: 1.6rem;
  left: 1.5rem;
  text-align: center;
}

.go_btn {
  width: calc( 100% - 182px);
  height: 2.67rem;
  background: #fe6604;
  border-radius: 1.53rem;
  line-height: 2.67rem;
  text-align: center;
  right: 1.07rem;
  font-size: 0.93rem;
  color: #fff;
  font-weight: 500;
}

.not_started_btn {
  background: #999999;
}
</style>
