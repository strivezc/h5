<template>
  <div>
    <van-overlay :show="show" @click="close">
      <div class="wrapper" @click.stop>
        <img :src="imgUrl" alt="" class="canvas-img centerSP">
        <template v-if="inApp">
          <div class="saveBtn centerSP" @click="saveImage">保存图片到相册</div>
        </template>
        <template v-else>
          <p class="tip centerSP">长按图片，保存到本地相册后分享</p>
          <img src="../../../../static/images/learnReport/close.png" alt="" class="closeIcon centerSP"
               @click="close">
        </template>
      </div>
    </van-overlay>

    <div class="poster" ref="canvas" v-if="showPoster">
      <img src="@/assets/img/lottery/share.jpg" alt="" class="share1">
      <img src="@/assets/img/default_img.png" class="avater" alt="" v-if="!detailData.userImg || detailData.userImg==='default.jpg'">
      <img :src="detailData.userImg" class="avater" alt="" v-else>
      <p class="date">活动时间：{{detailData.activityTime}}</p>
      <div class="content">
        <div class="card">
          <img src="@/assets/img/lottery/title.png" alt="" class="title1">
          <div class="prize-wrap" style="align-items: center;" v-for="(item,index) in detailData.prizeInfoList" :key="index">
            <img :src="item.prizeImg" class="left" alt="">
            <div class="right">
              <span>{{item.prizeName}}</span>
<!--              <span class="num">{{item.prizeTotalNum}}份</span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <img src="@/assets/img/lottery/share1.png" class="left_bg" alt="">
        <div id="qrcode" class="right_icon"></div>
      </div>
    </div>
  </div>

</template>

<script>
import {saveImage} from "@/utils/appMethod";
import html2canvas from "../../../../static/js/html2canvas.min";
import QRCode from "qrcodejs2";

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
      _this.imgUrl = canvas.toDataURL('image/jpeg', 0.7)
    },
  });
}
export default {
  name: "poster",
  props: {
    inApp: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: '',
    },
    detailData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      imgUrl: '',
      showPoster: false,
    };
  },
  created() {
    setTimeout(() => {
      this.showPoster = true;
    })
  },
  methods: {
    createQrcode() {
      if (this.hasQrcode) return;
      let url = `${window.location.origin}/h5/lottery?code=${this.code}`;
      new QRCode('qrcode', {
        width: 55,
        height: 55,
        text: url
      })
      this.hasQrcode = true;
    },
    saveImage() {
      saveImage({base64: this.imgUrl});
      this.close();
    },
    close() {
      this.$emit('update:show', false)
    },
    async createCanvas() {
      this.$nextTick(async () => {
        this.createQrcode()
        await convertToImage(this.$refs.canvas, this);
        setTimeout(() => {
          this.$emit('update:show', true);
        })
      })
    },
  }
}
</script>

<style scoped lang="less">
  .wrapper {
    position: relative;
    /*height: 100%;*/

    .canvas-img {
      position: absolute;
      top: 80px;
      width: auto;
      height: 930px;
    }

    .saveBtn {
      position: absolute;
      top: 1090px;
      width: 425px;
      text-align: center;
      height: 88px;
      background: #FFFFFF;
      border-radius: 64px 64px 64px 64px;
      font-size: 32px;
      color: #0087FF;
      line-height: 88px;
    }

    .tip {
      position: absolute;
      top: 1090px;
      width: 100%;
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 33px;
    }

    .closeIcon {
      position: absolute;
      top: 1150px;
      width: 48px;
      height: 48px;
      padding: 18px;
    }
  }
  .poster {
    position: fixed;
    z-index: -1;

    .share1 {
      width: 100%;
    }

    .avater {
      position: absolute;
      z-index: 1;
      top: 30px;
      left: 326px;
      width: 100px;
      height: 100px;
    }

    .date {
      position: absolute;
      top: 235px;
      width: 100%;
      text-align: center;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 30px;
    }
    .content{
      padding: 2px 32px;
      padding-top: 8px;
      background: #FB5253;
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
      .title1 {
        position: absolute;
        top: -5px;
        left: 189px;
        z-index: 1;
        width: 308px;
        height: 55px;
      }
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
            width: 66px;
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
          line-height: 32px;
          margin-top: 30px;
          margin-bottom: 20px;
        }

        .mb-50 {
          margin-bottom: 50px;
        }
      }
    }
    .footer{
      position: relative;
      .left_bg{
        width: 750px;
        height: 140px;
      }
      .right_icon {
        position: absolute;
        top: 24px;
        right: 45px;
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
