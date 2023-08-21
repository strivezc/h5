<template>
  <div class="member-wrap">
    <div class="top-wrap">
      <img src="@/assets/img/memberInvitation/topBg.png" alt="黄金会员邀请头图背景" class="background-img">
      <div class="active-time centerSP">
        <span>活动时间:</span>
        <span class="time">{{activityInfo.activityTime}}</span>
      </div>
      <div class="title centerSP">{{activityInfo.title}}</div>
      <span class="rule" @click="showActivityRule">活动规则</span>
      <div class="marquee-wrap centerSP">
        <ul class="marquee-list" :class="{'animate-up': animateUp}">
          <li v-for="(item, index) in memberRecordList" :key="index">{{item}}</li>
        </ul>
      </div>
      <span class="tip centerSP">邀请 {{activityInfo.minNum}} 位好友即得黄金会员</span>
    </div>
    <div class="bottom-wrap">
      <div class="top-wrap">
        <img src="@/assets/img/memberInvitation/inviteBtn.png" alt="黄金会员邀请按钮" @click="inviteNow"
             class="inviteBtn">
      </div>
      <template v-if="isLogin">
        <img src="@/assets/img/memberInvitation/speed.png" class="title2">
        <div class="progress-wrap">
          <p class="title">当前邀请人数：{{activityInfo.inviteNum?activityInfo.inviteNum:0}}人</p>
          <div class="item">
            <img src="@/assets/img/memberInvitation/giftIcon.png" alt="" class="left">
            <div class="right">
<!--              <span class="top">{{activityInfo.memberPackageName}}{{activityInfo.firstPackageDays}}天</span>-->
              <span class="top">赠送延期30天 * 1份</span>
              <div class="bottom">
                <div class="progress">
                  <div class="progress-bg"></div>
                  <img src="@/assets/img/memberInvitation/progress.png" alt=""
                       :style="{'width':activityInfo.firstProgress+'%'}"
                       class="progress-icon"
                       :class="{'complete':activityInfo.firstProgress===100}">
                </div>
                <span class="text1">{{activityInfo.firstInviteNum}}/{{activityInfo.minNum}}</span>
                <span class="text2 finish-status" v-if="activityInfo.firstProgress===100">已达成</span>
                <span class="text2" v-else>未达成</span>
              </div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/img/memberInvitation/giftIcon.png" alt="" class="left">
            <div class="right">
<!--              <span class="top">{{activityInfo.memberPackageName}}{{activityInfo.secondPackageDays}}天</span>-->
              <span class="top">赠送延期30天 * {{activityInfo.maxGiveNum}}份</span>
              <div class="bottom">
                <div class="progress">
                  <div class="progress-bg"></div>
                  <img src="@/assets/img/memberInvitation/progress.png" alt=""
                       :style="{'width':activityInfo.secondProgress+'%'}"
                       class="progress-icon"
                       :class="{'complete':activityInfo.secondProgress===100}">
                </div>
                <span class="text1">{{activityInfo.secondInviteNum}}/{{activityInfo.maxNum}}</span>
                <span class="text2 finish-status" v-if="activityInfo.secondProgress===100">已达成</span>
                <span class="text2" v-else>未达成</span>
              </div>

            </div>
          </div>
          <p class="tip">邀请达成条件：{{activityInfo.content}}</p>
        </div>
      </template>
      <img src="@/assets/img/memberInvitation/title2.png" class="title2">
      <div class="content">
        <span class="title">你可以获得{{activityInfo.memberPackageName}}</span>
        <div class="tip-wrap">
          <span class="line1"></span>
          <span class="text">多邀多得,享更多会员权益</span>
          <span class="line2"></span>
        </div>
        <ul>
          <li class="li" v-for="(item,index) in memberList" :key="index">
            <img :src="item.icon" class="left-wrap" alt="">
            <div class="right-wrap">
              <p class="top-text">{{item.title}}</p>
              <span class="bottom-text">{{item.describe}}</span>
            </div>
          </li>
        </ul>
      </div>
      <img src="@/assets/img/memberInvitation/title3.png" class="title3">
      <div class="share-process">
        <img src="@/assets/img/memberInvitation/shareProcess.png" alt="" class="img">
      </div>
    </div>
    <div class="button-warp">
      <img src="@/assets/img/memberInvitation/inviteBtn.png" alt="黄金会员邀请按钮" @click="inviteNow" class="button">
    </div>

    <van-overlay :show="showRule" @click="showRule = false" :lock-scroll="false">
      <div class="active-rule-wrap" @click.stop>
        <div class="background centerSP">
          <div class="top-background"></div>
          <div class="background-img">
            <div class="tap-wrap">
              <div class="tap-text" @click="changeTap(1)">
                <span>活动规则</span>
                <span class="tap-line" v-show="activeTap===1"></span>
              </div>
              <div class="tap-text" @click="changeTap(2)">
                <span>奖励记录</span>
                <span class="tap-line" v-show="activeTap===2"></span>
              </div>
            </div>
          </div>
          <div class="rule-content" v-show="activeTap===1" v-html="activityInfo.ruleContent"></div>
          <div class="rule-content" v-show="activeTap===2">
            <ul>
              <li v-for="(item,index) in rewardRecordList" :key="index">
                <div class="text">邀请人数：{{item.inviteNum}}人</div>
                <div class="text">获得奖励：{{item.memberPackageName}}</div>
                <div class="text">奖励份数：{{item.num}}</div>
                <div class="text">奖励时间：{{item.sendTime}}</div>
              </li>
            </ul>
          </div>
          <div class="button" @click="inviteNow">立即邀请</div>
        </div>
      </div>
    </van-overlay>

    <div class="bg"></div>
    <!--canvas底图-->
    <div class="canvas-wrap" ref="canvas">
      <img :src="activityInfo.shareImg" class="img" alt="">
      <img v-if="!activityInfo.userImg || activityInfo.userImg==='default.jpg'"
           src="@/assets/img/memberInvitation/default-img.png"
           class="student-img"
           alt=""/>
      <img v-else
           class="student-img"
           :src="activityInfo.userImg"
           alt=""/>
      <span class="name">{{activityInfo.userName}}</span>
      <div id="qrcode" class="qrcode"></div>
    </div>

    <van-overlay :show="showInWeixin">
      <div class="wrapper" @click.stop>
        <img :src="imgUrl" alt="黄金会员邀请分享图" class="canvas-img centerSP">
        <p class="tip centerSP">长按图片，保存到本地相册后分享</p>
        <img src="../../../../static/images/learnReport/close.png" alt="" class="closeIcon centerSP"
             @click="showInWeixin=false">
      </div>
    </van-overlay>
  </div>
</template>

<script>
import vipIcon from '../../../assets/img/memberInvitation/vipIcon.png';
import giveBookIcon from '../../../assets/img/memberInvitation/giveBookIcon.png';
import groupIcon from '../../../assets/img/memberInvitation/groupIcon.png';
import packageDelayIcon from '../../../assets/img/memberInvitation/packageDelayIcon.png';
import previewBookIcon from '../../../assets/img/memberInvitation/previewBookIcon.png';
import html2canvas from "../../../../static/js/html2canvas.min";
import QRCode from "qrcodejs2";
import {wxShare} from '@/utils/wxShare';
import {getToken, removeToken} from '@/utils/auth';
import {checkLogin} from '@/api/user';
import {queryActivityInfo, getWxActivityDetail, queryMemberActivityReward} from '@/api';

function getDPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}

const convertToImage = (html, _this) => {
  var dom = html;
  // window.getComputedStyle 获取元素的样式
  const box = window.getComputedStyle(dom); //这个方法 介绍 https://www.runoob.com/w3cnote/window-getcomputedstyle-method.html
  // 获取DOM 节点计算后宽高  取到的内容是385.993px
  const width = box.width.replace('px', '')
  const height = box.height.replace('px', '')
  // 获取像素比
  const scaleBy = getDPR();
  // 创建自定义 canvas 元素
  const canvas = document.createElement('canvas');
  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  canvas.width = width * scaleBy;
  canvas.height = height * scaleBy;
  // 设定 canvas css宽高为 DOM 节点宽高
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  // 获取画笔
  const context = canvas.getContext('2d');
  // 将所有绘制内容放大像素比倍
  context.scale(scaleBy, scaleBy);
  var rect = dom.getBoundingClientRect(); //获取元素相对于视察的偏移量
  context.translate(-rect.left, -rect.top); //设置context位置，值为相对于视窗的偏移量负值，让图片复位
  return html2canvas(html, {
    canvas: canvas, //自定义 canvas
    useCORS: true,
    onrendered: function (canvas) {
      _this.imgUrl = canvas.toDataURL('image/jpeg', 1.0)
    },
  });
}

export default {
  data() {
    return {
      imgUrl: '',
      isLogin: getToken(),
      activeTap: 1,
      showInWeixin: false,
      showRule: false,
      animateUp: false,
      memberRecordList: [],
      timer: null,
      equityList: [
        {icon: vipIcon, title: 'VIP预约课程', describe: '黄金会员用户在有效期内可享受VIP预约课程的权益'},
        {icon: packageDelayIcon, title: '套餐延期30天', describe: '购买指定会员即可获得一次额外的套餐延期30天'},
        {icon: giveBookIcon, title: '赠送测评课', describe: '购买指定会员即可获得一节口语测评课'},
        {icon: groupIcon, title: '发起拼团享优惠价', describe: '黄金会员用户发起拼团价格比普通用户发起拼团更优惠'},
        {icon: previewBookIcon, title: '专属预览教材', describe: '您可以在不约课的情况下预览本平台内的所有的教材'},
      ],
      activityInfo: {},
      rewardRecordList: [],
      hasQrcode: false,
    };
  },
  computed: {
    memberRightsName() {
      let str = '';
      if (this.activityInfo.memberRightsName) {
        this.activityInfo.memberRightsName.forEach(item => {
          str += `${item}、`;
        });
      }
      str = str.substr(0, str.length - 1);
      return str;
    },
    memberList() {
      let arr = [];
      let memberRightsName = this.activityInfo.memberRightsName;
      if (memberRightsName && memberRightsName.length > 0) {
        const obj = {
          'VIP预约': this.equityList[0],
          '赠送延期': this.equityList[1],
          '赠送测评课': this.equityList[2],
          '发起拼团优惠价': this.equityList[3],
          '预览教材': this.equityList[4],
        }
        for (let i = 0; i < memberRightsName.length; i++) {
          if (memberRightsName[i] !== '身份标识') {
            arr.push(obj[memberRightsName[i]])
          }
        }
      }
      return arr
    },
  },
  async created() {
    await this.checkLogin();
    if (this.isLogin) {
      this.getDetailByLogin();
    } else {
      this.getDetailByNoLogin();
    }
  },
  methods: {
    async getDetailByLogin() {
      try {
        const {resultData} = await queryActivityInfo();
        this.activityInfo = resultData;
        this.registerWxShare();
        this.memberRecordList = resultData.memberRecordList
        this.timer = setInterval(this.scrollAnimate, 3000);
      } catch (e) {
        this.$toast(e.resultMessage);
        if (e.resultCode === 3 && e.resultMessage === '暂无活动,敬请期待!') {
          setTimeout(()=>{
            this.$router.replace('/index')
          },1500)
        }
      }
    },
    async getDetailByNoLogin() {
      try {
        const {resultData} = await getWxActivityDetail();
        this.activityInfo = resultData;
        this.registerWxShare();
        this.memberRecordList = resultData.memberRecordList
        this.timer = setInterval(this.scrollAnimate, 3000);
      } catch (e) {
        this.$toast(e.resultMessage);
        if (e.resultCode === 3 && e.resultMessage === '暂无活动,敬请期待!') {
          setTimeout(()=>{
            this.$router.replace('/index')
          },1500)
        }
      }
    },
    async checkLogin() {
      if (getToken()) {
        checkLogin().then(() => {
        }).catch((e) => {
          if (e.resultCode === -1) {
            removeToken('token');
            this.isLogin = '';
          }
        });
      }
    },
    registerWxShare() {
      let link='';
      if (this.isLogin) {
        link=`${window.location.origin}/h5/memberDetail?id=${encodeURIComponent(this.activityInfo.code)}`
      } else {
        link=window.location.href;
      }
      let params = {
        title: '邀好友免费获取黄金会员，非您不可！',
        desc: '好朋友就是要一起享受福利，一起进步~',
        link,
        imgUrl: 'https://www.talk915.com/h5/static/images/common/shareIcon.png',
      };
      wxShare(params);
    },
    inviteNow() {
      if (this.showRule) {
        this.showRule = false;
      }
      if (this.isLogin) {
        this.$nextTick(async () => {
          this.createQrcode();
          await convertToImage(this.$refs.canvas, this);
          setTimeout(() => {
            this.showInWeixin = true;
          })
        })
      } else {
        this.$router.push({
          path: '/login',
          query: {pageType: 'CodeLogin', isNormalLogin: '1', fromPage: 'memberInvitation', currentPage: 'CodeLogin'}
        })
      }
    },
    createQrcode() {
      if (this.hasQrcode) return;
      let url = `${window.location.origin}/h5/memberDetail?id=${encodeURIComponent(this.activityInfo.code)}`;
      new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: url
      })
      this.hasQrcode = true;
    },
    async changeTap(type) {
      this.activeTap = type;
      if (type === 2 && this.isLogin) {
        try {
          const {resultData} = await queryMemberActivityReward(this.activityInfo.activityId);
          this.rewardRecordList = resultData;
        } catch (e) {
          console.log(e, 'error');
        }
      }
    },
    showActivityRule() {
      this.showRule = true;
    },
    scrollAnimate() {
      this.animateUp = true
      setTimeout(() => {
        this.memberRecordList.push(this.memberRecordList[0])
        this.memberRecordList.shift()
        this.animateUp = false
      }, 500)
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style>
  .member-wrap #qrcode canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .member-wrap #qrcode img {
    width: 100% !important;
    height: 100% !important;
  }

  .member-wrap img {
    max-width: 100%;
    height: auto;
  }
</style>
<style scoped lang="less">
  .member-wrap {
    position: relative;

    .top-wrap {
      position: relative;

      .background-img {
        width: 100%;
        height: auto;
      }

      .active-time {
        top: 38px;
        width: 450px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        color: #FF5C01;
        font-size: 22px;
        border-radius: 60px 60px 60px 60px;
        background: #ffffff;

        .time {
          font-size: 24px;
        }
      }

      .title {
        top: 104px;
        width: 100%;
        height: 64px;
        line-height: 64px;
        font-size: 48px;
        font-weight: bold;
        color: #FFFFFF;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2500);
        text-align: center;
      }

      .rule {
        position: absolute;
        top: 38px;
        right: 0;
        width: 106px;
        height: 43px;
        line-height: 43px;
        background: #FFFFFF;
        border-radius: 22px 0px 0px 22px;
        font-size: 20px;
        color: #0087FF;
        text-align: center;
      }

      .marquee-wrap {
        top: 255px;
        width: 70%;
        height: 40px;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.4);
        margin: 0 auto;
        overflow: hidden;

        .marquee-list {
          li {
            width: 100%;
            height: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: 0 5px;
            list-style: none;
            line-height: 40px;
            text-align: center;
            color: #fff;
            font-size: 22px;
            font-weight: 400;

            .ellipsis {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .animate-up {
          transition: all 0.5s ease-in-out;
          transform: translateY(-40px);
        }
      }

      .tip {
        top: 746px;
        font-size: 28px;
        color: #FF5C01;
        line-height: 40px;
        z-index: 1;
      }
    }

    .bottom-wrap {
      position: absolute;
      top: 766px;
      background: linear-gradient(180deg, #FFCC85 0%, #FDDFB7 100%);
      opacity: 1;
      width: 100%;
      text-align: center;
      height: auto;
      padding-bottom: 200px;

      .top-wrap {
        position: relative;
        width: 100%;
        height: 182px;
        background: linear-gradient(180deg, #FFFEFE 0%, #FECD8A 100%);
        border-radius: 0px 0px 0px 0px;
        opacity: 1;

        .inviteBtn {
          margin-top: 40px;
          width: 686px;
          height: 83px;
          background: linear-gradient(90deg, #FF5C01 0%, #FE7700 100%);
          border-radius: 60px 60px 60px 60px;
          border: 4px solid #FFCD89;
          animation: switch 3s ease-out infinite;
        }

        @keyframes switch {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.8);
          }
        }
      }

      .title2 {
        margin-top: 8px;
        width: 295px;
        height: 77px;
      }

      .title3 {
        margin-top: 50px;
        width: 295px;
        height: 77px;
      }

      .progress-wrap {
        margin-top: 20px;
        margin-left: 32px;
        margin-right: 32px;
        margin-bottom: 50px;
        padding: 40px;
        padding-bottom: 20px;
        background: #FFFFFF;
        border-radius: 16px 16px 16px 16px;

        .title {
          font-size: 32px;
          font-weight: bold;
          color: #FF5C01;
          line-height: 32px;
          text-align: left;
          margin-bottom: 23px;
        }

        .item {
          display: flex;
          align-items: center;
          height: 105px;
          margin-bottom: 20px;

          .left {
            width: 75px;
            height: 75px;
            margin-right: 20px;
          }

          .right {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .top {
              font-size: 28px;
              font-weight: 500;
              color: #845320;
              line-height: 28px;
              margin-bottom: 16px;
              text-align: left;
            }

            .bottom {
              display: flex;
              align-items: center;
              position: relative;
              width: 510px;

              .progress {
                position: relative;
                width: 329px;
                height: 26px;

                .progress-icon {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 26px;
                  background: linear-gradient(90deg, #FD731D 0%, #FFC632 100%);
                  border-radius: 60px 0 0 60px;
                }

                .progress-bg {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 329px;
                  height: 26px;
                  background: #EBEEF5;
                  border-radius: 60px 60px 60px 60px;
                }

                .complete {
                  border-radius: 60px 60px 60px 60px;
                }
              }

              .text1 {
                font-size: 22px;
                font-weight: 400;
                color: #845320;
                line-height: 22px;
                margin-left: 10px;
              }

              .text2 {
                position: absolute;
                right: 0;
                font-size: 24px;
                font-weight: 400;
                color: #999999;
                line-height: 28px;
              }

              .finish-status {
                color: #FF5E01;
              }
            }
          }
        }

        .tip {
          margin-top: 25px;
          font-size: 24px;
          font-weight: 400;
          color: #666666;
          line-height: 28px;
          text-align: left;
        }
      }

      .content {
        margin-top: 20px;
        margin-left: 32px;
        margin-right: 32px;
        padding: 40px;
        padding-bottom: 20px;
        background: #FFFFFF;
        text-align: center;
        border-radius: 16px 16px 16px 16px;

        .title {
          font-size: 32px;
          font-weight: bold;
          color: #FF5C01;
          line-height: 32px;
        }

        .tip-wrap {
          display: flex;
          align-items: center;
          margin-top: 28px;

          .text {
            margin: 0 9px;
            height: 32px;
            font-size: 24px;
            color: #845320;
            line-height: 32px;
          }

          .line1 {
            width: 149px;
            height: 4px;
            background: linear-gradient(229deg, #FFDFB9 0%, #F8F8F8 100%);
            border-radius: 0px 0px 0px 0px;
          }

          .line2 {
            width: 149px;
            height: 4px;
            background: linear-gradient(229deg, #F8F8F8 0%, #FFDFB9 100%);
            border-radius: 0px 0px 0px 0px;
          }
        }

        ul {
          margin-top: 28px;

          li {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 170px;
            background: #FFF6EB;
            border-radius: 16px 16px 16px 16px;
            margin-bottom: 20px;

            &:before {
              position: absolute;
              top: 0;
              left: 0;
              display: block;
              content: '';
              background: url('../../../assets/img/memberInvitation/equity.png');
              background-size: cover;
              width: 50px;
              height: 28px;
            }

            .left-wrap {
              width: 98px;
              height: 98px;
              margin-right: 24px;
              margin-left: 40px;
            }

            .right-wrap {
              display: flex;
              flex-direction: column;
              margin-right: 40px;
              margin-top: 28px;
              margin-bottom: 28px;

              .top-text {
                font-size: 28px;
                color: #FF5C01;
                line-height: 28px;
                margin-bottom: 13px;
                text-align: left;
              }

              .bottom-text {
                font-size: 24px;
                color: #845320;
                line-height: 36px;
                text-align: left;
              }
            }
          }
        }
      }

      .share-process {
        margin-top: 20px;
        margin-left: 32px;
        margin-right: 32px;
        padding: 52px 60px;
        background: #ffffff;
        border-radius: 16px 16px 16px 16px;
        border: 2px solid #FFFFFF;

        .img {
          width: 566px;
          height: 187px;
        }
      }
    }

    .bg{
      position: fixed;
      z-index: -1;
      width: 750px;
      height: 1005px;
      background: #ffffff;
    }
    .canvas-wrap {
      position: fixed;
      z-index: -2;
      width: 750px;
      height: 1005px;
      .img {
        width: 750px;
        height: 1005px;
      }

      .student-img {
        position: absolute;
        top: 43px;
        left: 56px;
        width: 88px;
        height: 88px;
      }

      .name {
        position: absolute;
        top: 43px;
        left: 160px;
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
        line-height: 32px;
      }

      .title {
        position: absolute;
        top: 306px;
        width: 434px;
        font-size: 48px;
        font-weight: 500;
        color: #845320;
        line-height: 48px;
        text-align: center;
      }

      .text {
        position: absolute;
        top: 374px;
        width: 434px;
        font-size: 22px;
        font-weight: 400;
        color: #845320;
        line-height: 36px;
        text-align: center;
      }

      .bottom-text {
        position: absolute;
        left: 102px;
        bottom: 54px;
        font-size: 24px;
        font-weight: 400;
        color: #333333;
      }

      .qrcode {
        position: absolute;
        bottom: 44px;
        right: 91px;
        width: 108px;
        height: 108px;
      }
    }

    .wrapper {
      position: relative;
      height: 100%;

      .canvas-img {
        position: absolute;
        top: 158px;
        width: 522px;
        height: 700px;
      }

      .tip {
        position: absolute;
        bottom: 330px;
        width: 100%;
        text-align: center;
        font-size: 28px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 33px;
      }

      .closeIcon {
        position: absolute;
        bottom: 210px;
        width: 48px;
        height: 48px;
        padding: 18px;
      }
    }
  }

  .button-warp {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: #FFFFFF;

    .button {
      width: 686px;
      height: 83px;
      background: linear-gradient(90deg, #FF5C01 0%, #FE7700 100%);
      border-radius: 60px 60px 60px 60px;
      border: 4px solid #FFCD89;
    }
  }

  .active-rule-wrap {
    position: relative;

    .background {
      position: absolute;
      top: 224px;
      width: 565px;
      max-height: 832px;
      background: #FFFFFF;
      border-radius: 56px 56px 56px 56px;

      .top-background {
        background: #FEF7EA;
        width: 565px;
        height: 343px;
        opacity: 1;
        border-top-right-radius: 56px;
        border-top-left-radius: 56px;
      }

      .background-img {
        position: absolute;
        top: 0;
        width: 565px;
        height: 293px;
        background: url('../../../assets/img/memberInvitation/popupBg.png');
        background-size: cover;

        .tap-wrap {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          margin-left: 80px;
          margin-right: 80px;

          .tap-text {
            width: 170px;
            font-size: 40px;
            font-weight: 800;
            color: #845320;
            line-height: 40px;

            .tap-line {
              display: block;
              margin: auto;
              margin-top: 10px;
              width: 40px;
              height: 8px;
              background: #FE7700;
              border-radius: 60px 60px 60px 60px;
            }
          }
        }
      }

      .rule-content {
        margin: -220px 33px 40px 33px;
        text-align: justify;
        height: 540px;
        overflow-y: scroll;
        font-size: 28px;
        font-weight: 400;
        color: #333333;
        line-height: 40px;

        li {
          margin: 30px 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #E5E5E5;
          font-size: 28px;
          font-weight: 400;
          color: #333333;
          line-height: 40px;

          .text {
            margin-bottom: 10px;
          }
        }
      }

      .button {
        width: 498px;
        height: 83px;
        background: linear-gradient(90deg, #FF5C01 0%, #FE7700 100%);
        border-radius: 60px 60px 60px 60px;
        font-size: 32px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 83px;
        text-align: center;
        margin: auto;
        margin-bottom: 40px;
      }
    }
  }
</style>
