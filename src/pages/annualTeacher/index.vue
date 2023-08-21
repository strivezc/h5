<template>
  <div class="annualTeacher">
<!--    <nav-bar title="2022年度教师评选" @backAction="backAction" :defaultBack="false"></nav-bar>-->
    <div class="content">
      <img src="../../../static/images/annualTeacher/banner.png" alt="2022年度教师评选banner" class="banner">
      <van-tabs :ellipsis="false" :line-height="0" class="tag-list"  @click="changeTag">
        <van-tab v-for="item in tagList" :key="item.value">
          <div slot="title" class="item" :class="active===item.value?'checked':''">
            <span>{{item.chLabel}}</span>
            <span>{{item.enLabel}}</span>
          </div>
          <div class="content-warp">
            <div class="top">
              <img class="icon" src="../../../static/images/annualTeacher/star.png" alt="">
              <span class="title">{{item.chLabel}}</span>
              <img class="icon" src="../../../static/images/annualTeacher/star.png" alt="">
            </div>
            <div class="bottom">
              <span class="title">{{item.enLabel}}</span>
            </div>
            <div class="teacher-wrap">
              <div class="teacher-item" v-for="teacher in teacherList" :key="teacher.userName">
                <img :src="teacher.userImg" alt="老师头像">
                <div class="text">{{teacher.userName}}</div>
              </div>
            </div>
            <div class="tip">排名不分先后</div>
            <div class="tip">listed in no particular order</div>
          </div>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
import navBar from "@/components/NavBar";
import {goBack} from "@/utils/appMethod";
import {teaYearLabel} from "@/api";
import {isWeixin} from "@/utils";

export default {
  name: "AnnualTeacher",
  components: {
    navBar,
  },
  data() {
    return {
      tagList: [
        {chLabel: '年度优秀教师', enLabel: 'Best Teacher Award 2022', value: 1},
        {chLabel: '最敬业教师', enLabel: 'Most Dedicated Teacher Award 2022', value: 2},
        {chLabel: '最受学员欢迎教师', enLabel: 'Most Popular Teacher Award 2022', value: 3},
        // {chLabel: '年度贡献教师', enLabel: 'Contribution Teacher Award 2022', value: 4},
      ],
      active: 1,
      teacherList:[],
      listQuery: {
        currPage: 1,
        pageSize: 999,
      },
    };
  },
  created() {
    this.getTeacherList();
  },
  methods: {
    backAction() {
      if (isWeixin() && WeixinJSBridge) {
        WeixinJSBridge.call('closeWindow');
      } else {
        goBack();
      }
    },
    changeTag(index) {
      this.listQuery.currPage=1;
      this.active=index+1;
      this.getTeacherList();
    },
    async getTeacherList(){
      try {
        const params={
          ...this.listQuery,
          teacherTitle:this.active
        }
        const {resultData} =await teaYearLabel(params)
        this.teacherList=resultData;
      } catch (e) {
        console.log(e, 'error');
      }
    },
  }
}
</script>
<style scoped lang="less">
  /deep/ .van-tabs__wrap--scrollable .van-tab{
    padding: 0 10px;
  }
  /deep/ .van-tabs--line .van-tabs__wrap{
    height: auto;
  }
  /deep/ .van-tabs__wrap--scrollable .van-tabs__nav--complete{
    padding-right: 10px;
    padding-left: 10px;
  }
  /deep/ .van-tabs__nav--line{
   padding-bottom: 0;
  }
  .content {
    /*padding-top: 2.933rem;*/

    .banner {
      width: 100%;
      height: auto;
    }
    .tag-list{
      margin-top: 20px;
    }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #ffffff;
        border-radius: 16px 16px 16px 16px;
        border: 1px solid #E5E5E5;
        width: 298px;
        height: 96px;
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
        color: #666666;
        text-align: center;
        padding: 0 20px;
      }

      .checked {
        background: rgba(255, 180, 55, 0.1);
        border: 1px solid #FFB437;
        color: #C57B00;
        font-weight: 500;
      }
    .content-warp{
      margin-top: 60px;
      .icon{
        width: 34px;
        height: 34px;
        padding: 0 20px;
      }
      .top{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
      }
      .bottom{
        text-align: center;
      }
      .title{
        font-size: 40px;
        font-weight: 500;
        color: #000000;
        line-height: 47px;
      }
      .teacher-wrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 70px 70px;
        .teacher-item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 270px;
          text-align: center;
          margin-bottom: 40px;
          img{
            width: 250px;
            height: 300px;
            object-fit: cover;
            margin-bottom: 18px;
            border-radius: 16px;
            border: 2px solid #F6D859;
          }
          .text{
            font-size: 32px;
            font-weight: 500;
            color: #333333;
            line-height: 38px;
          }
        }
      }
      .tip{
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        color: #999999;
        line-height: 23px;
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 100px;
        }
      }
    }
  }

</style>
