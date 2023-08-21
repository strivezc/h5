<template>
  <div>
    <nav-bar></nav-bar>
    <div class="type_area">
          <span
              v-if="isNormalLogin"
              class="type_txt1"
              :class="{ active: currentPage === 'CodeLogin' }"
              @click="switchTo('CodeLogin')"
          >验证码注册登录</span>
      <span
          v-else
          class="type_txt1"
          :class="{ active: currentPage === 'RegisterLogin' }"
          @click="switchTo('RegisterLogin')"
      >验证码注册</span>
      <template v-if="from!=='aiTest'">
        <span class="gap"></span>
        <span
            class="type_txt2"
            :class="{ active: currentPage === 'PasswordLogin' }"
            @click="switchTo('PasswordLogin')"
        >密码登录</span
        >
      </template>
    </div>
    <keep-alive>
      <component :is="currentPage" @loginAction="loginAction"></component>
    </keep-alive>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import RegisterLogin from "./components/RegisterLogin";
import PasswordLogin from "./components/PasswordLogin";
import CodeLogin from "./components/CodeLogin";
import {getGrouponPromotionInfo, spellGroupLoginStatus} from "@/api/group";

export default {
  name: "Login",
  components: {
    navBar,
    RegisterLogin,
    PasswordLogin,
    CodeLogin,
  },
  data() {
    return {
      currentPage: "PasswordLogin",
      fromPage: "", // 来自什么页面
      code: "", // 活动码
      isNormalLogin: "", // 是否普通登录页面

      headUserId: '', //拼团分享团长userId
      spellGroupId: '', //拼团活动id
      spellGroupSenderId: '', //团长发起拼团表id
      invitedUserId: '', //邀请人用户id

      registerFrom: '',
      from: '',// aiTest AI测评来源只有注册
    };
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm=>{
  //     vm.fromName=from.name;
  //   })
  // },
  created() {
    this.fromPage = this.$route.query.fromPage;
    this.currentPage = this.$route.query.currentPage;
    this.isNormalLogin = this.$route.query.isNormalLogin;
    this.registerFrom = this.$route.query.registerFrom;
    this.from = this.$route.query.from;
    this.code = this.$route.query.code;
    if (this.fromPage === 'spellGroup') {
      this.headUserId = this.$route.query.headUserId;
      this.spellGroupId = this.$route.query.spellGroupId;
      this.spellGroupSenderId = this.$route.query.spellGroupSenderId;
      this.invitedUserId = this.$route.query.invitedUserId;
    }
    //
    const pageType = this.$route.query.pageType;
    this.currentPage =
      pageType === "RegisterLogin" ? "RegisterLogin" : pageType === "CodeLogin" ? "CodeLogin" : "PasswordLogin";
  },
  methods: {
    switchTo(pageName) {
      this.currentPage = pageName;
    },
    async loginAction(data) {
      if (this.fromPage === "groupon") {
        // 团购登录需要刷新数据
        try {
          const {resultData} = await getGrouponPromotionInfo({
            code: this.code,
          });
          const params = {
            grouponInfo: resultData.grouponInfo,
            giveProductMap: resultData.giveProductMap,
            oid: resultData.oid,
          };
          this.$store.dispatch("content/setGroupData", params).then(() => {
            this.$router.push("/group-order");
          });
        } catch (e) {
          console.log(e, "error");
        }
      } else if (this.fromPage === 'spellGroup') {
        // 拼团登录后操作
        spellGroupLoginStatus(this.spellGroupSenderId,this.invitedUserId).then(res => {
          const resultData = res.resultData
          if (resultData && resultData.spellGroupStatus == 0) {
            this.$router.replace({
              path: '/checkOrder', query: {
                spellGroupId: this.spellGroupId,
                headUserId: this.headUserId,
                spellGroupSenderId: this.spellGroupSenderId,
                invitedUserId: this.invitedUserId
              }
            });
          } else {
            this.$router.replace({
              path: '/participatoryGroup',
              query: {
                spellGroupId: this.spellGroupId,
                headUserId: this.headUserId,
                spellGroupSenderId: this.spellGroupSenderId,
                invitedUserId: this.invitedUserId
              }
            });
          }
        })
      } else if (this.fromPage ==='memberInvitation') {
        await this.$router.replace('/memberInvitation')
      } else if (this.from ==='aiTest') {
        this.$router.push({path: "/result",query:{from:this.from}});
      } else {
        console.log(data, "data");
        if (data.userType == 3 || data.userType == 5 || data.userType == 9) {
          window.location.href = process.env.AGENT_LINK;
        } else if (data.userType == 0 || data.userType == 99) {
          window.location.href = process.env.ADMIN_LINK;
        } else if (data.userType == 1) {
          if (data.teaLoginInfoRespDTO.accountStatus === 2) {
            if (data.teaLoginInfoRespDTO.firstSign === 1) {
              //资料审核通过的老师非一次登录
              window.location.href = process.env.TEACHER_LINK;
            } else if (data.teaLoginInfoRespDTO.firstSign === 0) {
              window.location.href = process.env.TEACHER_CONTRACT;
            }
          } else if (
            data.teaLoginInfoRespDTO.accountStatus === 0 ||
            data.teaLoginInfoRespDTO.accountStatus === 1
          ) {
            window.location.href = process.env.TEACHER_MODIFY_LINK;
          }
        } else if (data.userType == 8) {
          window.location.href = process.env.TEACHER_AGT_LINK;
        } else {
          if(this.registerFrom==='learnReport') {
            await this.$router.replace('/learnReportCover')
          } else {
            window.location.href = process.env.STUDENT_LINK; // 学生端学习大厅
          }
        }
      }
    },
  },
};
</script>

<style scoped>
  .type_area {
    height: 2.3rem;
    margin-top: 4.5rem;
    font-size: 1.6rem;
    color: #999999;
    padding: 0 2.37rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .gap {
    width: 0.03rem;
    height: 1.27rem;
    background: #cecece;
    display: inline-block;
  }

  .type_area span {
  }

  .type_txt1 {
    font-size: 1.6rem;
    color: #999999;
    line-height: 2.233rem;
  }

  .type_txt2 {
    font-size: 1.6rem;
    color: #999999;
    line-height: 2.233rem;
  }

  .active {
    color: #333333;
    font-weight: 700;

  }

  .forget span {
    padding: 1.33rem 0;
  }
</style>
