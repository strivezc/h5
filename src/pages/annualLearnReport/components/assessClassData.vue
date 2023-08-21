<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="assessClassData-wrap" v-show="show2">
        <img src="../../../../static/images/learnReport/lantern.png" class="lantern" alt="">
        <img src="../../../../static/images/learnReport/bg.png" class="img-bottom" alt="">
        <div class="content">
          <transition-group
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
          >
            <div v-for="item in textArr" v-if="show" :data-index="item.num" :key="item.num">
              <span v-html="item.text">{{item}}</span>
            </div>
            <div v-for="(item,index) in imgArr" :key="`${index}bubble`">
              <img :src="item.img" alt="" class="bubble" :class="`bubble${index+1}`">
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bubble1 from '../../../../static/images/learnReport/bubble4.png'
import bubble2 from '../../../../static/images/learnReport/bubble2.png'

export default {
  name: "AssessClassData",
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
        {img: bubble1},
        {img: bubble2},
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
        {num: 1, text: `<span class="item-text">天下武功，唯快不破，</span> `},
        {num: 2, text: `<span class="item-text">刀出鞘，剑无痕，其疾如风。</span> `},
        {num: 3, text: `<p class="item-text mb-30">阁下功夫名不虚传，通过不懈努力， </p> `},
        {num: 4, text: `<p class="item-text">主修 <span class="title color-y">${this.learnReportData.languageType}</span> 飞刀课，<span class="title color-y">${this.learnReportData.assessClassNum}</span> 节功夫测评课，</p> `},
        {num: 5, text:`<p class="item-text mb-30"><span class="title color-y">${this.learnReportData.languageClassNums}</span> 套语言连招课，</p>`},
        {num: 6, text: `<p class="item-text">获得了 <span class="title color-y ">${this.learnReportData.kungfuGodDarts}</span> 枚功夫神镖。</p> `},
      ]
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      // console.log(el.dataset.index)
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
<style>
  .assessClassData-wrap .content {
    padding-left: 65px;
    padding-top: 100px;
    position: relative;
    z-index: 1;
  }

  .assessClassData-wrap .item-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .assessClassData-wrap .title {
    font-size: 40px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }
  .assessClassData-wrap .mb-30 {
    margin-bottom: 30px;
  }

  .assessClassData-wrap .color-y {
    color: #FCFF00;
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
  .lantern{
    position: absolute;
    right: -110px;
    top: 300px;
    z-index: 1;
    width: 19.933rem;
    height: auto;
    pointer-events: none;
  }

  .img-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
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
    top: 550px;
    left: 20px;
    -webkit-animation: bubble1 1.2s ease-in-out alternate infinite;
    animation: bubble1 1.2s ease-in-out alternate infinite;
  }
  .bubble2 {
    position: absolute;
    top: 820px;
    right: 20px;
    -webkit-animation: bubble2 1.2s ease-in-out alternate infinite;
    animation: bubble2 1.2s ease-in-out alternate infinite;
  }
  @-webkit-keyframes bubble1 {
    100% {
      top: 560px
    }
  }

  @keyframes bubble1 {
    100% {
      top: 560px
    }
  }
  @-webkit-keyframes bubble2 {
    100% {
      top: 810px
    }
  }

  @keyframes bubble2 {
    100% {
      top: 810px
    }
  }
</style>
