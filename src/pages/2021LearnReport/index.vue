<template>
  <div class="report-wrap">
    <nav-bar @backAction="backAction" :defaultBack="false"></nav-bar>
    <div class="content">
      <component :is="curPage" :learnReportData="learnReportData"></component>
    </div>
    <footer class="footer">
      <span class="text">说客英语APP首页<br>查看【年度学习报告】</span>
    </footer>
    <img src="../../../static/images/2021LearnReport/row.gif" class="row-gif" alt="" @click="jumpPage(routeObj[curPage])"
         v-if="curPage!=='reportShare' && !learnReportData.newStu && !learnReportData.noData">
    <img src="../../../static/images/2021LearnReport/6.png" class="mask" alt="">
  </div>
</template>

<script>
import navBar from "./components/NavBar";
import Cookies from 'js-cookie';
import {debounce} from "@/utils";
import userType from './components/userType';
import mainData from './components/mainData';
import courseData from './components/courseData';
import teacherData1 from './components/teacherData1';
import teacherData2 from './components/teacherData2';
import reportShare from './components/reportShare';

export default {
  name: "AnnualLearnReport",
  components: {
    navBar, userType, mainData, courseData, teacherData1, teacherData2, reportShare
  },
  data() {
    return {
      curPage: '',
      startPosition: {},
      endPosition: {},
      deltaY: null,
      scrollTop: 0,
      windowHeight: 0,
      scrollHeight: 0,
      isEnd: false,
      learnReportData: {},
    };
  },
  computed: {
    routeObj() {
      return {
        userType: 'mainData',
        mainData: 'courseData',
        courseData: 'teacherData1',
        teacherData1: 'teacherData2',
        teacherData2: 'reportShare',
      }

    },
    routeObj2() {
      return {
        mainData: 'userType',
        courseData: 'mainData',
        teacherData1: 'courseData',
        teacherData2: 'teacherData1',
        reportShare: 'teacherData2',
      }
    },
  },
  created() {
    const learnReportData = Cookies.get('learnReportData');
    if (learnReportData) {
      this.learnReportData = JSON.parse(learnReportData);
      console.log(this.learnReportData, 'this.learnReportData');
    }
    const curPage = Cookies.get('curPage');
    this.curPage = curPage ? curPage : 'userType';
    let _this = this;
    window.onscroll = function () {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      _this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      _this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      _this.scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      // if(_this.scrollTop+_this.windowHeight == _this.scrollHeight){
      //   //到了这个就可以进行业务逻辑加载后台数据了
      //   _this.footerText = '我是有底线的';
      //   console.log("到了底部");
      // }
    }
    document.addEventListener('touchstart', this.touch, false);
    document.addEventListener('touchmove', debounce(this.touch, 5, true), false);
    document.addEventListener('touchend', this.touch, false);
  },
  methods: {
    resetScroll() {
      this.deltaY = 0;
    },
    touch(e) {
      if (this.curPage === 'reportShare') return;
      if (this.learnReportData.newStu || this.learnReportData.noData) return;
      const event = e || e.event;
      switch (event.type) {
        case "touchstart":
          // console.log(parseInt(this.scrollTop + this.windowHeight),'this.scrollTop + this.windowHeight');
          // console.log(this.scrollTop + this.windowHeight,'this.scrollTop + this.windowHeight');
          // console.log(parseInt(this.scrollHeight),'parseInt(this.scrollHeight)');
          // this.isEnd = Math.ceil(this.scrollTop + this.windowHeight) == parseInt(this.scrollHeight);
          console.log((this.scrollHeight - (this.scrollTop + this.windowHeight)), '(this.scrollHeight-(this.scrollTop + this.windowHeight))');
          this.isEnd = (this.scrollHeight - (this.scrollTop + this.windowHeight)) <= 2; //防止某些设备滑动误差
          const touch1 = event.touches[0];
          this.startPosition = {
            x: touch1.pageX,
            y: touch1.pageY
          }
          break;
        case "touchend":
          console.log('touchend');
          if (this.isEnd) {
            if (this.deltaY < -80) {
              console.log("到了底部");
              this.jumpPage(this.routeObj[this.curPage])
            }
          }
          break;
        case "touchmove":
          const touch2 = event.touches[0];
          this.endPosition = {
            x: touch2.pageX,
            y: touch2.pageY
          }
          this.deltaY = this.endPosition.y - this.startPosition.y;
          break;
      }
    },
    jumpPage(curPage) {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
      this.curPage = curPage;
      console.log(this.curPage, 'this.curPage');
      Cookies.set('curPage', this.curPage);
      this.resetScroll();
    },
    backAction() {
      if (this.curPage === 'userType') {
        this.$router.replace("/learnReportCover");
        Cookies.set('curPage', 'userType');
        document.removeEventListener('touchstart', this.touch, false);
        document.removeEventListener('touchmove', debounce(this.touch, 5, true), false);
        document.removeEventListener('touchend', this.touch, false);
      } else {
        this.jumpPage(this.routeObj2[this.curPage])
      }
    }
  }
}
</script>

<style scoped lang="less">
  .report-wrap {
    width: 100%;
    height: 100%;
    background: url(../../../static/images/2021LearnReport/commonBg.png) center no-repeat;
    background-size: cover;
    position: relative;

    .content {
      height: 100%;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  .pt-90 {
    padding-top: 90px;
  }

  .footer {
    position: absolute;
    left: 65px;
    bottom: 80px;
    z-index: 10;

    .text {
      width: 205px;
      height: 62px;
      font-size: 22px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
    }
  }

  .row-gif {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 64px;
    bottom: 60px;
    /*pointer-events: none;*/
    z-index: 10;
  }

  .mask {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: auto;
    pointer-events: none;
  }
</style>
