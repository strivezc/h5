<template>
  <div class="lottery">
    <transition name="fade">
      <div v-show="showPage">
        <!--    <nav-bar title="抽奖活动" :showBack="inApp"></nav-bar>-->
        <teacherContact :inApp="inApp" ref="teacherContact" :detailData="detailData"
                        v-if="detailData.createrPhone || detailData.createrWxCode"></teacherContact>
        <div class="content" :style="showShare?'margin-bottom:4.667rem':'margin-bottom:0'">
          <img :src="detailData.raffleTopImg" alt="" class="banner">
          <div class="lucky_wheel_wrap">
            <div id="my-lucky"></div>
            <img src="@/assets/img/lottery/base.png" alt="" class="base_bg">
            <p class="people_num">已有{{detailData.totalRaffleNum?detailData.totalRaffleNum:0}}人参与抽奖</p>
            <img src="@/assets/img/lottery/pointer.png" alt="" class="pointer" @click="startWheel">
          </div>

          <div class="details">
            <div class="record"
                 :style="prizeRecordList.length>0?'justify-content: space-between':'justify-content: center'"
                 v-if="isLogin"><p>本次活动您还有 <span>{{detailData.surplusNum}}次</span> 抽奖机会</p>
              <span class="btn" @click="openRecord" v-if="prizeRecordList.length>0">抽奖记录</span>
            </div>
            <div class="contact" @click="openContact" v-if="detailData.createrPhone || detailData.createrWxCode">
              <div class="left">
                <img src="@/assets/img/lottery/kf.png" alt="" class="icon">
                <span>活动、奖品请联系: {{detailData.createrName}}</span>
              </div>
              <img src="@/assets/img/lottery/arrow.png" alt="" class="right">
            </div>
            <div class="card title2" v-if="myPrizeList.length>0">
              <div class="prize-wrap" v-for="(item,index) in myPrizeList" :key="index">
                <img :src="item.prizeImg" class="left" alt="">
                <div class="right">
                  <span>{{item.prizeName}}</span>
                  <span class="num">1份</span>
                </div>
              </div>
            </div>

            <div class="card title1">
              <div class="prize-wrap" style="align-items: center;" v-for="(item,index) in prizeInfoList" :key="index">
                <img :src="item.prizeImg" class="left" alt="">
                <div class="right">
                  <span>{{item.prizeName}}</span>
<!--                  <span class="num">{{item.prizeTotalNum}}份</span>-->
                </div>
              </div>
            </div>

            <div class="card title3">
              <div class="time-wrap">
                <div class="title">活动时间</div>
                <span class="text">活动时间：<br>{{detailData.activityTime}}</span>
                <span class="text">抽奖时间：<br>{{detailData.raffleTime}}</span>
              </div>
              <div class="time-wrap">
                <div class="title">活动说明</div>
                <span class="text mb-5 line-height" v-html="detailData.activityExplain">{{detailData.activityExplain}}</span>
              </div>
            </div>

            <p class="explain">*本活动最终解释权归深圳青豆教育科技有限公司所有</p>
          </div>
          <shareButton @handleClick="openSharePopup" v-if="showShare"></shareButton>
        </div>
        <LoginPopup :showPopup.sync="showPopup"
                    :isLoginAction.sync="isLoginAction"
                    @handleLogin="handleLogin"
                    @handleRegister="handleLogin"
                    ref="loginPopup">
        </LoginPopup>

        <SharePopup ref="sharePopup"
                    :shareList="shareList"
                    @clickAction="handleShare">
        </SharePopup>

        <record ref="lotteryRecord"
                @openContact="openContact"
                :detailData="detailData"
                :prizeRecordList="prizeRecordList">
        </record>

        <poster ref="poster" :inApp="inApp" :show.sync="showPoster" :code="code" :detailData="detailData"></poster>

        <result :showResult.sync="showResult"
                :status="resultStatus"
                @openRecord="openRecord(true)"
                :productName="productName"
                :productIcon="productIcon">
        </result>
      </div>
    </transition>

    <van-overlay :show="showGuidance" @click="showGuidance = false">
      <div class="showGuidance" @click="showGuidance = false">
        <img src="@/assets/img/share_guidance.png"
             alt="">
      </div>
    </van-overlay>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import LoginPopup from "@/components/LoginPopup";
import SharePopup from "@/components/SharePopup";
import shareButton from "./components/shareButton";
import result from "./components/result";
import teacherContact from "./components/teacherContact";
import record from "./components/record";
import poster from "./components/poster";
import {getPrizeActivityInfo, runActivityPrize, queryNowRaffleInfo, addMarkedPointUserClickRecord} from '@/api';
import {getToken, removeToken, setToken, setUserId, setPeopleSign} from '@/utils/auth';
import {debounce,isWeixin} from '@/utils';
import {wxShare} from '@/utils/wxShare';
import {checkLogin} from '@/api/user';
import {wxShareInApp, goBack} from "@/utils/appMethod";

let myLucky={};
export default {
  name: "SpecialLottery",
  components: {LoginPopup, SharePopup, navBar, shareButton, teacherContact, record, poster, result},
  data() {
    return {
      code: '',
      showGuidance: false,
      showResult: false,
      showPoster: false,
      resultStatus: false,
      productName: '',
      productIcon: '',
      showPage: false,
      inApp: 'y',
      isLogin: Boolean(getToken()),
      showPopup: false,
      isLoginAction: false,
      shareList:[],
      defaultConfig: {
        speed: 0.07,
        accelerationTime: 1000,
        decelerationTime: 3000,
        offsetDegree: 360 / 8 / 2
      },
      blocks: [{
        imgs: [{
          src: require('../../assets/img/lottery/wheel.png'),
          width: '22rem',
          height: '22rem',
          rotate: true
        }]
      }],
      prizes: [
        {
          fonts: [{
            text: '奖品名称',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }], imgs: [{src: require('../../assets/img/lottery/defaultPrize.png'), top: '4.1rem', width: '3rem', height: '3rem'}]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }], imgs: [{src: require('../../assets/img/lottery/defaultPrize.png'), top: '4.1rem', width: '3rem', height: '3rem'}]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{src: require('../../assets/img/lottery/defaultPrize.png'), top: '4.1rem', width: '3rem', height: '3rem'}]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{
            src: require('../../assets/img/lottery/defaultPrize.png'),
            top: '4.1rem',
            width: '3rem',
            height: '3rem'
          }]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{
            src: require('../../assets/img/lottery/defaultPrize.png'),
            top: '4.1rem',
            width: '3rem',
            height: '3rem'
          }]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{
            src: require('../../assets/img/lottery/defaultPrize.png'),
            top: '4.1rem',
            width: '3rem',
            height: '3rem'
          }]
        },
        {
          fonts: [{
            text: '奖品名称奖',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{src:require('../../assets/img/lottery/defaultPrize.png'), top: '4.1rem', width: '3rem', height: '3rem'}]
        },
        {
          fonts: [{
            text: '奖品名称',
            top: '2.25rem',
            fontColor: '#FD6D4F',
            fontSize: '0.766rem',
            lineHeight: '0.833rem',
            lengthLimit: '69%'
          }],
          imgs: [{src: require('../../assets/img/lottery/defaultPrize.png'), top: '4.1rem', width: '3rem', height: '3rem'}]
        },
      ],
      buttons: [{
        radius: '45%',
        imgs: [{
          src: require('../../assets/img/lottery/pointer.png'),
          width: '5.3rem',
          height: '7.233rem',
          top: '-4.2rem'
        }]
      }],

      isStart: false,
      isHandStart: false,
      isLuckyDoing:false,
      detailData: {},
      prizeInfoList: [],
      prizeSortList: [],
      prizeRecordList: [],

      scrollTop: 0,
      windowHeight: 0,
      scrollHeight: 0,
      showShare:true,
    };
  },
  computed: {
    myPrizeList() {
      return this.prizeRecordList.filter(item => {
        return item.prizeStatus === 0;
      })
    },
  },
  async created() {
    if (isWeixin()) {
      this.shareList=[
        {img: require('../../../static/images/common/friend.png'), text: '微信好友',value:'friend'},
        {img: require('../../../static/images/common/wechat.png'), text: '朋友圈',value:'wechat'},
        {img: require('../../../static/images/common/icon_link.png'), text: '复制链接',value:'link'},
      ]
    } else {
      this.shareList=[
        {img: require('../../../static/images/common/icon_link.png'), text: '复制链接',value:'link'},
      ]
    }
    const _this=this;
    this.code = this.$route.query.code;
    this.inApp = this.$route.query.inApp;
    if (this.inApp) {
      setUserId(this.$route.query.userId); // 埋点参数
      setPeopleSign(this.$route.query.peopleSign);  // 埋点参数
      window['getToken'] = (data) => {
        console.log(data, 'Token From App');
        this.isLogin = Boolean(data);
        this.$store.commit('user/SET_TOKEN', data);
        setToken(data);
        this.getPrizeInfoByLogin();
      }
    } else {
      await this.checkLogin();
      if (this.isLogin) {
        this.getPrizeInfoByLogin();
        if (this.$route.query.isToRaffle==='3') {
          this.openRecord();
        }
      } else {
        this.getPrizeInfoByNoLogin();
      }
    }
    // 启动转盘
    setTimeout(() => {
      this.$nextTick(() => {
        this.showPage = true
      })
      myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
        width: '22rem',
        height: '22rem',
        blocks: _this.blocks,
        prizes: _this.prizes,
        buttons: _this.buttons,
        defaultConfig:_this.defaultConfig,
        start: function () {
          // 开始游戏
          _this.startWheel();
        },
        end:function (prize) {
          _this.endCallback(prize);
        }
      })
      myLucky.play();
      this.isStart = true;
    })
    // setTimeout(()=>{
    //   window.onscroll = debounce(function () {
    //     //变量scrollTop是滚动条滚动时，距离顶部的距离
    //     _this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     //变量windowHeight是可视区的高度
    //     _this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     //变量scrollHeight是滚动条的总高度
    //     _this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //     //滚动条到底部的条件
    //     if((_this.scrollTop+_this.windowHeight) - _this.scrollHeight>= -1 ){ // 某些机型有小数点
    //       //到了这个就可以进行业务逻辑加载后台数据了
    //       if (!_this.showPopup && !_this.isLogin) {
    //         _this.showPopup=true;
    //       }
    //     }
    //   },20)
    // },300);
  },
  methods: {
    openContact(){
      this.$refs.teacherContact.showContact();
    },
    handleLogin() {
      this.isLogin = Boolean(getToken());
      if (this.isLogin) {
        this.getPrizeInfoByLogin();
      } else {
        this.getPrizeInfoByNoLogin();
      }
    },
    async checkLogin() {
      try {
        if (getToken()) {
          await checkLogin()
        }
      } catch (e) {
        if (e.resultCode === -1) {
          removeToken('token');
          this.isLogin = false;
        }
      }
    },
    async getPrizeInfoByNoLogin() {
      try {
        const {resultData} = await queryNowRaffleInfo(this.code);
        this.detailData = resultData || {};
        this.prizeInfoList = resultData.prizeInfoList;
        this.prizeSortList = resultData.prizeSortList;
        // this.prizeRecordList = resultData.prizeRecordList;
        //转盘数据插入图片和活动名称
        this.prizeSortList.forEach(i => {
          const item = this.prizeInfoList.find(j => {
            return j.prizeGrade === i.prizeNo
          })
          if (item) {
            i.prizeImg = item.prizeImg;
            i.prizeName = item.prizeName;
          } else {
            i.prizeImg = require('../../assets/img/lottery/thanksForComing.png');
            i.prizeName = '谢谢参与';
          }
        })
        this.formatWheelPrizes(); // 数据组装
        this.registerWxShare();
      } catch (e) {
        if (e.resultMessage.indexOf('下架')>-1 || e.resultMessage.indexOf('结束')>-1) {
          this.showShare=false;
        }
        console.log(e, 'error');
      }
    },
    async getPrizeInfoByLogin() {
      try {
        const {resultData} = await getPrizeActivityInfo(this.code);
        this.detailData = resultData || {};
        this.prizeInfoList = resultData.prizeInfoList;
        this.prizeSortList = resultData.prizeSortList;
        this.prizeRecordList = resultData.prizeRecordList;
        //转盘数据插入图片和活动名称
        this.prizeSortList.forEach(i => {
          const item = this.prizeInfoList.find(j => {
            return j.prizeGrade === i.prizeNo
          })
          if (item) {
            i.prizeImg = item.prizeImg;
            i.prizeName = item.prizeName;
          } else {
            i.prizeImg = require('../../assets/img/lottery/thanksForComing.png');
            i.prizeName = '谢谢参与';
          }
        })
        this.formatWheelPrizes(); // 数据组装
        this.registerWxShare();
      } catch (e) {
        if (e.resultMessage.indexOf('下架')>-1 || e.resultMessage.indexOf('结束')>-1) {
          this.showShare=false;
        }
        console.log(e, 'error');
      }
    },
    formatWheelPrizes() {
      for (let i = 0; i < this.prizeSortList.length; i++) {
        myLucky.prizes[i].fonts[0].text = this.prizeSortList[i].prizeName;
        myLucky.prizes[i].imgs[0].src = this.prizeSortList[i].prizeImg;
      }
    },
    registerWxShare() {
      let link = '';
      if (this.isLogin) {
        link = `${window.location.origin}/h5/questionnaire`; // 分享到问卷调查
      } else {
        link = `${window.location.origin}/h5/questionnaire`; // 分享到问卷调查
      }
      let params = {
        title: this.detailData.shareTitleWeb,
        desc: this.detailData.shareIntroWeb,
        link,
        imgUrl: `${window.location.origin}/h5/static/images/common/lotteryShareIcon.png`,
      };
      wxShare(params);
    },
    async refreshData(){
      try {
        const {resultData} = await getPrizeActivityInfo(this.code,true);
        this.detailData = resultData || {};
        this.prizeRecordList = resultData.prizeRecordList;
      } catch (e) {
        console.log(e, 'error');
      }
    },
    async openRecord(val) {
      if (!val) {
        addMarkedPointUserClickRecord(106107101);
      }
      await this.refreshData();
      this.$refs.lotteryRecord.popShow();
    },
    handleShare(item) {
      const params = {
        title: this.detailData.shareTitleWeb,
        desc: this.detailData.shareIntroWeb,
        link: `${window.location.origin}/h5/questionnaire`,
        imgUrl: `${window.location.origin}/h5/static/images/common/lotteryShareIcon.png`,
      };
      if (item === 'friend') {
        addMarkedPointUserClickRecord(106104102);
        if (this.inApp) {
          params.type=0;
          wxShareInApp(params);
        } else {
          this.showGuidance = true;
        }
      } else if (item === 'wechat') {
        addMarkedPointUserClickRecord(106104103);
        if (this.inApp) {
          params.type=1;
          wxShareInApp(params);
        } else {
          this.showGuidance = true;
        }
      } else if (item === 'link') {
        addMarkedPointUserClickRecord(106104104);
        this.$copyText(`${this.detailData.shareTitleWeb}${window.location.origin}/h5/questionnaire${this.detailData.shareIntroWeb}`).then(
          (res) => {
            this.$toast("链接复制成功");
            this.shareShow();
          },
          (err) => {
            this.$toast("复制失败");
          }
        );
      } else if (item === 'save') {
        addMarkedPointUserClickRecord(106104105);
        this.$refs.poster.createCanvas();
      }
    },
    openSharePopup() {
      this.$refs.sharePopup.popShow();
    },
    // 点击抽奖按钮会触发star回调
    startWheel() {
      if (this.isLuckyDoing) return;
      if (this.showGuidance || this.showResult || this.showPoster) {
        return;
      }
      if (!this.isLogin) {
        this.showPopup = true;
        return;
      }
      if (this.isStart && !this.isHandStart) {
        console.log('init');
        myLucky.init();
      }
      this.isHandStart = true;
      setTimeout(()=>{
        this.startCallback();
      })
    },
    async startCallback() {
      addMarkedPointUserClickRecord(106101101);
      // 模拟调用接口异步抽奖
      // 假设后端返回的中奖索引是0
      // 调用stop停止旋转并传递中奖索引
      try {
        this.isLuckyDoing=true;
        const {resultData} = await runActivityPrize(this.code);
        // 调用抽奖组件的play方法开始游戏
        myLucky.defaultConfig.speed = 18;
        myLucky.play();
        if (resultData===1) { //联系经销商去充值获取抽奖次数
          myLucky.init();
          this.isLuckyDoing=false;
          this.$dialog.alert({
            title: '提示',
            message: '请联系所属学习顾问，获取参与抽奖资格',
            confirmButtonText: '我知道了',
            className: 'dialogAlert'
          }).then(() => {
            addMarkedPointUserClickRecord(106102101);
          })
        } else if (resultData===2) { // 邀请新用户
          myLucky.init();
          this.isLuckyDoing=false;
        } else if (resultData===3) { // 问卷调查
          myLucky.init();
          this.isLuckyDoing = false;
          let isToRaffle = this.$route.query.isToRaffle; // 3是已完成问卷并抽完奖了
          let message = isToRaffle === '3' ? '您已完成问卷，并抽完奖项' : '您还没有抽奖资格，请填写问卷获取资格';
          let confirmButtonText = '3' ? '我知道了' : '去填写问卷';
          this.$dialog.alert({
            title: '提示',
            message,
            confirmButtonText,
            className: 'dialogAlert',
            closeOnClickOverlay: true
          }).then(() => {
            if (isToRaffle === '3') {
              //
            } else {
              this.$router.push('/questionnaire');
            }
          })
        } else {
          myLucky.stop(resultData.index); // 取得转盘的index
        }
      } catch (e) {
        console.log(e,'e');
        this.isLuckyDoing=false;
        myLucky.init();
        this.$dialog.alert({
          title: '提示',
          message: e.resultMessage || '服务繁忙!',
          confirmButtonText: '我知道了',
          className: 'dialogAlert'
        }).then(() => {
          addMarkedPointUserClickRecord(106102101);
          if (e.resultCode === -1) {
            removeToken('token');
            this.isLogin = false;
            this.showPopup = true;
          }
        })
      }
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log('endCallback');
      if (prize.fonts) {
        if (prize.fonts[0].text==='谢谢参与') {
          this.resultStatus = false;
          this.refreshData();
          this.isLuckyDoing=false;
        } else {
          this.resultStatus = true;
          this.productName = prize.fonts[0].text;
          this.productIcon = prize.imgs[0].src;
          this.refreshData();
          this.isLuckyDoing=false;
        }
        this.showResult = true;
      }
    },
  }
}
</script>

<style>
  .lottery #qrcode canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .lottery #qrcode img {
    width: 100% !important;
    height: 100% !important;
  }

  .lottery img {
    max-width: 100%;
    height: auto;
  }
</style>

<style scoped lang="less">
  /deep/ .van-overlay {
    z-index: 9;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .content {
    margin-bottom: 140px;

    .banner {
      width: 100%;
    }

    .lucky_wheel_wrap {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 822px;
      background: url(../../assets/img/lottery/bg.png) center no-repeat;
      background-size: cover;

      .base_bg {
        width: 477px;
        height: 182px;
        margin-top: -66px;
      }

      .people_num {
        width: 391px;
        height: 69px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 60px 60px 60px 60px;
        text-align: center;
        font-size: 28px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 69px;
        margin-top: -90px;
      }

      .pointer {
        position: absolute;
        top: 206px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        width: 159px;
        height: 217px;
        opacity: 0;
        /*pointer-events: none;*/
      }
    }

    .details {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #FB5253;

      .record {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 626px;
        height: 96px;
        background: #FFF2DA;
        border-radius: 24px 24px 24px 24px;
        font-size: 30px;
        font-weight: 400;
        color: #333333;
        padding: 0 30px;
        margin-bottom: 30px;

        span {
          font-size: 30px;
          color: #FB5253;
        }

        .btn {
          width: 145px;
          height: 56px;
          border-radius: 60px 60px 60px 60px;
          border: 1px solid #FB5253;
          font-size: 28px;
          color: #FB5253;
          line-height: 56px;
          text-align: center;
        }
      }

      .contact {
        background: #FFF2DA;
        border-radius: 24px 24px 24px 24px;
        width: 626px;
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        margin-bottom: 54px;

        .left {
          display: flex;
          align-items: center;
          .icon {
            width: 48px;
            height: 48px;
            margin-right: 16px;
          }

          span {
            font-size: 28px;
            color: #333333;
          }
        }

        .right {
          width: 10px;
          height: 16px;
        }
      }

      .card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;
        width: 606px;
        min-height: 145px;
        background: #FFF2DA;
        border-radius: 32px 32px 32px 32px;
        border: 1px solid #FFFFFF;
        padding: 100px 40px 10px;
        margin-bottom: 54px;

        .prize-wrap {
          display: flex;
          align-content: center;
          padding-bottom: 44px;

          .left {
            width: 100px;
            height: 100px;
            margin-right: 20px;
            border-radius: 8px;
          }

          .right {
            display: flex;
            flex-direction: column;
            width: 170px;
            font-size: 30px;
            color: #333333;
            line-height: 34px;

            .num {
              align-self: baseline;
              padding: 0 10px;
              height: 28px;
              background: rgba(255, 87, 55, 0.1);
              border-radius: 60px 60px 60px 60px;
              font-size: 22px;
              color: #FF5737;
              line-height: 28px;
              text-align: center;
              margin-top: 8px;
            }
          }
        }

        .time-wrap {
          margin-top: 40px;

          .title {
            width: 168px;
            height: 54px;
            background: #FB5843;
            border-radius: 0 60px 60px 0;
            font-size: 30px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 54px;
            text-align: center;
          }

          .text {
            display: inline-block;
            font-size: 30px;
            font-weight: 400;
            color: #333333;
            line-height: 38px;
            margin-top: 24px;
            margin-bottom: 20px;
          }
          .line-height{
            line-height: 1.4em;
          }

          .mb-50 {
            margin-bottom: 50px;
          }
        }
      }

      .title1 {
        &:before {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 308px;
          height: 55px;
          background: url(../../assets/img/lottery/title.png) center no-repeat;
          background-size: cover;
        }
      }

      .title2 {
        &:before {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 308px;
          height: 55px;
          background: url(../../assets/img/lottery/title2.png) center no-repeat;
          background-size: cover;
        }
      }

      .title3 {
        &:before {
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 308px;
          height: 55px;
          background: url(../../assets/img/lottery/title3.png) center no-repeat;
          background-size: cover;
        }
      }

      .explain {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.4);
        margin-top: -24px;
        margin-bottom: 60px;
      }
    }

  }

  .showGuidance {
    img {
      position: absolute;
      top: 30px;
      right: 0;
      width: 80%;
    }
  }
</style>
