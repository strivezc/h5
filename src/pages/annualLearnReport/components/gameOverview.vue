<template>
  <div style="height: 100vh">
    <transition name="fade">
      <div class="gameOverview-wrap" v-show="show2">
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
import bubble1 from '../../../../static/images/learnReport/bubble1.png'
import bubble2 from '../../../../static/images/learnReport/bubble2.png'
import bubble3 from '../../../../static/images/learnReport/bubble3.png'

export default {
  name: "GameOverview",
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
        {img: bubble3},
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
        {num: 1, text: `<span class="item-text">在这里，</span> `},
        {num: 2, text: `<span class="item-text">你将通过学习成果集齐不同枚神镖，</span> `},
        {num: 3, text: `<span class="item-text">神镖数量将决定最终获得我们不同</span> `},
        {num: 4, text: `<p class="item-text">的“<span class="item-text color-y">年度大侠称号</span>”。</p> `},
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
  .gameOverview-wrap .content {
    padding-left: 65px;
    padding-top: 120px;
    position: relative;
    z-index: 1;
  }

  .gameOverview-wrap .item-text {
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 60px;
  }

  .gameOverview-wrap .color-y {
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
    top: 416px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-animation: bubble1 1.2s ease-in-out alternate infinite;
    animation: bubble1 1.2s ease-in-out alternate infinite;
  }
  .bubble2 {
    position: absolute;
    top: 800px;
    left: 20px;
    -webkit-animation: bubble2 1.2s ease-in-out alternate infinite;
    animation: bubble2 1.2s ease-in-out alternate infinite;
  }
  .bubble3 {
    position: absolute;
    top: 800px;
    right: 20px;
    -webkit-animation: bubble3 1.2s ease-in-out alternate infinite;
    animation: bubble3 1.2s ease-in-out alternate infinite;
  }
  @-webkit-keyframes bubble1 {
    100% {
      top: 401px
    }
  }

  @keyframes bubble1 {
    100% {
      top: 401px
    }
  }
  @-webkit-keyframes bubble2 {
    100% {
      top: 815px
    }
  }

  @keyframes bubble2 {
    100% {
      top: 815px
    }
  }
  @-webkit-keyframes bubble3 {
    100% {
      top: 785px
    }
  }

  @keyframes bubble3 {
    100% {
      top: 785px
    }
  }
</style>
