import Vue from "vue";
import Router from "vue-router";

import OrderResult from '@/pages/groupPurchasing/orderResult';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/h5/",
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    /**
     * 全局页面
     */
    {
      path: "/index",
      name: "index",
      component: (resolve) => require(["@/pages/home/index"], resolve),
    },
    {
      path: "/agreement",
      name: "Agreement",
      component: (resolve) => require(["@/components/Agreement"], resolve),
    },
    {
      path: "/privacyPolicy",
      name: "PrivacyPolicy",
      component: (resolve) => require(["@/components/PrivacyPolicy"], resolve),
    },
    {
      path: "/teaAppPrivacy",
      name: "TeaAppPrivacy",
      component: (resolve) => require(["@/components/PrivacyPolicy/teaAppPrivacy"], resolve),
    },
    {
      path: "/complianceContent/:id?",
      name: "ComplianceContent",
      component: (resolve) => require(["@/pages/complianceContent/index"], resolve),
    },
    /**
     * 邀请注册
     */
    {
      path: "/pingpai/:id?",
      name: "Invite",
      component: (resolve) =>
        require(["@/pages/activities/invite/invite"], resolve),
      meta: {
        keepAlive: true,
        cacheWhenFromRoutes: ['Agreement','PrivacyPolicy','ComplianceContent']  // 此处配置的是路由的name
      }
    },
    {
      path: "/t/:id?",
      name: "ActivitySpread",
      component: (resolve) =>
        require(["@/pages/activities/ActivitySpread"], resolve),
      meta: {
        keepAlive: true,
        cacheWhenFromRoutes: ['Agreement','PrivacyPolicy','ComplianceContent']  // 此处配置的是路由的name
      }
    },
    {
      path: "/activity-order",
      name: "ActivityOrder",
      component: (resolve) =>
        require(["@/pages/activities/ActivitySpread/activityOrder"], resolve),
    },
    /**
     * 团购
     */
    {
      path: "/groupon/:id?",
      name: "groupon",
      component: (resolve) =>
        require(["@/pages/activities/groupBuying/gbDetail"], resolve),
    },
    {
      path: "/group-order",
      name: "groupOrder",
      component: (resolve) =>
        require(["@/pages/activities/groupBuying/groupOrder"], resolve),
    },
    {
      path: "/result",
      name: "result",
      component: (resolve) => require(["@/pages/result/index"], resolve),
    },
    {
      path: "/alipay",
      name: "Alipay",
      component: (resolve) => require(["@/components/Alipay"], resolve),
    },
    /**
     * 登录模块
     */
    {
      path: "/login",
      name: "Login",
      component: (resolve) => require(["@/pages/login/login"], resolve),
      meta: {
        keepAlive: true,
        cacheWhenFromRoutes: ['Agreement','PrivacyPolicy','Forget','ComplianceContent']  // 此处配置的是路由的name
      }
    },
    {
      path: "/forget",
      name: "Forget",
      component: (resolve) => require(["@/pages/login/forget"], resolve),
    },
    /**
     * 加盟校
     */
    {
      path: "/j/:id?",
      name: "j",
      component: (resolve) => require(["@/pages/dealer/index"], resolve),
    },
    /**
     * 招商加盟
     */
    {
      path: "/infojoinUs",
      name: "InfojoinUs",
      component: (resolve) => require(["@/pages/infojoinUs/index"], resolve),
    },
    /**
     * 优学松鼠
     */
    {
      path: "/joinWapUsong",
      name: "JoinWapUsong",
      component: (resolve) => require(["@/pages/joinWapUsong/index"], resolve),
    },
    /**
     * 学生端
     */
    {
      path: "/student/personal",
      name: "personal",
      component: (resolve) => require(["@/pages/student/personal"], resolve),
    },
    {
      path: "/student/set",
      name: "set",
      component: (resolve) => require(["@/pages/student/set"], resolve),
    },
    {
      path: "/student/personalData",
      name: "personalData",
      component: (resolve) =>
        require(["@/pages/student/personalData"], resolve),
    },
    {
      path: "/student/callCenter",
      name: "callCenter",
      component: (resolve) => require(["@/pages/student/callCenter"], resolve),
    },
    {
      path: "/student/exchange",
      name: "exchange",
      component: (resolve) => require(["@/pages/student/exchange"], resolve),
    },
    {
      path: "/student/exchangeRecord",
      name: "exchangeRecord",
      component: (resolve) =>
        require(["@/pages/student/exchangeRecord"], resolve),
    },
    {
      path: "/student/myTeacher",
      name: "myTeacher",
      component: (resolve) => require(["@/pages/student/myTeacher"], resolve),
    },
    {
      path: "/student/appointment",
      name: "appointment",
      component: (resolve) => require(["@/pages/student/appointment"], resolve),
    },
    {
      path: "/student/home",
      name: "home",
      component: (resolve) => require(["@/pages/student/student"], resolve),
    },
    {
      path: "/student/myCombo",
      name: "myCombo",
      component: (resolve) => require(["@/pages/student/myCombo"], resolve),
    },
    {
      path: "/student/comboShop",
      name: "comboShop",
      component: (resolve) => require(["@/pages/student/comboShop"], resolve),
    },
    {
      path: "/student/myOrder",
      name: "myOrder",
      component: (resolve) => require(["@/pages/student/myOrder"], resolve),
    },
    {
      path: "/student/myCourse",
      name: "myCourse",
      component: (resolve) => require(["@/pages/student/myCourse"], resolve),
    },
    /**
     * 微信绑定
     */
    {
      path: "/wxBind",
      name: "WxBind",
      component: (resolve) => require(["@/pages/wxBind"], resolve),
    },
    {
      path: "/vipPurchase",
      name: "VipPurchase",
      component: (resolve) => require(["@/pages/vipPurchase"], resolve),
    },
    {
      path: "/vipResult",
      name: "VipResult",
      component: (resolve) => require(["@/pages/result/vipResult"], resolve),
    },
    // 2022年度学习报告
    {
      path: "/annualLearnReport",
      name: "AnnualLearnReport",
      component: (resolve) => require(["@/pages/annualLearnReport"], resolve),
    },
    {
      path: "/learnReportCover",
      name: "LearnReportCover",
      component: (resolve) => require(["@/pages/annualLearnReport/learnReportCover"], resolve),
    },
    {
      path: "/poster",
      name: "Poster",
      component: (resolve) => require(["@/pages/annualLearnReport/poster"], resolve),
    },
    {
      path: "/annualTeacher",
      name: "AnnualTeacher",
      component: (resolve) => require(["@/pages/annualTeacher"], resolve),
    },
    /**
     * 拼团
     */
     {
      path: "/participatoryGroup",
      name: "ParticipatoryGroup",
      component: (resolve) => require(["@/pages/groupPurchasing/participatoryGroup"], resolve),
      meta:{
        title:"拼团详情"
      }
    },
    {
      path: "/participateStatus",
      name: "ParticipateStatus",
      component: (resolve) => require(["@/pages/groupPurchasing/participateStatus"], resolve),
      meta:{
        title:"拼团状态"
      }
    },
    {
      path: "/checkOrder",
      name: "CheckOrder",
      component: (resolve) => require(["@/pages/groupPurchasing/checkOrder"], resolve),
      meta:{
        title:"确认订单"
      }
    },
    {
      path: "/groupPurchase",
      name: "GroupPurchase",
      component: (resolve) => require(["@/pages/groupPurchasing/groupPurchase"], resolve),
      meta:{
        title:"支付订单"
      }
    },
    {
      path: "/orderResult",
      name: "OrderResult",
      component: OrderResult,
      meta: {
        title: "支付订单"
      }
    },
    {
      path: "/memberInvitation/:id?",
      name: "MemberInvitation",
      component: (resolve) => require(["@/pages/activities/memberInvitation"], resolve),
      meta: {
        title: "黄金会员邀请"
      }
    },
    {
      path: "/MemberDetail/:id?",
      name: "MemberDetail",
      component: (resolve) =>
        require(["@/pages/activities/memberInvitation/memberDetail"], resolve),
      meta: {
        keepAlive: true,
        cacheWhenFromRoutes: ['Agreement', 'PrivacyPolicy', 'ComplianceContent']
      }
    },
    {
      path: "/memberOrder",
      name: "MemberOrder",
      component: (resolve) =>
        require(["@/pages/activities/memberInvitation/memberOrder"], resolve),
    },
    {
      path: "/lottery",
      name: "Lottery",
      component: (resolve) =>
        require(["@/pages/lottery"], resolve),
    },
    {
      path: "/specialLottery",
      name: "SpecialLottery",
      component: (resolve) =>
        require(["@/pages/lottery/specialLottery"], resolve),
    },
    {
      path: "/testOpenProgram.html",
      name: "TestOpenProgram",
      component: (resolve) => require(["@/pages/testOpenProgram"], resolve),
    },
    {
      path: "/questionnaire",
      name: "Questionnaire",
      component: (resolve) =>
        require(["@/pages/questionnaire"], resolve),
    }
    // {
    //   path: "/aiAssess",
    //   name: "aiAssess",
    //   component: (resolve) =>
    //     require(["@/pages/aiAssess"], resolve),
    // },
    // {
    //   path: "/aiAssessRegisterResult",
    //   name: "aiAssessRegisterResult",
    //   component: (resolve) =>
    //     require(["@/pages/aiAssess/result"], resolve),
    // }
  ],
});
