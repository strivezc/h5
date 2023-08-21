<template>
  <div>
    <transition name="fade">
      <div class="poster-wrap" v-show="show">
        <nav-bar rightText="退出" @backAction="backAction" :defaultBack="false"></nav-bar>
        <img src="../../../static/images/learnReport/bg.png" class="bottom-img" alt="">
        <div class="poster-bg">
          <div class="content">
            <img src="../../../static/images/learnReport/figureLight.png" class="figureLight" alt="">
            <p class="font-40">这一年，好汉凭借一身好功夫</p>
            <p class="font-40">共收获 <span class="color-y">{{(tagType==0||tagType==1)?'0':allGodDarts}}</span> 枚神镖，</p>
            <p class="font-40">解锁说客联盟新的里程碑。</p>
            <p class="mt-60 font-40">荣获称号</p>
            <p class="title color-y">“{{formatTagType(tagType)}}”</p>
            <img class="figure" :src="getFigure" alt="">
            <img class="btn1" @click="shareAction" src="../../../static/images/learnReport/btn1.png" alt="">
            <div v-html="html" v-if="isWeChat"></div>
            <img class="btn2" v-else id="enterVoting" @click="enterVote"
                 src="../../../static/images/learnReport/btn2.png" alt="">
            <p class="again" @click="watchAgain">再看一遍</p>
          </div>
        </div>


        <van-overlay :show="showInWeixin">
          <div class="wrapper" @click.stop>
            <img :src="imgUrl" alt="年度学习报告分享图" class="canvas-img centerSP">
            <p class="tip centerSP">长按保存图片，发送给您的家人朋友吧</p>
            <img src="../../../static/images/learnReport/close.png" alt="" class="closeIcon centerSP"
                 @click="showInWeixin=false">
          </div>
        </van-overlay>

        <van-overlay :show="showShare" @click="showShare = false">
          <div class="wrapper">
            <img :src="imgUrl" alt="年度学习报告分享图" class="canvas-img centerSP">
          </div>
          <div class="share-wrapper" @click.stop>
            <div class="item">
              <img :src="weixin" alt="" @click="selectShare(0)">
              <span class="text">微信</span>
            </div>
            <div class="item item">
              <img :src="pengyouquan" alt="" @click="selectShare(1)">
              <span class="text">朋友圈</span>
            </div>
            <div class="item item">
              <img :src="save" alt="" @click="selectShare(3)">
              <span class="text">下载图片</span>
            </div>
          </div>
        </van-overlay>

        <div class="canvas-wrap" ref="canvas">
          <img :src="getCanvasBg" class="img" alt="">
          <template v-if="tagType==0">
            <div class="text" style="color: #3C4886">
              <p>您目前还未上过课，</p>
              <p>即刻开始新的学习噢~</p>
            </div>
          </template>
          <template v-else-if="tagType==1">
            <div class="text" style="color: #252D4B">
              <p>我们错过了你的2022，</p>
              <p>即刻开启新的学习之旅吧~</p>
            </div>
          </template>
          <template v-else-if="tagType==2">
            <div class="text" style="color: #273836">
              <p>您今年共收获{{allGodDarts}}枚神镖</p>
              <p>继续加油，再接再厉</p>
            </div>
          </template>
          <template v-else-if="tagType==3">
            <div class="text" style="color: #7E480A">
              <p>您今年共收获{{allGodDarts}}枚神镖</p>
              <p>积少成多，稳步前行</p>
            </div>
          </template>
          <template v-else-if="tagType==4">
            <div class="text" style="color: #8E2F1E">
              <p>您今年共收获{{allGodDarts}}枚神镖</p>
              <p>勤学苦练，学习标杆</p>
            </div>
          </template>
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
import {wxShareInApp, goBack, enterVoteActivity, saveImage} from "@/utils/appMethod";
import {createTagType} from '@/api';
import {uploadImgForAdmin} from '@/api/user';
import {isWeixin} from "@/utils";
import html2canvas from '../../../static/js/html2canvas.min';
import weixin from '../../../static/images/learnReport/weixin.png';
import pengyouquan from '../../../static/images/learnReport/pengyouquan.png';
import save from '../../../static/images/common/save1.png';
import sharePoster1 from '../../../static/images/learnReport/sharePoster1.png';
import sharePoster2 from '../../../static/images/learnReport/sharePoster2.png';
import sharePoster3 from '../../../static/images/learnReport/sharePoster3.png';
import sharePoster4 from '../../../static/images/learnReport/sharePoster4.png';
import sharePoster5 from '../../../static/images/learnReport/sharePoster5.png';
import figure1 from '../../../static/images/learnReport/figure1.png';
import figure2 from '../../../static/images/learnReport/figure2.png';
import figure3 from '../../../static/images/learnReport/figure3.png';
import figure4 from '../../../static/images/learnReport/figure4.png';
import figure5 from '../../../static/images/learnReport/figure5.png';


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
      _this.imgUrl = canvas.toDataURL('image/jpeg', 1)
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
      save,
      weixin,
      showShare: false,
      disabled: true,
      tagType: '',
      name: '',
      allGodDarts: '',
      recommendCode: '',
      sharePoster1,
      sharePoster2,
      sharePoster3,
      sharePoster4,
      sharePoster5,
      figure1,
      figure2,
      figure3,
      figure4,
      figure5,
      isWeChat: false,
      html: `<wx-open-launch-weapp id="launch-btn" username="gh_4fa28c310b5c" path="/subPackagesB/voteActivity/activityEnter" @launch="handleLaunchFn" @error="handleErrorFn"><template><style>.btn2{ width: 13.1rem;height: 4.333rem;}</style><img class="btn2" src="${process.env.API_ROOT}/h5/static/images/learnReport/btn2.png" alt=""></template></wx-open-launch-weapp>`
    };
  },
  created() {
    this.classTotalNum = this.$route.query.classTotalNum;
    this.tagType = this.$route.query.tagType;
    console.log(this.tagType,'this.tagType');
    this.name = this.$route.query.name;
    this.allGodDarts = this.$route.query.allGodDarts;
    this.recommendCode = this.$route.query.recommendCode;
    this.$nextTick(() => {
      this.createQrcode();
      this.show = true;
    })
    setTimeout(async () => {
      await convertToImage(this.$refs.canvas, this);
      this.createTagType();
      this.disabled = false;
    }, 500)
    this.checkInProgram();
  },
  computed: {
    ...mapGetters(['isApp']),
    // getPoster() {
    //   return `poster${this.tagType}`
    // },
    getCanvasBg() {
      if (this.tagType == 0) {
        return sharePoster1;
      } else if (this.tagType == 1) {
        return sharePoster2;
      } else if (this.tagType == 2) {
        return sharePoster3;
      } else if (this.tagType == 3) {
        return sharePoster4;
      } else if (this.tagType == 4) {
        return sharePoster5;
      }
    },
    getFigure() {
      if (this.tagType == 0) {
        return figure1;
      } else if (this.tagType == 1) {
        return figure2;
      } else if (this.tagType == 2) {
        return figure3;
      } else if (this.tagType == 3) {
        return figure4;
      } else if (this.tagType == 4) {
        return figure5;
      }
    },
  },
  methods: {
    checkInProgram() {
      let that = this;
      if (isWeixin()) {
        wx.miniProgram.getEnv((res) => {
          console.log(res, 'res-miniprogram');
          if (res.miniprogram) {
            console.log('在小程序内');
          } else {
            console.log('不在小程序内');
            that.isWeChat = true;
          }
        })
      }
    },
    handleLaunchFn(e) {
      console.log('success', e)
    },
    handleErrorFn(e) {
      console.log('fail', e.detail);
    },
    async createTagType() {
      try {
        const {resultData} = await uploadImgForAdmin({
          fileUrl: this.imgUrl.replace('data:image/jpeg;base64,', ''),
        })
        await createTagType({tagTypeImg: resultData.fileUrl});
      } catch (e) {
        console.log(e, 'error');
      }

    },
    formatTagType(type) {
      let obj = {
        0: '武林萌新',
        1: '江湖旧友',
        2: '青铜大侠',
        3: '白金大侠',
        4: '王者大侠',
      }
      return obj[type];
    },
    // formatTitle(type) {
    //   let obj = {
    //     0: '初出茅庐，拜师学艺',
    //     1: '隐居山林，重出江湖',
    //     2: '活奔乱跳，无心学艺',
    //     3: '潜心学艺，功成可待',
    //     4: '超强王者，独孤求败',
    //   }
    //   return obj[type];
    // },
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
      let url = `${window.location.origin}/h5/learnReportCover?registerFrom=learnReport&recommendCode=${this.recommendCode}`
      new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: url
      })
    },
    selectShare(type) {
      console.log(type, 'type');
      if (type===3) {
        setTimeout(() => {
          this.showShare = false;
          saveImage({base64: this.imgUrl});
        })
        return;
      }
      this.$nextTick(async () => {
        if (!this.imgUrl) {
          await convertToImage(this.$refs.canvas, this);
        }
        setTimeout(() => {
          this.showShare = false;
          this.$bus.$emit('switchAudio', false);
          wxShareInApp({base64: this.imgUrl, type})
        })
      })
    },
    enterVote(){
      if (this.isApp) {
        this.$bus.$emit('switchAudio', false);
        enterVoteActivity();
      }
    },
    shareAction() {
      if (this.disabled) return;
      if (this.isApp) {
        this.showShare = true;
      } else {
        this.$nextTick(async () => {
          if (!this.imgUrl) {
            await convertToImage(this.$refs.canvas, this);
          }
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
    position: relative;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #180D4B 0%, #6C51BA 100%);
  }

  .bottom-img {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .poster-bg {
    box-sizing: border-box;
    position: relative;
    z-index: 1;
  }

  .content {
    box-sizing: border-box;
    height: 100vh;
    padding-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .figureLight {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 733px;
      height: 764px;
      pointer-events: none;
    }

    p {
      font-size: 32px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 60px;
    }

    .color-y {
      color: #FAFF00;
    }

    .font-40 {
      font-size: 40px;
    }

    .title {
      font-size: 60px;
      margin-top: 14px;
    }

    .mt-60 {
      margin-top: 40px;
    }

    .figure {
      margin-top: 36px;
      width: 400px;
      height: 400px;
    }

    .btn1 {
      margin-top: 36px;
      width: 393px;
      height: 130px;
    }

    .btn2 {
      width: 393px;
      height: 130px;
    }

    .again {
      margin-top: 20px;
      color: #FFFFFF;
      font-size: 35px;
      font-weight: 400;
      line-height: 76px;
    }
  }

  .wrapper {
    position: relative;
    height: 100%;

    .canvas-img {
      position: absolute;
      bottom: 390px;
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
    z-index: 99;
    left: -9999px;
    top: -9999px;
    width: 750px;
    height: 1334px;

    .img {
      width: 750px;
      height: 1334px;
    }

    .title {
      position: absolute;
      bottom: 328px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 44px;
      font-weight: bold;
      color: #3C4886;
      line-height: 76px;
      width: 524px;
      padding-bottom: 20px;
      border-bottom: 1Px solid #DDDDDD;
    }

    .text {
      position: absolute;
      bottom: 211px;
      text-align: center;
      width: 100%;
      font-size: 28px;
      font-weight: 400;
      color: #3C4886;
      line-height: 40px;

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

  .share-wrapper {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
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
      margin-left: 60px;

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
      /*margin-right: 182px;*/
    }
    .item3 {
      margin-left: 0;
      /*margin-right: 182px;*/
    }
  }
</style>
