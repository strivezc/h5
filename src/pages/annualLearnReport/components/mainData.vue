<template>
  <div style="height: 100%">
    <transition name="fade">
  <div class="mainData-wrap bg" v-show="show2">
    <img src="../../../../static/images/learnReport/bg.png" class="oblique-light" alt="">
    <div class="content">
      <transition-group
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
      >
        <div v-for="(item,index) in textArr" v-if="show" :data-index="index" :key="item.num">
          <span v-html="item.text">{{item}}</span>
        </div>
        <div v-for="(item,index) in learnReportData.datebookMonthList" v-if="show" :data-index="textArr.length+index"
             :key="textArr.length+index">
          <div class="classData" v-if="index===0">
            <span class="left">上课数据</span>
            <div class="right">
              <span class="block"></span><span class="text">上课时长</span>
              <span class="block blue"></span><span class="text">上课节数</span>
            </div>
          </div>

          <div class="bar-wrap">
            <span class="month">{{parseInt(item.month.substring(item.month.length - 2))}}月</span>
            <div class="progress-wrap">
              <div class="top">
                <span class="left" :class="getRowWidth(item.num,1)"></span>
                <span class="right">{{item.num * 25}}分钟</span>
              </div>
              <div class="bottom">
                <span class="left" :class="getRowWidth(item.num,2)"></span>
                <span class="right">{{item.num}}节</span>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
<!--    <div class="bg">-->
<!--      <div class="text-warp">-->
<!--        <p>鲁迅说</p>-->
<!--        <p>时间就像海绵里的水，</p>-->
<!--        <p>只要愿意挤,总还是有的，</p>-->
<!--        <p>而你，</p>-->
<!--        <p>就是那个愿意挤海绵的人！</p>-->
<!--      </div>-->
<!--    </div>-->
  </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MainData",
  props: {
    learnReportData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      show2: false,
      datebookMonthList:[
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
        // {"month":"2022-04","num":1},
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
      this.show2 = true;
    })
  },
  computed: {
    textArr() {
      return [
        {
          num: 0,
          text: `<p class="title mb-30">365天里，</p>`
        },
        {
          num: 1,
          text: `<p class="item-text">你参加了 <span class="title color-y ">${this.learnReportData.classTotalNum}</span> 节比武课程（每节课程25分钟），</p>`
        },
        {
          num: 2,
          text: `<span class="item-text">修炼时长 <span class="title color-y ">${this.learnReportData.classHour}</span> 个小时，</span> `
        },
        {
          num: 3,
          text: `<span class="item-text">相当于 <span class="title color-y ">${this.learnReportData.incenseNum}</span> 炷香（一炷香30分钟左右），</span> `
        },
        {
          num: 4,
          text: `<p class="item-text">在语言的刀光剑影间，</p> `
        },
        {
          num: 5,
          text: `<p class="item-text mb-30">你行云流水的刀法令众人啧啧称奇。</p> `
        },
        {
          num: 6,
          text: `<p class="item-text">你最爱在 <span class="title color-y ">${this.learnReportData.maxMonth}</span> <span class="item-text">修炼</span></p> `
        },
        {
          num: 7,
          text: `<p class="item-text">敢问阁下修炼的是哪种功夫，如此了得？</p> `
        },
      ]
    },
  },
  methods: {
    getRowWidth(val, type) {
      return `width${type}-${Math.ceil((val / this.learnReportData.maxClassNum) * 10)}`
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      let delay = el.dataset.index * 100
      setTimeout(() => {
        el.style.transition = 'opacity 2s '
        el.style.opacity = 1
        el.style.animation = 'one-in 2s infinite'
        el.style['animation-iteration-count'] = 1
        done()
      }, delay)
    }
  }
}
</script>
<style lang="less">
  .mainData-wrap .content {
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 140px;
    position: relative;
    z-index: 2;
    padding-bottom: 200px;
  }

  .mainData-wrap .title {
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .mainData-wrap .item-text {
    font-size: 28px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .mainData-wrap .color-y {
    color: #FCFF00;
  }

  .mainData-wrap .mb-30 {
    margin-bottom: 30px;
  }

  .mainData-wrap .font-cepai {
    font-family: 'cepai';
  }

  .mainData-wrap .classData {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 70px;
    margin-bottom: 40px;

    .left {
      font-size: 36px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 64px;
    }

    .right {
      display: flex;
      align-items: center;

      .block {
        display: inline-block;
        width: 30px;
        height: 20px;
        background: #FFB503;
        margin-right: 12px;
      }

      .blue {
        background: #54CFFC;
        margin-left: 25px;
      }

      .text {
        font-size: 22px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 64px;
      }
    }
  }

  .mainData-wrap .bar-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    overflow-y: scroll;

    .month {
      font-size: 28px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 64px;
      /*margin-right: 12px;*/
      /*text-align: right;*/
      width: 80px;
    }

    .progress-wrap {
      display: flex;
      flex-direction: column;

      .top {
        display: flex;
        align-items: center;

        .left {
          height: 16px;
          background: linear-gradient(90deg, #FBF4AF 0%, #FFB503 100%);
          border-radius: 0px 8px 8px 0px;
        }

        .right {
          margin-left: 15px;
          font-size: 20px;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .bottom {
        display: flex;
        align-items: center;
        /*margin-top: 4px;*/

        .left {
          height: 16px;
          background: linear-gradient(96deg, #B7EAFF 0%, #4CCCFC 100%);
          border-radius: 0px 8px 8px 0px;
        }

        .right {
          margin-left: 15px;
          font-size: 20px;
          font-weight: 400;
          color: #FFFFFF;
        }
      }

      .width1-10 {
        width: 440px;
      }

      .width1-9 {
        width: 396px;
      }

      .width1-8 {
        width: 352px;
      }

      .width1-7 {
        width: 308px;
      }

      .width1-6 {
        width: 264px;
      }

      .width1-5 {
        width: 220px;
      }

      .width1-4 {
        width: 176px;
      }

      .width1-3 {
        width: 132px;
      }

      .width1-2 {
        width: 88px;
      }

      .width1-1 {
        width: 44px;
      }

      .width1-0 {
        width: 0;
      }

      .width2-10 {
        width: 220px;
      }

      .width2-9 {
        width: 198px;
      }

      .width2-8 {
        width: 176px;
      }

      .width2-7 {
        width: 154px;
      }

      .width2-6 {
        width: 132px;
      }

      .width2-5 {
        width: 110px;
      }

      .width2-4 {
        width: 88px;
      }

      .width2-3 {
        width: 66px;
      }

      .width2-2 {
        width: 44px;
      }

      .width2-1 {
        width: 22px;
      }

      .width2-0 {
        width: 0;
      }
    }
  }

</style>
<style scoped lang="less">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 4s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @keyframes one-in {
    from {
      padding-top: 100px;
      height: 0%;
    }
    to {
      padding-top: 0px;
      height: 100%;
    }
  }

  .oblique-light {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .bg {
    width: 100%;
    height: 100%;
    /*background: url(../../../../static/images/learnReport/bg.png) center no-repeat;*/
    /*background: linear-gradient(180deg, #180D4B 0%, #6C51BA 100%);*/
    /*background-size: cover;*/
    position: relative;
    z-index: 1;
    /*margin-bottom: 160px;*/

    .text-warp {
      padding-top: 120px;
      padding-left: 60px;
    }

    p {
      font-size: 30px;
      color: #FFFFFF;
      line-height: 48px;
    }

    /*!*position: absolute;*!*/
    /*!*bottom: 0;*!*/
    /*width: 100%;*/
    /*height: auto;*/
    /*pointer-events: none;*/
  }

</style>
