<template>
  <div class="dealer">
    <template v-if="from==='aiTest'">
      <div class="aiTest">
        <img src="../../../static/images/invite/aiTestBanner.png" alt="">
        <img src="../../../static/images/invite/invite.png" alt="">
      </div>
      <div class="footer">
        <div class="button" @click="toLogin">立即注册体验</div>
      </div>
    </template>
    <template v-else>
    <div class="head">
      <img src="../../../static/images/dealer/logo.png" class="logo"/>
      <span class="name">{{infoData.name}}</span>
    </div>

    <div class="banner-box">
      <img src="../../../static/images/groupBuying/banner.png" class="banner-img" alt="">
      <div class="info">
        <img src="../../../static/images/dealer/title.png" class="title-img" alt="">
        <div class="title">{{infoData.name}}</div>
        <div class="li" v-if="infoData.helpLine">
          <img src="../../../static/images/dealer/mobile.png" class="icon" alt="">
          <div class="content">
            <span class="label">体验中心服务热线</span>
            <span class="text">{{infoData.helpLine}}</span>
          </div>
        </div>
        <div class="li" v-if="infoData.address">
          <img src="../../../static/images/dealer/address.png" class="icon" alt="">
          <div class="content">
            <span class="label">体验中心地址</span>
            <span class="text">{{infoData.address}}</span>
          </div>
        </div>
        <div class="li" v-if="infoData.classTeacherList">
          <img src="../../../static/images/dealer/guwen.png" class="icon" alt="">
          <div class="content">
            <span class="label">课程顾问</span>
            <div v-for="(item, index) in infoData.classTeacherList" :key="index">
              <div class="text">{{item.name}}</div>
              <div class="contact">
                <template v-if="item.phone">
                  <img src="../../../static/images/dealer/phone.png" class="icon-phone" alt="">
                  <span class="text-phone">{{item.phone}}</span>
                </template>
                <template v-if="item.qq">
                  <img src="../../../static/images/dealer/qq.png" class="icon-phone  ml-40" alt="">
                  <span class="text-phone">{{item.qq}}</span>
                </template>
              </div>
            </div>

          </div>
        </div>
        <img src="../../../static/images/home/why_3.png" class="cover" alt="">
      </div>

      <div class="invite">
        <img src="../../../static/images/invite/invite.jpg" class="bg" alt="">
<!--        <img src="../../../static/images/dealer/invite_20221111.png" class="bg" alt="">-->
      </div>
    </div>

    <div class="footer">
      <div class="button" @click="toLogin">登录/注册</div>
    </div>
    </template>
  </div>
</template>

<script>
import {getJoinSchoolPromotionInfo} from '@/api/dealer'

export default {
  name: "dealer",
  data() {
    return {
      recommendCode:'',
      infoData:{},
      from:'',
    };
  },
  created() {
    this.recommendCode=this.$route.params.id;
    this.from=this.$route.query.from;
    this.$store.dispatch('user/setRecommendCode', this.recommendCode)
    this.getJoinSchoolPromotionInfo();
  },
  methods: {
    async getJoinSchoolPromotionInfo(){
      try {
        const {resultData}=await getJoinSchoolPromotionInfo({code:this.recommendCode})
        this.infoData=resultData;
        await this.$store.dispatch('user/setName', resultData.name)
      } catch (e) {
        this.$toast(e.resultMessage);
        if (e.resultCode === 3 && e.resultMessage === '推荐码错误或加盟校不存在！') {
          setTimeout(()=>{
            this.$router.replace('/index')
          },1500)
        }
      }
    },
    toLogin(){
      this.$router.push(`/login?pageType=RegisterLogin&from=${this.from}`)
    }
  }
}
</script>

<style scoped lang="less">
  .dealer {
    width: 100%;
    height: 100%;
    /*background: #DFF1FF;*/
    padding-bottom: 60px;
    .aiTest{
      img{
        width: 100%;
      }
    }
    .head {
      display: flex;
      align-items: center;
      height: 70px;
      padding: 0.5rem 0.667rem;
      background: #ffffff;

      .logo {
        width: 159px;
        height: 36px;
        left: 0.667rem;
      }

      .name {
        margin-left: 1.367rem;
        font-size: 0.933rem;
        color: #0087FF;
        font-weight: 500;
      }
    }

    .banner-box {
      padding-bottom: 4rem;

      .banner-img {
        width: 100%;
      }

      .info {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 3.733rem 0.8rem 0;
        padding: 0 1.067rem 1.067rem 1.067rem;
        background: #FFFFFF;
        box-shadow: 0px 0.4rem 2rem 0px rgba(0, 118, 205, 0.06);
        border-radius: 0.667rem;

        .title-img {
          width: 15.867rem;
          height: 3.467rem;
          margin-top: -1.733rem;
        }

        .title {
          margin-top: 1.9rem;
          text-align: center;
          font-size: 1.333rem;
          font-weight: 500;
          color: #FF8000;
          line-height: 1.833rem;
        }

        .li {
          display: flex;
          align-self: start;
          align-items: center;
          margin-top: 1.5rem;
          margin-left: 1.067rem;

          .icon {
            width: 3.633rem;
            height: 3.633rem;
          }

          .content {
            display: flex;
            flex-direction: column;
            margin-left: 1.833rem;

            .label {
              font-size: 0.933rem;
              font-weight: 500;
              color: #FF8000;
              line-height: 1.267rem;
              margin-bottom: 0.667rem;
            }

            .text {
              font-size: 0.933rem;
              font-weight: 400;
              color: #666666;
              line-height: 1.267rem;
              margin-bottom: 0.267rem;
            }

            .contact {
              display: flex;
              align-items: center;
              margin-bottom: 0.5rem;
              .icon-phone {
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 0.167rem;
              }

              .text-phone {
                font-size: 0.8rem;
                font-weight: 400;
                color: #666666;
                line-height: 1.1rem;
              }

              .ml-40 {
                margin-left: 1.333rem;
              }
            }

          }
        }

        .cover {
          width: 100%;
          margin-top: 1.067rem;
          border-radius: 0.433rem;
        }
      }

      .invite {
        position: relative;
        margin: 1.833rem 0.8rem;

        .bg {
          position: relative;
          width: 100%;
        }

        .video {
          position: absolute;
          left: 1.067rem;
          border-radius: 0.667rem;
          bottom: 3.333rem;
          width: 21.267rem;
          height: 11.967rem;
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 4rem;
      background: #ffffff;

      .button {
        width: 23.4rem;
        height: 2.667rem;
        background: #0087FF;
        border-radius: 1.533rem;
        font-size: 0.933rem;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 2.667rem;
        text-align: center;
      }
    }
  }

</style>
