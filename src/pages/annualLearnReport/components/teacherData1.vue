<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="teacherData-wrap" v-show="show2">
        <img src="../../../../static/images/learnReport/8.png" class="img-bottom" alt="">
        <div class="content">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
              <div v-if="item.num===2">
                <div class="tea-wrap" v-for="(item,index) in learnReportData.teaInfoList" :key="item.teaId">
                  <span class="item-text">{{index+1}}、{{item.teacherName}}老师</span>
                  <div>
                    <span class="item-text color-y">{{item.num}}</span>
                    <span class="item-text">次</span>
                  </div>
                </div>
              </div>
              <span v-html="item.text" v-else>{{item}}</span>
            </div>
            <div v-for="(item,index) in imgArr" :key="`${index}bubble`">
              <template v-if="index===0">
                <p class="teacherName">{{item.text}}</p>
              </template>
              <img :src="item.img" alt="" class="bubble" :class="`bubble${index}`" v-else>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bubble1 from '../../../../static/images/learnReport/bubble.png';
import bubble2 from '../../../../static/images/learnReport/bubble1.png';

export default {
  name: "TeacherData",
  props: {
    learnReportData: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      show2: false,
      imgArr: [
        {text:this.learnReportData.teaInfoList[0].teacherName},
        {img: bubble1},
        {img: bubble2},
        {img: this.learnReportData.datebookTeaMostImg},
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
        {num: 1, text: `<p class="title">你年度最爱过招的大侠</p>`},
        {num: 2},
        {num: 3, text: `<p class="item-text mt-30 mb-30">你们过招 <span class="item-text color-y">${this.learnReportData.datebookTeaMostNums}</span> 次 总时长 （<span class="title color-y">${this.learnReportData.datebookTeaMostTime}</span>炷香）</p>`},
        {num: 4, text: `<p class="title mb-0">武林大会，谁与争锋</p>`},
        {num: 5, text: `<p class="item-text">恭喜再获 <span class="item-text color-y">${this.learnReportData.duelGodDarts}</span> 枚切磋神镖</p>`},
      ]
    },
  },
  methods: {
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
  .teacherData-wrap .content {
    box-sizing: border-box;
    padding-top: 120px;
    padding-left: 76px;
    position: relative;
    z-index: 1;
    height: 100vh;
  }


  .teacherData-wrap .title {
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
    text-align: left;
    margin-bottom: 27px;
  }

  .teacherData-wrap .font-32 {
    font-size: 32px;
  }

  .teacherData-wrap .tea-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 184px;
    .item-text {
      font-size: 32px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 60px;
      text-align: left;
    }
    .color-y {
      color: #FCFF00;
    }
  }
  .item-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
    text-align: left;
  }
  .teacherData-wrap .color-y {
    color: #FCFF00;
  }

  .teacherData-wrap .mb-30 {
    margin-bottom: 30px;
  }
  .teacherData-wrap .mt-30 {
    margin-top: 30px;
  }
  .teacherData-wrap .mb-0 {
    margin-bottom: 0;
  }

  .teacherData-wrap .font-cepai {
    font-family: 'cepai';
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

  .img-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .bubble{
    width: 350px;
    height: 350px;
    user-select:none;
    pointer-events:none;
  }
  .bubble1 {
    position: absolute;
    bottom: 300px;
    left: 20px;
    -webkit-animation: bubble1 1.2s ease-in-out alternate infinite;
    animation: bubble1 1.2s ease-in-out alternate infinite;
  }
  .bubble3 {
    position: absolute;
    bottom: 400px;
    left: 120px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    user-select:none;
    pointer-events:none;
    -webkit-animation: bubble3 1.2s ease-in-out alternate infinite;
    animation: bubble3 1.2s ease-in-out alternate infinite;
  }
  .bubble2 {
    position: absolute;
    bottom: 200px;
    right: 20px;
    -webkit-animation: bubble2 1.2s ease-in-out alternate infinite;
    animation: bubble2 1.2s ease-in-out alternate infinite;
  }
  .teacherName{
    position: absolute;
    bottom: 270px;
    left: 20px;
    width: 350px;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    color: #FFFFFF;
    -webkit-animation: teacherName 1.2s ease-in-out alternate infinite;
    animation: teacherName 1.2s ease-in-out alternate infinite;
  }
  @-webkit-keyframes teacherName {
    100% {
      bottom: 280px
    }
  }

  @keyframes teacherName {
    100% {
      bottom: 280px
    }
  }
  @-webkit-keyframes bubble1 {
    100% {
      bottom: 310px
    }
  }

  @keyframes bubble1 {
    100% {
      bottom: 310px
    }
  }
  @-webkit-keyframes bubble3 {
    100% {
      bottom: 410px
    }
  }

  @keyframes bubble3 {
    100% {
      bottom: 410px
    }
  }

  @-webkit-keyframes bubble2 {
    100% {
      bottom: 190px
    }
  }

  @keyframes bubble2 {
    100% {
      bottom: 190px
    }
  }
</style>
