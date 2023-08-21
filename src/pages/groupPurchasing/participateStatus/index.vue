<template>
  <div class="participatory-group">
    <div>
      <div class="group-backgroup"
           :class="grouponInfo.spellGroupStatus === 1 ? 'success' : ''">
        <div class="title"
             v-if="!isWeixin">
          <span>拼团状态</span>
          <!-- <share-btn></share-btn> -->
        </div>
        <div class="member-info"
             :class="isWeixin?'addPadding':''">
          <div class="leader"
               v-if="grouponInfo.spellGroupStatus !== 1">
            <div class="leader-img"><img :src="grouponInfo.invitedUserImg"
                   alt=""></div>
            <div class="leader-name"><span>{{grouponInfo.invitedUserName}}</span>邀请你参团</div>
          </div>
          <div class="leader-success-text"
               v-if="grouponInfo.spellGroupStatus === 1">拼团成功</div>
          <div class="member">
            <div>
              <div v-if="grouponInfo.spellGroupStatus === 0">
                <p class="member-left">还差<span>{{grouponInfo.enoughNum}}</span>人，成团后自动加入</p>
                <p class="time-left">距离结束还剩<span>{{timeCountdown}}</span></p>
              </div>
              <div class="member-status"
                   v-else>
                <span v-if="grouponInfo.spellGroupStatus === 2">拼团失败</span>
                <span v-if="grouponInfo.spellGroupStatus === 1">已满<span class="num">{{grouponInfo.peopleNumber}}</span>人参团</span>
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
                         class="img-border" />
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
        <course-detail :isShowBtn="true"
                       :grouponInfo='activeInfo'></course-detail>
      </div>
      <bottom-btn :btnName="btnName"
                  @shareToBro='shareToBro'
                  :enoughNum="grouponInfo.enoughNum"></bottom-btn>
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
import CourseDetail from '../components/CourseDetail.vue';
import BottomBtn from '../components/BottomBtn.vue';
import ShareBtn from '../components/ShareButton.vue';
import Divider from '../components/Divider.vue';
import '../participatoryGroup/index.less';
import { getUserId } from '@/utils/auth';
import { spellGroupPayStatusDetails, spellGroupH5Details } from '@/api/group';
import { wxShare } from '@/utils/wxShare';
import { mapGetters } from 'vuex';
import { isWeixin } from '@/utils';
export default {
  components: { CourseDetail, BottomBtn, ShareBtn, Divider },
  data() {
    return {
      waitingImg: require('@/assets/img/waiting_img.png'),
      moreMemberImg: require('@/assets/img/more_member.png'),
      memberList: [],
      payStatus: 0, //0 等待成员入团；1拼团成功；2拼团失败
      btnName: '',
      activeInfo: {},
      grouponInfo: {},
      timeCountdown: '',
      isShowGuidance: false,
      isWeixin: isWeixin(),
    };
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
    if (this.grouponInfo.activityStatus === 1) {
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
  computed: {
    ...mapGetters(['userId']),
  },
  methods: {
    async getInfo() {
      const spellGroupSenderId = this.$route.query.spellGroupSenderId;
      const invitedUserId = this.$route.query.invitedUserId; //邀请人用户id
      try {
        const { resultData } = await spellGroupPayStatusDetails(
          spellGroupSenderId,
          invitedUserId
        );
        this.grouponInfo = resultData;
        this.memberList = this.jointArray(
          this.grouponInfo.spellGroupUsersRespDTOList,
          this.grouponInfo.enoughNum
        );
        this.changeStatus();
        this.countdwon();
      } catch (e) {
        if (e.resultCode === -1) {
          this.$router.push({
            path: '/login',
            query: {
              spellGroupId: this.$route.query.spellGroupId,
              headUserId: this.$route.query.headUserId,
              spellGroupSenderId: this.$route.query.spellGroupSenderId,
              invitedUserId: this.$route.query.invitedUserId,
              fromPage: 'spellGroup',
            },
          });
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
      } catch (e) {
        console.log(e);
      }
    },
    changeStatus() {
      if (this.grouponInfo.spellGroupStatus === 0) {
        this.btnName = 'joinAlready';
      } else if (this.grouponInfo.spellGroupStatus === 2) {
        this.btnName = 'joinFailure';
      } else {
        this.btnName = 'joinSuccess';
      }
    },
    jointArray(array, num) {
      for (let i = 0; i < num; i++) {
        let item = { userImg: '' };
        array.push(item);
      }
      return array;
    },
    shareToBro(data) {
      this.isShowGuidance = data;
    },
    closeGuidance() {
      this.isShowGuidance = false;
    },
    countdwon() {
      //请求时间与本地时间戳差值
      this.dateDiff = this.grouponInfo.nowTime * 1000 - Date.parse(new Date());
      if (this.dateDiff < 0) {
        this.dateDiff = Math.abs(this.dateDiff);
      }
      //拼团倒计时
      if (this.grouponInfo.nowTime > this.grouponInfo.spellGroupEndTime) {
        //拼团已过期
        this.grouponInfo.spellGroupStatus = 3;
        this.changeStatus();

        return;
      } else {
        this.interval(this.grouponInfo.spellGroupEndTime);
        this._ordertimer = setInterval(() => {
          this.interval(this.grouponInfo.spellGroupEndTime);
        }, 1000);
      }
    },
    interval(endDate) {
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
        this.timeCountdown = `${hours}时${minutes}分${seconds}秒`;
      }
      if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        clearInterval(this._ordertimer);
        this._ordertimer = null;
        this.grouponInfo.spellGroupStatus = 3;
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
};
</script>
 <style scoped lang="less">
.participatory-group {
  .success {
    background: linear-gradient(359deg, rgba(24, 154, 145, 0) 0%, #15c9bd 100%);
  }

  .leader-success-text {
    font-size: 48px;
    margin-bottom: 20px;
    color: #fff;
  }

  .member-status {
    margin-bottom: 60px;
    font-size: 36px;
    font-weight: 400;
    color: #333333;
    .num {
      margin: 0 5px;
      color: #ff5c01;
    }
  }
}
</style>
