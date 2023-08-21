<template>
  <div>
    <transition name="fade">
      <div class="poster-wrap" v-show="show">
        <nav-bar rightText="退出" @backAction="backAction" :defaultBack="false"></nav-bar>
        <div :class="getPoster">
          <div class="content centerSP">
            <p v-if="tagType==1">你目前还未学习课程，即刻开始学习噢~</p>
            <p v-else-if="tagType==2">错过了你的2021，开启新的学习之旅吧~</p>
            <template v-else-if="tagType==3">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>可以多尝试不同风格不同地区的老师</p>
            </template>
            <template v-else-if="tagType==4">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>学有所成，坚持就是胜利</p>
            </template>
            <template v-else-if="tagType==5">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>你已无敌，不骄不躁，温故知新</p>
            </template>
          </div>
        </div>

        <div class="footer">
          <div class="posterBg"></div>
          <div class="posterBg"></div>
          <div class="button centerSP" @click="shareAction">分享我的年度形象</div>
          <div class="button button2 centerSP" @click="watchAgain">再看一遍</div>
          <p class="text centerSP">找外教、练口语，请下载“说客英语”APP</p>
        </div>

        <van-overlay :show="showInWeixin">
          <div class="wrapper" @click.stop>
            <img :src="imgUrl" alt="年度学习报告分享图" class="canvas-img centerSP">
            <p class="tip centerSP">长按保存图片，发送给您的家人朋友吧</p>
            <img src="../../../static/images/2021LearnReport/close.png" alt="" class="closeIcon centerSP"
                 @click="showInWeixin=false">
          </div>
        </van-overlay>

        <van-overlay :show="showShare" @click="showShare = false">
          <div class="share-wrapper" @click.stop>
            <div class="item">
              <img :src="weixin" alt="" @click="selectShare(0)">
              <span class="text">微信</span>
            </div>
            <div class="item item2">
              <img :src="pengyouquan" alt="" @click="selectShare(1)">
              <span class="text">朋友圈</span>
            </div>
          </div>
        </van-overlay>

        <div class="canvas-wrap" ref="canvas">
          <img :src="getCanvasBg" class="img" alt="">
          <div class="text">
            <p v-if="tagType==1">你目前还未学习课程，即刻开始学习噢~</p>
            <p v-else-if="tagType==2">错过了你的2021，开启新的学习之旅吧~</p>
            <template v-else-if="tagType==3">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>可以多尝试不同风格不同地区的老师</p>
            </template>
            <template v-else-if="tagType==4">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>学有所成，坚持就是胜利</p>
            </template>
            <template v-else-if="tagType==5">
              <p><span class="blod font-36">{{name}}</span> 你2021年学习了 <span class="blod">{{classTotalNum}}</span> 节课</p>
              <p>你已无敌，不骄不躁，温故知新</p>
            </template>
          </div>
          <div id="qrcode" class="qrcode"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import navBar from "./components/NavBar";
import {mapGetters} from 'vuex';
import QRCode from 'qrcodejs2'
import {wxShareInApp, goBack} from "@/utils/appMethod";
import {isWeixin} from "@/utils";
import html2canvas from '../../../static/js/html2canvas.min';
import weixin from '../../../static/images/2021LearnReport/weixin.png';
import pengyouquan from '../../../static/images/2021LearnReport/pengyouquan.png';
import sharePoster1 from '../../../static/images/2021LearnReport/sharePoster1.png';
import sharePoster2 from '../../../static/images/2021LearnReport/sharePoster2.png';
import sharePoster3 from '../../../static/images/2021LearnReport/sharePoster3.png';
import sharePoster4 from '../../../static/images/2021LearnReport/sharePoster4.png';
import sharePoster5 from '../../../static/images/2021LearnReport/sharePoster5.png';
import service from "../../utils/request";

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
  name: "Poster",
  components: {
    navBar
  },
  data() {
    return {
      classTotalNum: '',
      show: false,
      showInWeixin: false,
      imgUrl: '',
      pengyouquan,
      weixin,
      showShare: false,
      disabled: true,
      tagType: '',
      name: '',
      sharePoster1,
      sharePoster2,
      sharePoster3,
      sharePoster4,
      sharePoster5,
    };
  },
  created() {
    this.classTotalNum = this.$route.query.classTotalNum;
    this.tagType = this.$route.query.tagType;
    this.name = this.$route.query.name;
    this.$nextTick(() => {
      this.createQrcode();
      this.show = true;
    })
    setTimeout(()=>{
      this.disabled=false;
    },500)
  },
  computed: {
    ...mapGetters(['isApp']),
    getPoster() {
      return `poster${this.tagType}`
    },
    getCanvasBg() {
      if (this.tagType == 1) {
        return sharePoster1;
      } else if (this.tagType == 2) {
        return sharePoster2;
      } else if (this.tagType == 3) {
        return sharePoster3;
      } else if (this.tagType == 4) {
        return sharePoster4;
      } else if (this.tagType == 5) {
        return sharePoster5;
      }
    },
  },
  methods: {
    backAction() {
      if (this.isApp) {
        this.$bus.$emit('switchAudio', false);
        goBack();
      } else if (isWeixin() && WeixinJSBridge) {
        WeixinJSBridge.call('closeWindow');
      } else {
        //
      }
    },
    createQrcode() {
      let url = `${window.location.origin}/h5/learnReportCover`
      new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: url
      })
    },
    selectShare(type) {
      console.log(type, 'type');
      this.$nextTick(async () => {
        await convertToImage(this.$refs.canvas, this);
        setTimeout(() => {
          this.showShare = false;
          this.$bus.$emit('switchAudio', false);
          wxShareInApp({base64: this.imgUrl, type})
        })
      })
    },
    shareAction() {
      if (this.disabled) return;
      if (this.isApp) {
        this.showShare = true;
      } else {
        this.$nextTick(async () => {
          await convertToImage(this.$refs.canvas, this);
          setTimeout(() => {
            this.showInWeixin = true;
          })
        })
      }
    },
    watchAgain() {
      if (this.disabled) return;
      this.$router.replace("/learnReportCover");
    },
  }
}
</script>

<style>
  .poster-wrap #qrcode canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .poster-wrap #qrcode img {
    width: 100% !important;
    height: 100% !important;
  }
</style>

<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .poster-wrap {
    width: 100%;
    height: 100%;

  }

  .poster1, .poster2, .poster3, .poster4, .poster5 {
    width: 750px;
    height: 1186px;
    background: url(../../../static/images/2021LearnReport/poster1.png) center no-repeat;
    background-size: cover;
    text-align: center;
    position: relative;
  }

  .poster2 {
    background: url(../../../static/images/2021LearnReport/poster2.png) center no-repeat;
    background-size: cover;
  }

  .poster3 {
    background: url(../../../static/images/2021LearnReport/poster3.png) center no-repeat;
    background-size: cover;
  }

  .poster4 {
    background: url(../../../static/images/2021LearnReport/poster4.png) center no-repeat;
    background-size: cover;
  }

  .poster5 {
    background: url(../../../static/images/2021LearnReport/poster5.png) center no-repeat;
    background-size: cover;
  }

  .content {
    bottom: 56px;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 28px;
      font-weight: 400;
      color: #FFCC89;
      line-height: 48px;
    }
  }

  .footer {
    position: relative;

    .text {
      width: 100%;
      position: absolute;
      bottom: 40px;
      font-size: 24px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      opacity: 0.6;
      text-align: center;
    }

    .button {
      width: 640px;
      height: 96px;
      background: linear-gradient(97deg, #F39F31 0%, #F39F31 100%);
      border-radius: 48px;
      font-size: 28px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 96px;
      text-align: center;
      bottom: 234px;
    }

    .button2 {
      background: transparent;
      color: #FCAA3F;
      border: 2px solid #F39F31;
      border-radius: 48px;
      bottom: 110px;
    }

    .posterBg {
      width: 100%;
      height: 165px;
      background: url(../../../static/images/2021LearnReport/posterBg.png) center no-repeat;
      background-size: cover;
    }
  }

  .wrapper {
    position: relative;
    height: 100%;

    .canvas-img {
      position: absolute;
      top: 84px;
      width: 500px;
      height: 890px;
    }

    .tip {
      position: absolute;
      bottom: 280px;
      width: 100%;
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
    }

    .closeIcon {
      position: absolute;
      bottom: 148px;
      width: 40px;
      height: 40px;
      padding: 10px;
    }
  }

  .canvas-wrap {
    position: fixed;
    z-index: -1;
    width: 750px;
    height: 1334px;

    .img {
      width: 750px;
      height: 1334px;
    }

    .text {
      position: absolute;
      bottom: 200px;
      text-align: center;
      width: 100%;
      font-size: 28px;
      font-weight: 400;
      color: #FFCC89;
      line-height: 48px;

      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .qrcode {
      position: absolute;
      bottom: 20px;
      right: 60px;
      width: 100px;
      height: 100px;
    }
  }

  .blod {
    font-weight: bold;
    font-size: 32px;
  }

  .font-36 {
    font-size: 36px;
  }

  .share-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*padding: 0 182px;*/
    width: 100%;
    height: 290px;
    background: #ffffff;
    border-radius: 20px 20px 0px 0px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 182px;

      img {
        width: 118px;
        height: 118px;
      }

      .text {
        font-size: 28px;
        font-weight: 400;
        color: #666666;
        line-height: 40px;
        margin-top: 16px;
      }
    }

    .item2 {
      margin-left: 0;
      margin-right: 182px;
    }
  }
</style>
