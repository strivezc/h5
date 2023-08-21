<template>
  <div class="participatory-group">
    <div>
      <div class="wrap">
        <div class="group-backgroup">
          <div class="title"
               v-if="!isWeixin">
            <span>拼团详情</span>
            <!-- <share-btn></share-btn> -->
          </div>
          <div class="member-info"
               :class="isWeixin?'addPadding':''">
            <div class="leader">
              <div class="leader-img">
                <img v-if="groupInfo.invitedUserImg==='default.jpg'"
                     src="@/assets/img/default_img.png"
                     alt="">
                <img v-else
                     :src="groupInfo.invitedUserImg"
                     alt="">
              </div>
              <div class="leader-name"><span>{{groupInfo.invitedUserName}}</span>邀请你参团</div>
            </div>
            <div class="member">
              <div>
                <div v-if="groupInfo.spellGroupStatus === 0 || groupInfo.spellGroupStatus === 4">
                  <p class="member-left">还差<span>{{groupInfo.enoughNum}}</span>人，成团后自动加入</p>
                  <p class="time-left">距离结束还剩<span>{{timeCountdown}}</span></p>
                </div>
                <div v-else
                     class="failure">
                  <p class="join-result"
                     v-if="groupInfo.spellGroupStatus === 2||groupInfo.spellGroupStatus === 3">拼团失败</p>
                  <p class="join-result"
                     v-else-if="groupInfo.spellGroupStatus === 1">
                    已成团
                  </p>
                  <p class="join-reason"
                     v-if="groupInfo.spellGroupStatus === 2">
                    未满足成团条件
                  </p>
                  <p class="join-reason"
                     v-else-if="groupInfo.spellGroupStatus === 3">
                    拼团已过期
                  </p>
                  <p class="join-reason full"
                     v-else-if="groupInfo.spellGroupStatus === 1">
                    已有<span>{{groupInfo.peopleNumber}}</span>人参加
                  </p>
                </div>
                <div class="member-block">
                  <ul class="member-list">
                    <li v-for="(item, index) in memberList"
                        :key="index">
                      <img v-if="index == 4 && memberList.length > 5"
                           :src="moreMemberImg"
                           alt="" />
                      <img v-else-if="item.userImg==='default.jpg'"
                           src="@/assets/img/default_img.png"
                           alt="">
                      <img v-else-if="item.userImg&&item.userImg!==null&&item.userImg!=='default.jpg'"
                           :src="item.userImg"
                           alt=""
                           class="img-boder" />
                      <img v-else
                           :src="waitingImg"
                           alt="" />
                    </li>
                  </ul>
                  <div class="leader-title">团长</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="purchasing-content">
          <divider :msg="'拼团内容'"></divider>
          <course-detail :grouponInfo='activeInfo'></course-detail>
          <div class="brief-introduction-title">商品简介</div>
          <div class="brief-introduction-content"
               :class="groupInfo.activityStatus===1||groupInfo.spellGroupStatus === 2 ? 'change-bottom' : ''"
               v-html="activeInfo.productIntroduction">
          </div>
        </div>
      </div>
      <div class="bottom-tips"
           :class="groupInfo.activityStatus===1||groupInfo.spellGroupStatus == 2 || groupInfo.spellGroupStatus === 1 || groupInfo.spellGroupStatus === 3
          ? 'change-bottom'
          : ''
      ">
        到底了~
      </div>
      <template v-if="groupInfo.activityStatus===0">
        <div class="end-time-left"
             v-if="groupInfo.spellGroupStatus === 0 || groupInfo.spellGroupStatus === 4">
          <span>距离结束仅剩：<span>{{dayCountdown}}</span></span>
        </div>
      </template>
      <bottom-btn :btnName="btnName"
                  @shareToBro='shareToBro'
                  :enoughNum="groupInfo.enoughNum"
                  :memberPrice="activeInfo.memberPrice"></bottom-btn>
    </div>
    <div class="guidance"
         v-if="isShowGuidance"
         @click="closeGuidance">
      <img src="@/assets/img/share_guidance.png"
           alt="">
    </div>
  </div>
</template>
<script>
import './index.less';
import CourseDetail from '../components/CourseDetail.vue';
import BottomBtn from '../components/BottomBtn.vue';
import ShareBtn from '../components/ShareButton.vue';
import Divider from '../components/Divider.vue';
import Cookies from 'js-cookie';
import { getToken, removeToken ,getUserId} from '@/utils/auth';
import { wxShare } from '@/utils/wxShare';
import { isWeixin } from '@/utils';
import {
  spellGroupStatusDetails,
  spellGroupLoginStatus,
  spellGroupH5Details,
} from '@/api/group';

export default {
  name: 'ParticipatoryGroup',
  components: {
    CourseDetail,
    BottomBtn,
    Divider,
    ShareBtn,
  },
  async created() {
    let getInfo = this.getInfo();
    let getDetail = this.getDetail();
    await getInfo;
    await getDetail;
    if (getToken()) {
      //如果是已登录用户，则分享人id为已登录用户id
      var shareInvitedUserId = getUserId();
    } else {
      var shareInvitedUserId = this.$route.query.invitedUserId;
    }
    if (this.groupInfo.activityStatus === 1) {
      //不在优惠期
      var activeTitle = this.activeInfo.shareTitle;
      var activeDesc = this.activeInfo.shareIntroduction;
    } else {
      var activeTitle = this.activeInfo.activityShareTitle;
      var activeDesc = this.activeInfo.activityShareIntroduction;
    }
    let params = {
      title: activeTitle,
      desc: activeDesc,
      link: `${process.env.API_ROOT}/h5/participatoryGroup?spellGroupId=${this.$route.query.spellGroupId}&headUserId=${this.$route.query.headUserId}&spellGroupSenderId=${this.$route.query.spellGroupSenderId}&invitedUserId=${shareInvitedUserId}`,
      imgUrl: this.activeInfo.commodityPicture,
    };
    wxShare(params);
  },
  data() {
    return {
      waitingImg: require('@/assets/img/waiting_img.png'),
      moreMemberImg: require('@/assets/img/more_member.png'),
      btnName: '',
      memberList: [],
      isShowGuidance: false,
      _ordertimer: null,
      _activetimer: null,
      dateDiff: 0,
      timeCountdown: '00时00分00秒',
      dayCountdown: '00天00时00分00秒',
      groupInfo: {
        //0待成团(本人未参加)；1已成团；2拼团失败（不满足参团条件）；3拼团失败（活动已下架）；4待成团（本人已参与）
      },
      activeInfo: {},
      isShowGuidance: false,
      isWeixin: isWeixin(),
    };
  },
  methods: {
    async getInfo() {
      const spellGroupSenderId = this.$route.query.spellGroupSenderId;
      const invitedUserId = this.$route.query.invitedUserId; //邀请人用户id
      try {
        if (getToken()) {
          //已登录状态
          var { resultData } = await spellGroupLoginStatus(
            spellGroupSenderId,
            invitedUserId
          );
        } else {
          //未登录状态
          var { resultData } = await spellGroupStatusDetails(
            spellGroupSenderId,
            invitedUserId
          );
        }
        this.groupInfo = resultData;
        this.memberList = this.jointArray(
          this.groupInfo.spellGroupUsersRespDTOList,
          this.groupInfo.enoughNum
        );
        this.changeStatus();
        this.countdwon();
      } catch (e) {
        console.log(e);
        if (e.resultCode === -1) {
          removeToken();
          this.getInfo();
        }
      }
    },
    async getDetail() {
      try {
        const spellGroupId = this.$route.query.spellGroupId; //拼团活动id
        const spellGroupSenderId = this.$route.query.spellGroupSenderId;
        const activeInfoRes = await spellGroupH5Details(
          spellGroupSenderId,
          spellGroupId
        );
        this.activeInfo = activeInfoRes.resultData;
        this.activeInfo.headUserId = this.$route.query.headUserId;
        this.activeInfo.invitedUserId = this.$route.query.invitedUserId;
        this.setGrouponInfo(JSON.stringify(this.activeInfo));
      } catch (e) {
        console.log(e);
      }
    },
    setGrouponInfo(data, ignoreKey) {
      if (data) {
        let grouponInfo = JSON.parse(data);
        grouponInfo['productIntroduction'] = null;
        grouponInfo['promptContent'] = null;
        Cookies.set('grouponInfo', JSON.stringify(grouponInfo));
      }
    },
    jointArray(array, num) {
      for (let i = 0; i < num; i++) {
        let item = { userImg: '' };
        array.push(item);
      }
      return array;
    },
    changeStatus() {
      if (this.groupInfo.spellGroupStatus === 0) {
        this.btnName = 'joinWaiting';
      } else if (this.groupInfo.spellGroupStatus === 4) {
        this.btnName = 'joinAlready';
      } else {
        this.btnName = 'joinFailure';
      }
    },
    showGuidance() {
      this.isShowGuidance = true;
    },
    closeGuidance() {
      this.isShowGuidance = false;
    },
    shareToBro(data) {
      this.isShowGuidance = data;
    },
    countdwon() {
      if (this.groupInfo.spellGroupStatus === 0 || this.groupInfo.spellGroupStatus === 4) {
        //请求时间与本地时间戳差值
        this.dateDiff = this.groupInfo.nowTime * 1000 - Date.parse(new Date());
        if (this.dateDiff < 0) {
          this.dateDiff = Math.abs(this.dateDiff);
        }

        //拼团倒计时
        if (this.groupInfo.nowTime > this.groupInfo.spellGroupEndTime) {
          //拼团已过期
          this.groupInfo.spellGroupStatus = 3;
          this.changeStatus();
          return;
        } else {
          this.interval(this.groupInfo.spellGroupEndTime, 1);
          this._ordertimer = setInterval(() => {
            this.interval(this.groupInfo.spellGroupEndTime, 1);
          }, 1000);
        }

        //活动倒计时
        if (this.groupInfo.nowTime > this.groupInfo.activityEndTime) {
          return;
        } else {
          this.interval(this.groupInfo.activityEndTime, 2);
          this._activetimer = setInterval(() => {
            this.interval(this.groupInfo.activityEndTime, 2);
          }, 1000);
        }
      }
    },
    interval(endDate, type) {
      let countTime = endDate * 1000 - Date.parse(new Date()) + this.dateDiff;
      let days = parseInt(countTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      let hours = parseInt((countTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
      let minutes = parseInt((countTime / 1000 / 60) % 60, 10); //计算剩余的分钟
      let seconds = parseInt((countTime / 1000) % 60, 10); //计算剩余的秒数
      days = this.checkTime(days);
      hours = this.checkTime(hours);
      minutes = this.checkTime(minutes);
      seconds = this.checkTime(seconds);

      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        type === 1
          ? (this.timeCountdown = `${hours}时${minutes}分${seconds}秒`)
          : (this.dayCountdown = `${days}天${hours}时${minutes}分${seconds}秒`);
      }
      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(this._ordertimer);
        this._ordertimer = null;
        clearInterval(this._activetimer);
        this._activetimer = null;
        this.groupInfo.spellGroupStatus = 3;
        this.changeStatus();
      }
    },
    checkTime(i) {
      if (i < 10) {
        return '0' + i;
      }
      return i;
    },
  },
  beforeDestroy() {
    if (this._ordertimer) {
      clearInterval(this._ordertimer);
      clearInterval(this._activetimer);
    }
  },
};
</script>
